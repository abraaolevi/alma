import styled from 'styled-components';

export const ErrorMessage = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: var(--spacing-md);
  border-radius: var(--radius);
  margin-bottom: var(--spacing-lg);
  font-size: 0.875rem;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

export const CheckboxGroupErrorMessage = styled.span`
  color: var(--color-error);
  font-size: 0.75rem;
  font-weight: 500;
`;
