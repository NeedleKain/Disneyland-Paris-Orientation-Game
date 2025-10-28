import React, { useState } from 'react';
import type { Quest } from '../types';
import RiddleView from './RiddleView';
import CompletionScreen from './CompletionScreen';
import PrologueScreen from './PrologueScreen';

interface GameScreenProps {
  quest: Quest;
  onFinish: () => void;
  onBack: () => void;
  currentRiddleIndex: number;
  onCorrectAnswer: () => void;
}

type GamePhase = 'prologue' | 'riddle';

const GameScreen: React.FC<GameScreenProps> = ({ quest, onFinish, onBack, currentRiddleIndex, onCorrectAnswer }) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>(currentRiddleIndex > 0 ? 'riddle' : 'prologue');
  
  const currentRiddle = quest.riddles[currentRiddleIndex];
  const isQuestFinished = currentRiddleIndex >= quest.riddles.length;

  if (isQuestFinished) {
    return <CompletionScreen quest={quest} onFinish={onFinish} />;
  }
  
  if (gamePhase === 'prologue') {
      return <PrologueScreen quest={quest} onStart={() => setGamePhase('riddle')} onBack={onBack} />;
  }

  return (
    <div>
      <button onClick={onBack} className="absolute top-2 left-2 md:top-4 md:left-4 text-xs z-20 bg-black bg-opacity-30 backdrop-blur-sm p-2 rounded-full hover:bg-black hover:bg-opacity-50 transition-colors" style={{ color: 'var(--text-color)' }}>
        Retour
      </button>
      <RiddleView
        riddle={currentRiddle}
        onCorrect={onCorrectAnswer}
        progress={{
          current: currentRiddleIndex + 1,
          total: quest.riddles.length,
        }}
      />
    </div>
  );
};

export default GameScreen;