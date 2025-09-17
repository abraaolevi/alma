import { z } from 'zod'

// Schema for creating a new lead
export const createLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  country: z.string().min(1, 'Country is required'),
  websiteUrl: z.string().url('Invalid URL format'),
  visaTypes: z.array(z.string()).min(1, 'At least one visa type is required'),
  resumeUrl: z.string().optional(),
  moreInfo: z.string().min(1, 'More info is required'),
});

// Schema for lead query parameters (GET requests)
export const leadQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: z.enum(['PENDING', 'REACHED_OUT']).optional(),
  search: z.string().optional(),
});

// Schema for lead response
export const leadResponseSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  country: z.string(),
  websiteUrl: z.string(),
  resumeUrl: z.string().nullable(),
  moreInfo: z.string().nullable(),
  status: z.enum(['PENDING', 'REACHED_OUT']),
  visaTypes: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for lead creation response
export const createLeadResponseSchema = z.object({
  id: z.number(),
  message: z.string(),
});

// Inferred TypeScript types
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type LeadQuery = z.infer<typeof leadQuerySchema>;
export type LeadResponse = z.infer<typeof leadResponseSchema>;
export type CreateLeadResponse = z.infer<typeof createLeadResponseSchema>;