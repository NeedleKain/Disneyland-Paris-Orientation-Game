import React, { useState, useCallback } from 'react';
import { useGeolocation } from './hooks/useGeolocation';
// FIX: The function is called generateMagicImageHint, not getMagicHint.
import { generateMagicImageHint } from './services/geminiService';
import { ACCEPTANCE_RADIUS_METERS } from './constants';
import type { Riddle, Coordinates } from './types';
import { SparkleIcon } from './components/icons/SparkleIcon';
import { LightbulbIcon } from './components/icons/LightbulbIcon';
import { MapPinIcon } from './components/icons/MapPinIcon';
import { GlobeIcon } from './components/icons/GlobeIcon';
import MapComponent from './components/MapComponent';

interface RiddleViewProps {
  riddle: Riddle;
  onCorrect: () => void;
  progress: {
    current: number;
    total: number;
  };
}

// FIX: Added missing getDistance function.
const getDistance = (coord1: Coordinates, coord2: Coordinates) => {
  const R = 6371e3; // metres
  const p1 = (coord1.latitude * Math.PI) / 180;
  const p2 = (coord2.latitude * Math.PI) / 180;
  const deltaP = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const deltaL = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;
  const a = Math.sin(deltaP / 2) * Math.sin(deltaP / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(deltaL / 2) * Math.sin(deltaL / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const RiddleView: React.FC<RiddleViewProps> = ({ riddle, onCorrect, progress }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  // FIX: Renamed state to reflect that it's an image.
  const [magicImage, setMagicImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  
  const { position, error, isLoading: isLoadingLocation, getPosition } = useGeolocation();

  const handleVerification = useCallback(async () => {
    setIsVerifying(true);
    setFeedback('');
    
    await getPosition();
  
    // This part runs after getPosition() is complete.
    // We need to check the 'position' state variable *after* it has been set.
    // A useEffect listening on 'position' is a robust way to handle this.
  }, [getPosition]);
  
  React.useEffect(() => {
    if (!isVerifying || isLoadingLocation) return;
  
    if (error) {
      setFeedback(error);
      setIsVerifying(false);
      return;
    }
  
    if (position) {
      const distance = getDistance(position, riddle.location);
      const isLocationCorrect = distance <= ACCEPTANCE_RADIUS_METERS;
      const isAnswerCorrect = answer.trim().toLowerCase() === riddle.answer.toLowerCase();
  
      if (isLocationCorrect && isAnswerCorrect) {
        setFeedback('Correct ! Préparez-vous pour la prochaine énigme...');
        setTimeout(() => {
          onCorrect();
          setAnswer('');
          setFeedback('');
          setHint(null);
          // FIX: Renamed state setter.
          setMagicImage(null);
          setIsMapVisible(false);
        }, 2000);
      } else if (!isLocationCorrect) {
        setFeedback(`Vous n'êtes pas au bon endroit. Rapprochez-vous ! (Distance: ${Math.round(distance)}m)`);
      } else {
        setFeedback('Mauvaise réponse. Essayez encore !');
      }
    } else {
       setFeedback("Impossible de vérifier. La position est introuvable.");
    }
    
    setIsVerifying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, error, isLoadingLocation, isVerifying, riddle.location, riddle.answer, answer, onCorrect]);


  // FIX: Renamed function and updated implementation to handle image generation.
  const handleGenerateMagicImage = async () => {
    setIsGeneratingImage(true);
    setMagicImage(null);
    setHint(null);
    const imageUrl = await generateMagicImageHint(riddle);
    if (imageUrl) {
        setMagicImage(imageUrl);
    } else {
        setFeedback("Désolé, la magie n'opère pas pour le moment. Réessayez plus tard.");
    }
    setIsGeneratingImage(false);
  };

  return (
    <div key={riddle.id} className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-purple-500/50 animate-fade-in-slow">
      <div className="text-center mb-6">
        <p className="text-yellow-400 font-bold">Énigme {progress.current} / {progress.total}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
          <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
        </div>
      </div>
      
      <img src={riddle.image} alt={riddle.locationName} className="rounded-lg mb-6 w-full h-48 object-cover border-2 border-purple-400/50" />

      <p className="text-xl md:text-2xl text-center text-gray-100 leading-relaxed mb-6">
        {riddle.question}
      </p>

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Votre réponse..."
        className="w-full bg-indigo-900/50 border-2 border-purple-400 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 mb-4"
      />
      
      {feedback && <p className="text-center text-yellow-300 my-4 animate-pulse">{feedback}</p>}

      <button
        onClick={handleVerification}
        disabled={isVerifying || isLoadingLocation}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg text-lg transform hover:scale-105 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        <MapPinIcon />
        {isVerifying || isLoadingLocation ? 'Vérification...' : 'Vérifier Lieu & Réponse'}
      </button>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        {/* FIX: Clear magic image when showing classic hint. */}
        <button onClick={() => { setHint(riddle.hint); setMagicImage(null); }} className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-purple-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
          <LightbulbIcon />
          Indice Classique
        </button>
        {/* FIX: Updated function call, disabled state, and text. */}
        <button onClick={handleGenerateMagicImage} disabled={isGeneratingImage} className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-purple-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50">
          <SparkleIcon />
          {isGeneratingImage ? 'Création...' : 'Indice Visuel Magique'}
        </button>
      </div>
       <div className="mt-2">
        <button 
          onClick={() => setIsMapVisible(prev => !prev)} 
          disabled={!position}
          className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-purple-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:text-green-400/50"
        >
          <GlobeIcon />
          {isMapVisible ? "Cacher la Carte" : "Afficher la Carte"}
        </button>
      </div>
      
      {hint && !magicImage && (
        <div className="mt-4 p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg">
          <p><span className="font-bold">Indice :</span> {hint}</p>
        </div>
      )}
      {/* FIX: Added loading indicator and image display for magic hint. */}
      {isGeneratingImage && (
        <div className="mt-4 p-4 text-center text-cyan-300">
          <p>Le Pinceau Enchanté dessine votre indice...</p>
        </div>
      )}
      {magicImage && (
         <div className="mt-4 p-4 bg-cyan-900/50 border border-cyan-400 rounded-lg">
          <p className="font-bold text-cyan-300 mb-2">Vision Magique :</p>
          <img src={magicImage} alt="Indice visuel généré par IA" className="rounded-lg w-full h-auto object-cover" />
        </div>
      )}

      {isMapVisible && position && (
        <MapComponent 
          userPosition={position}
          riddleLocation={riddle.location}
          riddleLocationName={riddle.locationName}
        />
      )}
    </div>
  );
};

export default RiddleView;