// src/components/screens/Coliseum.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CombatSystem from '../combat/CombatSystem';

const ColiseumContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffe6e6;
  padding: 20px;
`;

const Title = styled.h1`
  color: #cc0000;
  margin-bottom: 20px;
`;

const Coliseum = () => {
  return (
    <ColiseumContainer>
      <Title>Coliseum</Title>
      <CombatSystem />
      <Link to="/">Return to Main Square</Link>
    </ColiseumContainer>
  );
};

export default Coliseum;