// Re-export all types from schemas for backward compatibility
export type {
  // Common types
  ApiResponse,
  // Lead types
  CreateLeadInput, CreateLeadResponse, ErrorResponse, FileMetadata,
  // Upload types
  FileUploadInput, IdParam, LeadQuery,
  LeadResponse, PaginatedResponse, PaginationMeta, PaginationQuery, SuccessResponse, UploadResponse
} from '~/schemas'

// Export schemas for validation
export {
  // Common schemas
  apiResponseSchema, createLeadResponseSchema,
  // Lead schemas
  createLeadSchema, errorResponseSchema, fileMetadataSchema,
  // Upload schemas
  fileUploadSchema, idParamSchema, leadQuerySchema,
  leadResponseSchema, paginatedResponseSchema, paginationMetaSchema, paginationQuerySchema, successResponseSchema, uploadResponseSchema
} from '~/schemas'

