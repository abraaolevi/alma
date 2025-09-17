import styled from 'styled-components';

export const SearchFilterContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const SearchInputFilterContainer = styled.div`
  position: relative;
`;

export const SearchInputImageContainer = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 9px;
  left: 10px;
  cursor: pointer;
`;
