import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useId } from '~/hooks';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-black);
  font-size: 0.875rem;
`;

const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid
    ${(props) =>
      props.$hasError ? 'var(--color-error)' : 'var(--color-border)'};
  border-radius: var(--radius);
  font-size: var(--input-font-size);
  background-color: var(--color-white);
  color: var(--color-black);
  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 100px;

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

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, ...props }, ref) => {
    const generatedId = useId('textarea');
    const textAreaId = id ?? generatedId;

    return (
      <TextAreaWrapper>
        {label && <Label htmlFor={textAreaId}>{label}</Label>}
        <StyledTextArea
          id={textAreaId}
          $hasError={!!error}
          ref={ref}
          {...props}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </TextAreaWrapper>
    );
  }
);

TextArea.displayName = 'TextArea';
