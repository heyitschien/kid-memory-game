import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import './App.css';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';

// Define card interface
interface CardType {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #b3e5fc 50%, #e1bee7 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 10% 10%, rgba(255, 255, 0, 0.05) 0%, transparent 30%),
      radial-gradient(circle at 90% 20%, rgba(255, 0, 255, 0.05) 0%, transparent 30%),
      radial-gradient(circle at 30% 80%, rgba(0, 255, 255, 0.05) 0%, transparent 30%),
      radial-gradient(circle at 80% 90%, rgba(255, 0, 0, 0.05) 0%, transparent 30%);
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  color: #ff6b6b;
  text-align: center;
  margin-bottom: 20px;
  font-size: 3rem;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }
`;

const GameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Comic Sans MS', cursive, sans-serif;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DifficultyButton = styled(Button)<{ active: boolean }>`
  background-color: ${props => props.active ? '#ff6b6b' : '#bbbbbb'};
  
  &:hover {
    background-color: ${props => props.active ? '#ff5252' : '#aaaaaa'};
  }
`;

// Floating decorative elements
const Decoration = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  z-index: -1;
`;

const Decoration1 = styled(Decoration)`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 192, 203, 0.3);
  top: 10%;
  left: 5%;
  animation: float 8s ease-in-out infinite;
  
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
`;

const Decoration2 = styled(Decoration)`
  width: 80px;
  height: 80px;
  background-color: rgba(173, 216, 230, 0.3);
  top: 20%;
  right: 10%;
  animation: float 6s ease-in-out infinite;
`;

const Decoration3 = styled(Decoration)`
  width: 120px;
  height: 120px;
  background-color: rgba(255, 255, 0, 0.2);
  bottom: 15%;
  left: 10%;
  animation: float 10s ease-in-out infinite;
`;

const Decoration4 = styled(Decoration)`
  width: 70px;
  height: 70px;
  background-color: rgba(144, 238, 144, 0.3);
  bottom: 10%;
  right: 5%;
  animation: float 7s ease-in-out infinite;
`;

function App() {
  // Number of pairs to use (adjust based on difficulty)
  const [numPairs, setNumPairs] = useState(16);
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Define initializeGame with useCallback to prevent unnecessary re-renders
  const initializeGame = useCallback(() => {
    // Reset game state
    setFlippedCount(0);
    setFlippedIndexes([]);
    setMoves(0);
    setGameOver(false);
    setMatchedPairs(0);
    
    // Create and shuffle cards
    const newCards: CardType[] = [];
    
    // Select random cards based on numPairs
    const selectedIndices: number[] = [];
    while (selectedIndices.length < numPairs) {
      const randomIndex = Math.floor(Math.random() * 33) + 1;
      const cardNumber = randomIndex <= 33 ? randomIndex : 1;
      
      if (!selectedIndices.includes(cardNumber)) {
        selectedIndices.push(cardNumber);
      }
    }
    
    // Create pairs
    selectedIndices.forEach((cardNumber, index) => {
      // Create two cards with the same image (a pair)
      const cardImageUrl = `/images/card_${cardNumber.toString().padStart(2, '0')}.png`;
      
      // First card in the pair
      newCards.push({
        id: index * 2,
        imageUrl: cardImageUrl,
        isFlipped: false,
        isMatched: false
      });
      
      // Second card in the pair
      newCards.push({
        id: index * 2 + 1,
        imageUrl: cardImageUrl,
        isFlipped: false,
        isMatched: false
      });
    });
    
    // Shuffle cards
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    
    setCards(newCards);
  }, [numPairs]);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardClick = (id: number) => {
    // Prevent action if game is over or too many cards flipped
    if (gameOver || flippedCount >= 2) return;
    
    // Find the card index
    const cardIndex = cards.findIndex(card => card.id === id);
    
    // Prevent flipping already matched or flipped cards
    if (cards[cardIndex].isMatched || cards[cardIndex].isFlipped) return;
    
    // Flip the card
    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);
    
    // Add to flipped cards
    const newFlippedIndexes = [...flippedIndexes, cardIndex];
    setFlippedIndexes(newFlippedIndexes);
    setFlippedCount(flippedCount + 1);
    
    // Check for match if two cards are flipped
    if (newFlippedIndexes.length === 2) {
      setMoves(moves + 1);
      
      const [firstIndex, secondIndex] = newFlippedIndexes;
      
      if (newCards[firstIndex].imageUrl === newCards[secondIndex].imageUrl) {
        // It's a match!
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
        
        // Check if game is over
        if (matchedPairs + 1 === numPairs) {
          setGameOver(true);
        }
        
        // Reset flipped cards
        setFlippedCount(0);
        setFlippedIndexes([]);
      } else {
        // Not a match, flip back after delay
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[secondIndex].isFlipped = false;
          setCards(newCards);
          setFlippedCount(0);
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  const handleDifficultyChange = (level: 'easy' | 'medium' | 'hard') => {
    setDifficulty(level);
    
    // Set number of pairs based on difficulty
    switch (level) {
      case 'easy':
        setNumPairs(8); // 16 cards
        break;
      case 'medium':
        setNumPairs(16); // 32 cards
        break;
      case 'hard':
        setNumPairs(24); // 48 cards (using some cards twice)
        break;
      default:
        setNumPairs(16);
    }
  };

  return (
    <AppContainer>
      <Decoration1 />
      <Decoration2 />
      <Decoration3 />
      <Decoration4 />
      
      <Title>Memory Card Game</Title>
      
      <ButtonContainer>
        <DifficultyButton 
          active={difficulty === 'easy'} 
          onClick={() => handleDifficultyChange('easy')}
        >
          Easy
        </DifficultyButton>
        <DifficultyButton 
          active={difficulty === 'medium'} 
          onClick={() => handleDifficultyChange('medium')}
        >
          Medium
        </DifficultyButton>
        <DifficultyButton 
          active={difficulty === 'hard'} 
          onClick={() => handleDifficultyChange('hard')}
        >
          Hard
        </DifficultyButton>
        <Button onClick={initializeGame}>New Game</Button>
      </ButtonContainer>
      
      <ScoreBoard moves={moves} matchedPairs={matchedPairs} totalPairs={numPairs} gameOver={gameOver} />
      
      <GameContainer>
        <GameBoard 
          cards={cards} 
          onCardClick={handleCardClick} 
          difficulty={difficulty}
        />
      </GameContainer>
    </AppContainer>
  );
}

export default App;
