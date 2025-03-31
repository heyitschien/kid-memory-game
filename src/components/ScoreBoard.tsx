import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ScoreBoardProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  gameOver: boolean;
}

const ScoreBoardContainer = styled.div`
  background: linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%);
  border-radius: 20px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  border: 5px solid #fff;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, 
      rgba(255, 0, 0, 0.05) 0%, 
      rgba(255, 165, 0, 0.05) 20%, 
      rgba(255, 255, 0, 0.05) 40%, 
      rgba(0, 128, 0, 0.05) 60%, 
      rgba(0, 0, 255, 0.05) 80%, 
      rgba(128, 0, 128, 0.05) 100%
    );
    z-index: -1;
    border-radius: 25px;
    animation: rainbow 10s linear infinite;
  }
  
  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @media (max-width: 768px) {
    padding: 12px 15px;
    margin-bottom: 15px;
  }
`;

const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ScoreLabel = styled.span`
  font-weight: bold;
  color: #5d5d5d;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '🎮';
    margin-right: 8px;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ScoreValue = styled.span`
  color: #ff6b6b;
  font-weight: bold;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.6);
  padding: 2px 10px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Timer = styled.div`
  font-size: 1.3rem;
  color: #333;
  text-align: center;
  margin-top: 12px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.7);
  padding: 5px 15px;
  border-radius: 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  display: inline-block;
  
  &::before {
    content: '⏱️';
    margin-right: 8px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 4px 12px;
  }
`;

const TimerWrapper = styled.div`
  text-align: center;
`;

const GameOverMessage = styled.div`
  color: #4caf50;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: celebrate 1s ease-in-out infinite alternate;
  
  @keyframes celebrate {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }
  
  &::before {
    content: '🎉';
    margin-right: 8px;
  }
  
  &::after {
    content: '🎉';
    margin-left: 8px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 8px;
  }
`;

const ScoreBoard: React.FC<ScoreBoardProps> = ({ moves, matchedPairs, totalPairs, gameOver }) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!gameOver) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameOver]);
  
  // Reset timer when game is reset
  useEffect(() => {
    if (moves === 0 && matchedPairs === 0) {
      setSeconds(0);
    }
  }, [moves, matchedPairs]);
  
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <ScoreBoardContainer>
      <ScoreRow>
        <ScoreLabel>Moves</ScoreLabel>
        <ScoreValue>{moves}</ScoreValue>
      </ScoreRow>
      <ScoreRow>
        <ScoreLabel>Pairs Found</ScoreLabel>
        <ScoreValue>{matchedPairs} / {totalPairs}</ScoreValue>
      </ScoreRow>
      <TimerWrapper>
        <Timer>Time: {formatTime(seconds)}</Timer>
      </TimerWrapper>
      
      {gameOver && (
        <GameOverMessage>
          Awesome job! You won in {formatTime(seconds)} with {moves} moves!
        </GameOverMessage>
      )}
    </ScoreBoardContainer>
  );
};

export default ScoreBoard;
