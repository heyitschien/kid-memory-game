import React from 'react';
import styled, { keyframes } from 'styled-components';

interface CardProps {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
  justMatched?: boolean;
}

const CardContainer = styled.div<{ isFlipped: boolean; isMatched: boolean }>`
  width: 100%;
  height: 100%;
  perspective: 1000px;
  cursor: ${props => (props.isMatched ? 'default' : 'pointer')};
  opacity: ${props => (props.isMatched ? 0.7 : 1)};
  transition: transform 0.2s;
  
  &:hover {
    transform: ${props => (props.isMatched ? 'none' : 'scale(1.05)')};
  }
`;

const CardInner = styled.div<{ isFlipped: boolean; justMatched?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => {
    if (props.justMatched) {
      return 'rotateY(180deg) scale(1.1)';
    }
    return props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)';
  }};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  animation: ${props => props.justMatched ? 'matchWiggle 0.5s ease-in-out' : 'none'};
  
  @keyframes matchWiggle {
    0% { transform: rotateY(180deg) scale(1); }
    25% { transform: rotateY(180deg) scale(1.1) rotate(-5deg); }
    50% { transform: rotateY(180deg) scale(1.15) rotate(5deg); }
    75% { transform: rotateY(180deg) scale(1.1) rotate(-5deg); }
    100% { transform: rotateY(180deg) scale(1); }
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 4px solid white;
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  
  &::after {
    content: '';
    background-image: url('/images/card_back_dog.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
  transform: rotateY(180deg);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

// Sparkle animation
const sparkle = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1) rotate(180deg); opacity: 0; }
`;

const Sparkle = styled.div<{ index: number }>`
  position: absolute;
  width: 15px;
  height: 15px;
  background-image: radial-gradient(circle, #fff 0%, #ffeb3b 50%, #ff9800 100%);
  border-radius: 50%;
  opacity: 0;
  z-index: 20;
  pointer-events: none;
  animation: ${sparkle} 0.8s ease-in-out forwards;
  animation-delay: ${props => props.index * 0.1}s;
  top: ${props => Math.random() * 100}%;
  left: ${props => Math.random() * 100}%;
  box-shadow: 0 0 10px 2px rgba(255, 215, 0, 0.7);
`;

// Confetti animation
const confettiAnimation = keyframes`
  0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
`;

const Confetti = styled.div<{ index: number; color: string }>`
  position: absolute;
  width: ${props => 5 + Math.random() * 7}px;
  height: ${props => 5 + Math.random() * 7}px;
  background-color: ${props => props.color};
  opacity: 0;
  z-index: 15;
  pointer-events: none;
  animation: ${confettiAnimation} 1s ease-in-out forwards;
  animation-delay: ${props => props.index * 0.1}s;
  top: 50%;
  left: ${props => 20 + Math.random() * 60}%;
  border-radius: ${props => Math.random() > 0.5 ? '50%' : '0'};
`;

// Add a fun animation when cards match
const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
    opacity: 0.7;
  }
`;

const MatchAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,255,255,0) 70%);
  animation: ${pulseAnimation} 1.5s infinite;
  pointer-events: none;
  z-index: 10;
`;

const Card: React.FC<CardProps> = ({ id, imageUrl, isFlipped, isMatched, onClick, justMatched }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  // Generate confetti colors
  const confettiColors = [
    '#ff5252', '#ffeb3b', '#2196f3', '#4caf50', '#e040fb', '#ff9800'
  ];
  
  // Create array for sparkles and confetti
  const sparkles = Array.from({ length: 8 }, (_, i) => i);
  const confetti = Array.from({ length: 15 }, (_, i) => i);

  return (
    <CardContainer isFlipped={isFlipped} isMatched={isMatched} onClick={handleClick}>
      <CardInner isFlipped={isFlipped} justMatched={justMatched}>
        <CardFront />
        <CardBack>
          <CardImage src={imageUrl} alt="Card" />
          
          {/* Show sparkles and confetti when cards just matched */}
          {justMatched && (
            <>
              {sparkles.map((_, index) => (
                <Sparkle key={`sparkle-${id}-${index}`} index={index} />
              ))}
              
              {confetti.map((_, index) => (
                <Confetti 
                  key={`confetti-${id}-${index}`} 
                  index={index} 
                  color={confettiColors[index % confettiColors.length]} 
                />
              ))}
            </>
          )}
        </CardBack>
      </CardInner>
      {isMatched && <MatchAnimation />}
    </CardContainer>
  );
};

export default Card;
