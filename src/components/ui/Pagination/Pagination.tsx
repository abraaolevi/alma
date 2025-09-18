'use client';

import {
  NavButton,
  PageButton,
  PageNumber,
  PaginationButtons,
  PaginationContainer,
} from './Pagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <PageButton
          key={1}
          $isActive={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          1
        </PageButton>
      );

      if (startPage > 2) {
        pages.push(<PageNumber key="ellipsis1">...</PageNumber>);
      }
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          $isActive={currentPage === i}
          onClick={() => onPageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PageNumber key="ellipsis2">...</PageNumber>);
      }

      pages.push(
        <PageButton
          key={totalPages}
          $isActive={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </PageButton>
      );
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <PaginationButtons>
        <NavButton onClick={handlePrevious} disabled={currentPage === 1}>
          &lt;
        </NavButton>

        {renderPageNumbers()}

        <NavButton onClick={handleNext} disabled={currentPage === totalPages}>
          &gt;
        </NavButton>
      </PaginationButtons>
    </PaginationContainer>
  );
}
