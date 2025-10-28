import React from 'react';
import type { Quest } from '../types';
import { SparkleIcon } from './icons/SparkleIcon';

interface CompletionScreenProps {
  quest: Quest;
  onFinish: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ quest, onFinish }) => {
  return (
    <div className="text-center p-8 rounded-2xl magic-container animate-fade-in-slow">
      <div className="flex justify-center items-center mb-4">
        <SparkleIcon />
        <h1 className="text-3xl md:text-4xl font-bold ml-2" style={{ color: 'var(--accent-color)'}}>Quête Accomplie !</h1>
        <SparkleIcon />
      </div>

      <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-color)' }}>
        {quest.title}
      </h2>

      <div className="mb-8 text-lg" style={{ color: 'var(--text-color)' }}>
        <p className="italic">"{quest.epilogue}"</p>
        <p className="text-right mt-2 font-magic text-base tracking-wider opacity-90">— {quest.narrator}</p>
      </div>

      <button
        onClick={onFinish}
        className="font-magic font-bold py-3 px-8 rounded-full text-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
        style={{ 
          backgroundColor: 'var(--accent-color)', 
          color: 'var(--button-text-color)',
          boxShadow: `0 0 15px var(--accent-color)`
        }}
      >
        Nouvelle Aventure
      </button>
    </div>
  );
};

export default CompletionScreen;