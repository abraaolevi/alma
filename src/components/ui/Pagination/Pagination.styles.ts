import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PageNumber = styled.span`
  padding: 0.5rem 0.75rem;
  font-size: 0.5rem;
  color: #666;
`;

export const PageButton = styled.button<{ $isActive: boolean }>`
  padding: 2px 8px;
  border: ${(props) =>
    props.$isActive ? '1px solid var(--color-black)' : 'none'};
  color: ${(props) =>
    props.$isActive ? 'var(--color-black)' : 'var(--color-text-gray)'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${(props) =>
      props.$isActive ? 'var(--color-black)' : 'var(--color-gray)'};
    color: var(--color-black);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const NavButton = styled.button`
  color: var(--color-black);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;

  &:hover {
    border-color: 'var(--color-black)';
    color: var(--color-black);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
