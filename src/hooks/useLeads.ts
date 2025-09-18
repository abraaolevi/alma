'use client';

import { useEffect } from 'react';
import { useLeadsStore } from '~/stores';

interface UseLeadsOptions {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export function useLeads(options: UseLeadsOptions = {}) {
  const {
    leads,
    pagination,
    isLoading,
    error,
    fetchLeads,
    updateLeadStatus,
    refetch,
  } = useLeadsStore();

  useEffect(() => {
    void fetchLeads(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.search, options.status, options.page, options.limit]);

  return {
    leads,
    pagination,
    isLoading,
    error,
    refetch,
    updateLeadStatus,
  };
}
