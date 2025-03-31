import React from 'react';
import styled from 'styled-components';

interface CardProps {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: number) => void;
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

const CardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
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

// Add a fun animation when cards match
const MatchAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,255,255,0) 70%);
  animation: pulse 1.5s infinite;
  pointer-events: none;
  z-index: 10;
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.7;
    }
    70% {
      transform: scale(1.1);
      opacity: 0.3;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.7;
    }
  }
`;

const Card: React.FC<CardProps> = ({ id, imageUrl, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <CardContainer isFlipped={isFlipped} isMatched={isMatched} onClick={handleClick}>
      <CardInner isFlipped={isFlipped}>
        <CardFront />
        <CardBack>
          <CardImage src={imageUrl} alt="Card" />
        </CardBack>
      </CardInner>
      {isMatched && <MatchAnimation />}
    </CardContainer>
  );
};

export default Card;
