import styled from 'styled-components';

export const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--color-white);
`;

export const AdminMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const AdminContent = styled.div`
  flex: 1;
  padding: var(--spacing-xl);

  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
`;
