// src/components/screens/HuntingGrounds.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const GroundsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e6ffe6;
`;

const Title = styled.h1`
  color: #006600;
  margin-bottom: 20px;
`;

const HuntingGrounds = () => {
  return (
    <GroundsContainer>
      <Title>Hunting Grounds</Title>
      <p>Hunt for wild animals and gather resources here.</p>
      <Link to="/">Return to Main Square</Link>
    </GroundsContainer>
  );
};

export default HuntingGrounds;