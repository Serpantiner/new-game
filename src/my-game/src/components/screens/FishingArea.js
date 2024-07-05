// src/components/screens/FishingArea.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e6f2ff;
`;

const Title = styled.h1`
  color: #0066cc;
  margin-bottom: 20px;
`;

const FishingArea = () => {
  return (
    <AreaContainer>
      <Title>Fishing Area</Title>
      <p>Here you can catch fish and improve your fishing skills.</p>
      <Link to="/">Return to Main Square</Link>
    </AreaContainer>
  );
};

export default FishingArea;