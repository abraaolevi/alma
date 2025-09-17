'use client';

import React, { useRef } from 'react';
import styled from 'styled-components';
import { useId } from '~/hooks';
import { Button } from './Button';

interface FileUploadProps {
  label?: string;
  error?: string;
  accept?: string;
  onFileSelect: (file: File | null) => void;
  selectedFile?: File | null;
  id?: string;
}

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--color-black);
  font-size: var(--input-font-size);
`;

const UploadArea = styled.div<{ $hasError?: boolean }>`
  border: 2px dashed
    ${(props) =>
      props.$hasError ? 'var(--color-error)' : 'var(--color-border)'};
  border-radius: var(--radius);
  padding: var(--spacing-xl);
  text-align: center;
  background-color: var(--color-white);
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadText = styled.p`
  color: var(--color-text-gray);
  font-size: var(--input-font-size);
  margin: 0 0 var(--spacing-md) 0;
`;

const SelectedFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm);
  background-color: var(--color-gray);
  border-radius: var(--radius);
  margin-top: var(--spacing-xs);
`;

const FileName = styled.span`
  font-size: var(--input-font-size);
  color: var(--color-black);
`;

const RemoveButton = styled.button`
  color: var(--color-error);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  margin-left: var(--spacing-sm);

  &:hover {
    color: #dc2626;
  }
`;

const ErrorMessage = styled.span`
  color: var(--color-error);
  font-size: 0.75rem;
  font-weight: 500;
`;

export function FileUpload({
  label,
  error,
  accept = '.pdf,.doc,.docx',
  onFileSelect,
  selectedFile,
  id,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onFileSelect(file);
  };

  const handleRemoveFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generatedId = useId('file-upload');
  const fileUploadId = id ?? generatedId;

  return (
    <FileUploadWrapper>
      {label && <Label>{label}</Label>}

      <UploadArea $hasError={!!error}>
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          id={fileUploadId}
        />

        <UploadText>Upload your resume (PDF, DOC, DOCX - max 5MB)</UploadText>
        <Button type="button" onClick={handleClick}>
          Choose File
        </Button>
      </UploadArea>

      {selectedFile && (
        <SelectedFile>
          <FileName>{selectedFile.name}</FileName>
          <RemoveButton onClick={handleRemoveFile} type="button">
            ✕
          </RemoveButton>
        </SelectedFile>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FileUploadWrapper>
  );
}
