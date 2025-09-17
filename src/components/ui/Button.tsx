import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const StyledButton = styled.button`
  background-color: var(--color-green);
  color: var(--color-black);
  padding: 12px var(--spacing-lg);
  border: none;
  border-radius: var(--input-radius);
  font-weight: 600;
  font-size: var(--input-font-size);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b5c659;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
