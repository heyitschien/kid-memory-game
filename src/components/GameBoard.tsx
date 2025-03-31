import React from 'react';
import styled from 'styled-components';
import Card from './Card';

interface CardType {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
}

const BoardContainer = styled.div<{ difficulty: string }>`
  display: grid;
  grid-template-columns: ${props => {
    switch (props.difficulty) {
      case 'easy':
        return 'repeat(4, 1fr)';
      case 'medium':
        return 'repeat(8, 1fr)';
      case 'hard':
        return 'repeat(8, 1fr)';
      default:
        return 'repeat(8, 1fr)';
    }
  }};
  gap: 12px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 5px solid #fff;
  
  @media (max-width: 1024px) {
    grid-template-columns: ${props => {
      switch (props.difficulty) {
        case 'easy':
          return 'repeat(4, 1fr)';
        case 'medium':
          return 'repeat(6, 1fr)';
        case 'hard':
          return 'repeat(6, 1fr)';
        default:
          return 'repeat(6, 1fr)';
      }
    }};
    padding: 15px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: ${props => {
      switch (props.difficulty) {
        case 'easy':
          return 'repeat(4, 1fr)';
        case 'medium':
          return 'repeat(4, 1fr)';
        case 'hard':
          return 'repeat(4, 1fr)';
        default:
          return 'repeat(4, 1fr)';
      }
    }};
    gap: 10px;
    padding: 12px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: ${props => {
      switch (props.difficulty) {
        case 'easy':
          return 'repeat(3, 1fr)';
        case 'medium':
          return 'repeat(4, 1fr)';
        case 'hard':
          return 'repeat(4, 1fr)';
        default:
          return 'repeat(4, 1fr)';
      }
    }};
    gap: 8px;
    padding: 10px;
  }
`;

const CardWrapper = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  transform: perspective(1000px) rotateX(5deg);
  transition: transform 0.3s;
  
  &:hover {
    transform: perspective(1000px) rotateX(0);
  }
`;

const BoardAnimation = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border-radius: 25px;
  background: radial-gradient(circle at top left, rgba(255,192,203,0.2) 0%, rgba(255,255,255,0) 60%),
              radial-gradient(circle at bottom right, rgba(173,216,230,0.2) 0%, rgba(255,255,255,0) 60%);
  z-index: -1;
`;

const BoardWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, difficulty }) => {
  return (
    <BoardWrapper>
      <BoardAnimation />
      <BoardContainer difficulty={difficulty}>
        {cards.map(card => (
          <CardWrapper key={card.id}>
            <Card
              id={card.id}
              imageUrl={card.imageUrl}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={onCardClick}
            />
          </CardWrapper>
        ))}
      </BoardContainer>
    </BoardWrapper>
  );
};

export default GameBoard;
