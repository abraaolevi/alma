import styled from 'styled-components';

export const FormSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  @media (max-width: 768px) {
    margin: -var(--spacing-lg) var(--spacing-md) 0;
    padding: var(--spacing-lg) var(--spacing-md);
  }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-lg);
`;

export const FormTitle = styled.h2`
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

export const FormDescription = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  line-height: 1.3;
  margin: 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1rem;
    br {
      display: none;
    }
  }
`;
