import React, { useState, useCallback, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { generateMagicImageHint } from '../services/geminiService';
import { ACCEPTANCE_RADIUS_METERS } from '../constants';
import type { Riddle, Coordinates } from '../types';
import { SparkleIcon } from './icons/SparkleIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import MapComponent from './MapComponent';

interface RiddleViewProps {
  riddle: Riddle;
  onCorrect: () => void;
  progress: {
    current: number;
    total: number;
  };
}

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

const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  const track = Array(s2.length + 1).fill(null).map(() =>
    Array(s1.length + 1).fill(null)
  );

  for (let i = 0; i <= s1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= s2.length; j += 1) {
    track[j][0] = j;
  }

  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }

  const distance = track[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  if (maxLength === 0) return 1;
  
  return (maxLength - distance) / maxLength;
};

type FeedbackState = 'idle' | 'correct' | 'incorrect';

const RiddleView: React.FC<RiddleViewProps> = ({ riddle, onCorrect, progress }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle');
  const [isVerifying, setIsVerifying] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [magicImage, setMagicImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  
  const { position, error: locationError, isLoading: isLoadingLocation, getPosition } = useGeolocation();

  const handleVerification = useCallback(() => {
    if(isVerifying || isLoadingLocation) return;
    setIsVerifying(true);
    setFeedback('');
    setFeedbackState('idle');
    getPosition();
  }, [getPosition, isVerifying, isLoadingLocation]);

  useEffect(() => {
    if (!isVerifying || isLoadingLocation) return;
  
    if (locationError) {
      setFeedback(locationError);
      setFeedbackState('incorrect');
      setIsVerifying(false);
      return;
    }
  
    if (position) {
      const distance = getDistance(position, riddle.location);
      const isLocationCorrect = distance <= ACCEPTANCE_RADIUS_METERS;
      const similarity = calculateSimilarity(answer, riddle.answer);
      const isAnswerCorrect = similarity >= 0.75;
  
      setTimeout(() => {
        if (isLocationCorrect && isAnswerCorrect) {
          setFeedbackState('correct');
          setFeedback('Correct ! Préparez-vous pour la prochaine énigme...');
          setTimeout(() => {
            onCorrect();
            // Reset state for next riddle
            setAnswer('');
            setFeedback('');
            setHint(null);
            setMagicImage(null);
            setIsMapVisible(false);
            setFeedbackState('idle');
          }, 2000);
        } else {
          setFeedbackState('incorrect');
          if (!isLocationCorrect) {
            setFeedback(`Vous n'êtes pas au bon endroit. Rapprochez-vous ! (Distance: ${Math.round(distance)}m)`);
          } else {
            setFeedback('Mauvaise réponse. Essayez encore !');
          }
          setIsVerifying(false);
          setTimeout(() => setFeedbackState('idle'), 1000);
        }
      }, 300);
    } else {
       setFeedback("Impossible de vérifier. La position est introuvable.");
       setFeedbackState('incorrect');
       setIsVerifying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, locationError, isLoadingLocation, isVerifying]);

  const handleGenerateMagicImage = async () => {
    setIsGeneratingImage(true);
    setMagicImage(null);
    setHint(null);
    const imageUrl = await generateMagicImageHint(riddle);
    if (imageUrl) {
        setMagicImage(imageUrl);
    } else {
        setFeedback("Désolé, la magie n'opère pas pour le moment. Réessayez plus tard.");
        setFeedbackState('incorrect');
    }
    setIsGeneratingImage(false);
  };
  
  const inputClassName = `w-full bg-indigo-900 bg-opacity-50 border-2 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 mb-4 ${
    feedbackState === 'correct'
      ? 'border-green-500 ring-green-500'
      : feedbackState === 'incorrect'
      ? 'border-red-500 ring-red-500 animate-shake'
      : 'border-purple-400'
  }`;

  const feedbackClassName = `text-center my-4 transition-opacity duration-300 ${
    feedbackState === 'correct'
      ? 'text-green-400 animate-pulse'
      : feedbackState === 'incorrect'
      ? 'text-red-400'
      : 'text-yellow-300'
  }`;

  return (
    <div key={riddle.id} className="p-6 md:p-8 rounded-2xl magic-container">
      <div className="text-center mb-6">
        <p className="text-yellow-400 font-bold">Énigme {progress.current} / {progress.total}</p>
        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
          <div className="bg-yellow-400 h-2.5 rounded-full shadow-lg shadow-yellow-400/50 transition-all duration-500" style={{ width: `${(progress.current / progress.total) * 100}%` }}></div>
        </div>
      </div>

      <p className="text-xl md:text-2xl text-center text-gray-100 leading-relaxed my-6">
        {riddle.question}
      </p>

      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleVerification(); }}
        placeholder="Votre réponse..."
        className={inputClassName}
        disabled={isVerifying || feedbackState === 'correct'}
      />
      
      {feedback && <p className={feedbackClassName}>{feedback}</p>}

      <button
        onClick={handleVerification}
        disabled={isVerifying || isLoadingLocation || feedbackState === 'correct'}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-px"
      >
        <MapPinIcon />
        {isVerifying || isLoadingLocation ? 'Vérification...' : 'Vérifier Lieu & Réponse'}
      </button>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button onClick={() => { setHint(riddle.hint); setMagicImage(null); }} className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-purple-900 font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-yellow-500/20">
          <LightbulbIcon />
          Indice Classique
        </button>
        <button onClick={handleGenerateMagicImage} disabled={isGeneratingImage} className="flex-1 flex items-center justify-center gap-2 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-purple-900 font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 hover:shadow-md hover:shadow-cyan-400/20">
          <SparkleIcon />
          {isGeneratingImage ? 'Création...' : 'Indice Visuel Magique'}
        </button>
      </div>

       <div className="mt-2">
        <button 
          onClick={() => setIsMapVisible(prev => !prev)} 
          disabled={!position}
          className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-purple-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GlobeIcon />
          {isMapVisible ? "Cacher la Carte" : "Afficher la Carte"}
        </button>
      </div>
      
      {hint && (
        <div className="mt-4 p-4 bg-yellow-900 bg-opacity-50 border border-yellow-500 rounded-lg animate-fade-in">
          <p><span className="font-bold">Indice :</span> {hint}</p>
        </div>
      )}

      {isGeneratingImage && (
        <div className="mt-4 p-4 text-center text-cyan-300">
          <p>Le Pinceau Enchanté dessine votre indice...</p>
        </div>
      )}

      {magicImage && (
         <div className="mt-4 p-4 bg-cyan-900 bg-opacity-50 border border-cyan-400 rounded-lg animate-fade-in">
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