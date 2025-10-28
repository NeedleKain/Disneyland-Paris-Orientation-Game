
import React from 'react';
import type { Land, Quest } from '../types';
import { MapIcon } from './icons/MapIcon';

interface QuestSelectionScreenProps {
  land: Land;
  onSelectQuest: (quest: Quest) => void;
  onBack: () => void;
}

const QuestSelectionScreen: React.FC<QuestSelectionScreenProps> = ({ land, onSelectQuest, onBack }) => {
  return (
    <div className="text-center p-6 md:p-8 rounded-2xl magic-container">
       <button onClick={onBack} className="absolute top-4 left-4 flex items-center gap-1 text-sm opacity-80 hover:opacity-100 transition-opacity" style={{ color: 'var(--text-color)' }}>
        <MapIcon />
        Retour
      </button>
      <h1 className="text-4xl font-bold mb-2 tracking-wider" style={{ color: 'var(--accent-color)' }}>{land.name}</h1>
      <p className="text-lg text-center mb-6" style={{ color: 'var(--text-color)' }}>
        Choisissez votre mission, aventurier.
      </p>
      <div className="space-y-3">
        {land.quests.map(quest => (
          <button
            key={quest.id}
            onClick={() => onSelectQuest(quest)}
            className="w-full text-left p-4 bg-black bg-opacity-20 hover:bg-black hover:bg-opacity-40 border rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{ borderColor: 'var(--primary-color)',  boxShadow: `0 0 10px var(--primary-color)` }}
          >
            <div className="flex items-center gap-4">
               {/* FIX: Replaced React.cloneElement with a wrapper div to avoid prop-type errors on icon components. */}
               <div className="p-2 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-color)' }}>
                <div className="h-6 w-6 flex items-center justify-center" style={{ color: 'var(--button-text-color)'}}>
                  {quest.icon}
                </div>
              </div>
              <div>
                <h2 className="font-bold text-xl" style={{ color: 'var(--accent-color)' }}>{quest.title}</h2>
                <p style={{ color: 'var(--text-color)' }}>{quest.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestSelectionScreen;