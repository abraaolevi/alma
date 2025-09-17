'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getApiError, submitLeadForm } from '~/lib/api-client';
import { type CreateLeadInput } from '~/schemas';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  websiteUrl: string;
  visaTypes: string[];
  resume: FileList | null;
  moreInfo: string;
}

interface UseLeadSubmissionOptions {
  onSuccess?: () => void;
}

export function useLeadSubmission(options: UseLeadSubmissionOptions = {}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const leadData: Omit<CreateLeadInput, 'resumeUrl'> = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        country: data.country,
        websiteUrl: data.websiteUrl,
        visaTypes: data.visaTypes,
        moreInfo: data.moreInfo,
      };

      const file =
        data.resume && data.resume.length > 0 ? data.resume[0] : undefined;

      const result = await submitLeadForm({
        lead: leadData,
        file,
      });

      if (!result.success) {
        const errorMessage = getApiError(result);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      if (options.onSuccess) {
        options.onSuccess();
      } else {
        router.push('/thank-you');
      }

      return { success: true };
    } catch (err) {
      console.error('Error submitting form:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  return {
    submitLead,
    isSubmitting,
    error,
    clearError,
  };
}
