import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 800;
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  color: var(--color-black);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Message = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.3;
  margin-bottom: var(--spacing-xl);
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
    br {
      display: none;
    }
  }
`;
