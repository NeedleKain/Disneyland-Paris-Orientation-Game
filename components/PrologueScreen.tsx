import React from 'react';
import type { Quest } from '../types';

interface PrologueScreenProps {
  quest: Quest;
  onStart: () => void;
  onBack: () => void;
}

const PrologueScreen: React.FC<PrologueScreenProps> = ({ quest, onStart, onBack }) => {
  return (
    <div className="text-center p-8 rounded-2xl magic-container animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider" style={{ color: 'var(--accent-color)'}}>{quest.title}</h1>
      
      <div className="my-6 p-4 bg-black bg-opacity-20 rounded-lg border" style={{ borderColor: 'var(--primary-color)' }}>
         <p className="text-sm italic mb-2 opacity-80" style={{ color: 'var(--text-color)'}}>Un message de {quest.narrator}...</p>
         <p className="text-lg" style={{ color: 'var(--text-color)' }}>
            "{quest.prologue}"
        </p>
      </div>

      <p className="mb-8 font-semibold" style={{ color: 'var(--text-color)' }}>
        Êtes-vous prêt à relever le défi ?
      </p>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={onStart}
          className="font-magic font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
          style={{ 
            backgroundColor: 'var(--accent-color)', 
            color: 'var(--button-text-color)',
            boxShadow: `0 0 15px var(--accent-color)`
          }}
        >
          Commencer la Quête
        </button>
        <button
          onClick={onBack}
          className="font-semibold py-2 px-6 rounded-full text-md transition-colors duration-300 hover:bg-white/10"
          style={{ 
            color: 'var(--text-color)',
          }}
        >
          Changer de quête
        </button>
      </div>
    </div>
  );
};

export default PrologueScreen;