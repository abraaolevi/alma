import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useId } from '~/hooks';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const StyledSelect = styled.select<{ $hasError?: boolean }>`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1.5px solid
    ${(props) =>
      props.$hasError ? 'var(--color-error)' : 'var(--color-border)'};
  border-radius: var(--radius);
  font-size: var(--input-font-size);
  background-color: var(--color-white);
  color: var(--color-black);
  transition: border-color 0.2s ease;
  cursor: pointer;
  height: 40px;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? 'var(--color-error)' : 'var(--color-green)'};
  }
`;

const ErrorMessage = styled.span`
  color: var(--color-error);
  font-size: 0.75rem;
  font-weight: 500;
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, options, placeholder, id, ...props }, ref) => {
    const generatedId = useId('select');
    const selectId = id ?? generatedId;

    return (
      <SelectWrapper>
        <StyledSelect id={selectId} $hasError={!!error} ref={ref} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SelectWrapper>
    );
  }
);

Select.displayName = 'Select';
