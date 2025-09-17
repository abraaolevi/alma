import { z } from 'zod';

// Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx'] as const;

// Schema for file validation
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File size must be less than 5MB')
    .refine(
      (file) => (ALLOWED_FILE_TYPES as readonly string[]).includes(file.type),
      'Only PDF, DOC, and DOCX files are allowed'
    ),
});

// Schema for upload response
export const uploadResponseSchema = z.object({
  fileName: z.string(),
  filePath: z.string(),
  originalName: z.string(),
  size: z.number(),
  type: z.string(),
});

// Schema for file metadata (for form handling)
export const fileMetadataSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  lastModified: z.number().optional(),
});

// Inferred TypeScript types
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type UploadResponse = z.infer<typeof uploadResponseSchema>;
export type FileMetadata = z.infer<typeof fileMetadataSchema>;