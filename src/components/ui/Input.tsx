import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useId } from '~/hooks';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

// const Label = styled.label`
//   font-weight: 500;
//   color: var(--color-black);
//   font-size: 0.875rem;
// `;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1.5px solid
    ${(props) =>
      props.$hasError ? 'var(--color-error)' : 'var(--color-border)'};
  border-radius: var(--radius);
  font-size: var(--input-font-size);
  background-color: var(--color-white);
  color: var(--color-black);
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgb(201, 201, 201);
  }

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

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label: _label, error, id, ...props }, ref) => {
    const generatedId = useId('input');
    const inputId = id ?? generatedId;

    return (
      <InputWrapper>
        {/* {_label && <Label htmlFor={inputId}>{_label}</Label>} */}
        <StyledInput id={inputId} $hasError={!!error} ref={ref} {...props} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
