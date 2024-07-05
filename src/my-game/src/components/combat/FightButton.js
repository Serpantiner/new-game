// src/components/combat/FightButton.js
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #ff4136;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff725c;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

const FightButton = ({ onClick, disabled }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      Fight!
    </StyledButton>
  );
};

export default FightButton;