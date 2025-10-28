import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 rounded-2xl magic-container">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider" style={{ color: 'var(--accent-color)'}}>Le Trésor Enchanté</h1>
      <p className="text-lg md:text-xl mb-6" style={{ color: 'var(--text-color)' }}>
        Bienvenue, aventurier ! Une série d'énigmes vous attend au cœur de la magie.
      </p>
      <p className="mb-8" style={{ color: 'var(--text-color)' }}>
        Pour jouer, vous devez être physiquement dans le resort. Chaque énigme vous guidera vers un lieu. Une fois sur place, donnez la bonne réponse pour continuer.
      </p>
      <button
        onClick={onStart}
        className="font-magic font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
        style={{ 
          backgroundColor: 'var(--accent-color)', 
          color: 'var(--button-text-color)',
          boxShadow: `0 0 15px var(--accent-color)`
        }}
      >
        Commencer l'Aventure
      </button>
    </div>
  );
};

export default WelcomeScreen;
