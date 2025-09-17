import React from 'react';
import styled from 'styled-components';
import { useId } from '~/hooks';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
`;

const StyledCheckbox = styled.div<{ checked: boolean; $hasError?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid
    ${(props) =>
      props.$hasError
        ? 'var(--color-error)'
        : props.checked
          ? 'var(--color-green)'
          : 'var(--color-border)'};
  border-radius: var(--radius);
  background-color: ${(props) =>
    props.checked ? 'var(--color-green)' : 'var(--color-white)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &::after {
    content: '';
    display: ${(props) => (props.checked ? 'block' : 'none')};
    width: 6px;
    height: 10px;
    border: solid var(--color-black);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  ${CheckboxContainer}:hover & {
    border-color: ${(props) =>
      props.$hasError ? 'var(--color-error)' : 'var(--color-green)'};
  }
`;

const Label = styled.span`
  font-size: var(--input-font-size);
  font-weight: 600;
  color: var(--color-black);
`;

const ErrorMessage = styled.span`
  color: var(--color-error);
  font-size: 0.75rem;
  font-weight: 500;
`;

export function Checkbox({
  label,
  error,
  checked = false,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = useId('checkbox');
  const checkboxId = id ?? generatedId;

  return (
    <CheckboxWrapper>
      <CheckboxContainer htmlFor={checkboxId}>
        <HiddenCheckbox id={checkboxId} checked={checked} {...props} />
        <StyledCheckbox checked={checked} $hasError={!!error} />
        <Label>{label}</Label>
      </CheckboxContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CheckboxWrapper>
  );
}
