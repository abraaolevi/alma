import styled from 'styled-components';

export const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background-color: var(--color-white);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: var(--color-white);
`;

export const TableHeaderRow = styled.tr``;

export const TableHeaderCell = styled.th<{ $sortable?: boolean }>`
  padding: var(--spacing-md);
  text-align: left;
  font-weight: 400;
  font-size: 0.875rem;
  color: rgb(201, 201, 201);
  border-bottom: 1px solid var(--color-border);
  cursor: ${(props) => (props.$sortable ? 'pointer' : 'default')};
  user-select: none;

  &:hover {
    ${(props) =>
      props.$sortable &&
      `
      color: var(--color-black);
    `}
  }

  @media (max-width: 640px) {
    padding: var(--spacing-sm);
    font-size: 0.75rem;
  }
`;

export const SortIcon = styled.span`
  margin-left: var(--spacing-xs);
  opacity: 0.5;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-gray);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.875rem;
  color: var(--color-black);
  vertical-align: middle;

  @media (max-width: 640px) {
    padding: var(--spacing-sm);
    font-size: 0.75rem;
  }
`;

export const TableFooter = styled.tfoot`
  border-top: 1px solid var(--color-border);
  background-color: var(--color-white);
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--color-text-gray);
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--color-error);
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius);
  margin: var(--spacing-md) 0;
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--color-text-gray);
  text-align: center;
  gap: var(--spacing-sm);
`;
