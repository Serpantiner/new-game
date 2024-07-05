import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SquareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Instructions = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const MainSquare = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          navigate('/fishing');
          break;
        case 'ArrowRight':
          navigate('/coliseum');
          break;
        case 'ArrowUp':
          navigate('/hunting');
          break;
        case 'ArrowDown':
          navigate('/herbs');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <SquareContainer>
      <Title>Main Square</Title>
      <Instructions>Use arrow keys to navigate:</Instructions>
      <p>← Fishing Area | → Coliseum</p>
      <p>↑ Hunting Grounds | ↓ Herb Garden</p>
    </SquareContainer>
  );
};

export default MainSquare;
