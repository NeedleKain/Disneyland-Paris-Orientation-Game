import React from 'react';
import RiddleView from './RiddleView.tsx';
import CompletionScreen from './CompletionScreen.tsx';
import type { Quest } from '../types.ts';
import { MapIcon } from './icons/MapIcon.tsx';

interface GameScreenProps {
  quest: Quest;
  onFinish: () => void;
  onBack: () => void;
  currentRiddleIndex: number;
  onCorrectAnswer: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ quest, onFinish, onBack, currentRiddleIndex, onCorrectAnswer }) => {
  const isCompleted = currentRiddleIndex >= quest.riddles.length;
  const currentRiddle = quest.riddles[currentRiddleIndex];

  return (
    <div>
        <div className="absolute top-4 left-4 z-20">
            <button
                onClick={onBack}
                className="flex items-center gap-2 bg-black/40 backdrop-blur-sm font-bold py-2 px-4 rounded-full text-sm transform hover:scale-105 transition-transform duration-300 shadow-lg"
                style={{ color: 'var(--accent-color)' }}
            >
                <MapIcon />
                Changer de Quête
            </button>
        </div>
      {isCompleted ? (
        <CompletionScreen onRestart={onFinish} />
      ) : (
        <RiddleView
          key={currentRiddle.id}
          riddle={currentRiddle}
          onCorrect={onCorrectAnswer}
          progress={{
            current: currentRiddleIndex + 1,
            total: quest.riddles.length,
          }}
        />
      )}
    </div>
  );
};

export default GameScreen;