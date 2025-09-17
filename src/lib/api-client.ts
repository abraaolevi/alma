import {
  createLeadSchema,
  uploadResponseSchema,
  type CreateLeadInput,
  type CreateLeadResponse,
  type UploadResponse,
} from '~/schemas';
import { type ApiResponse } from '~/types/api';

/**
 * Type-safe API client for interacting with the backend
 */

// Base fetch wrapper with error handling
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    // Handle different types of API responses
    if (!response.ok) {
      // Handle validation errors from backend
      if (data.success === false && Array.isArray(data.details)) {
        const errorMessages = data.details
          .map((err: { message?: string }) => err.message)
          .filter(Boolean)
          .join(', ');
        return {
          success: false,
          error: errorMessages ?? data.error ?? 'Validation failed',
          details: data.details,
        };
      }

      return {
        success: false,
        error: data.error ?? `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return data as ApiResponse<T>;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Create a new lead with Zod validation
 */
export async function createLead(
  data: CreateLeadInput
): Promise<ApiResponse<CreateLeadResponse>> {
  // Validate input data
  const validatedData = createLeadSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error.message,
      details: validatedData.error.errors,
    };
  }

  return apiRequest<CreateLeadResponse>('/api/leads', {
    method: 'POST',
    body: JSON.stringify(validatedData.data),
  });
}

/**
 * Upload a file with proper validation
 */
export async function uploadFile(
  file: File
): Promise<ApiResponse<UploadResponse>> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    // Validate the response structure
    if (result.success && result.data) {
      const validatedData = uploadResponseSchema.safeParse(result.data);

      if (!validatedData.success) {
        return {
          success: false,
          error: validatedData.error.message,
          details: validatedData.error.errors,
        };
      }

      return {
        success: true,
        data: validatedData.data,
      };
    }

    return result as ApiResponse<UploadResponse>;
  } catch (error) {
    console.error('File upload failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'File upload failed',
    };
  }
}

/**
 * Combined function to handle complete form submission:
 * 1. Upload file if provided
 * 2. Create lead with file URL
 */
export async function submitLeadForm(data: {
  lead: Omit<CreateLeadInput, 'resumeUrl'>;
  file?: File;
}): Promise<ApiResponse<CreateLeadResponse>> {
  try {
    let resumeUrl = '';

    // Upload file first if provided
    if (data.file) {
      const uploadResult = await uploadFile(data.file);

      if (!uploadResult.success) {
        return {
          success: false,
          error: uploadResult.error ?? 'Failed to upload file',
        };
      }

      resumeUrl = uploadResult.data?.filePath ?? '';
    }

    // Create lead with file URL
    const leadData: CreateLeadInput = {
      ...data.lead,
      resumeUrl,
    };

    return await createLead(leadData);
  } catch (error) {
    console.error('Form submission failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Form submission failed',
    };
  }
}

/**
 * Type-safe error handling utilities
 */
export function isApiError<T>(
  response: ApiResponse<T>
): response is ApiResponse<never> & { success: false } {
  return !response.success;
}

export function getApiError<T>(response: ApiResponse<T>): string {
  if (isApiError(response)) {
    return response.error ?? 'Unknown error occurred';
  }
  return '';
}
