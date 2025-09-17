import styled from 'styled-components';

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  padding: var(--spacing-lg);
`;

export const LoginCard = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--spacing-xl);
  width: 100%;
  max-width: 400px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
`;

export const LoginTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-black);
  margin-bottom: var(--spacing-sm);
`;

export const LoginSubtitle = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-gray);
  font-weight: 500;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;
