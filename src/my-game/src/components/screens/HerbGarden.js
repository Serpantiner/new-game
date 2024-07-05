// src/components/screens/HerbGarden.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GardenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff0e6;
`;

const Title = styled.h1`
  color: #cc6600;
  margin-bottom: 20px;
`;

const HerbGarden = () => {
  return (
    <GardenContainer>
      <Title>Herb Garden</Title>
      <p>Collect and cultivate various herbs for potions and other uses.</p>
      <Link to="/">Return to Main Square</Link>
    </GardenContainer>
  );
};

export default HerbGarden;