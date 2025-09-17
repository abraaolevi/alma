'use client';

import { useEffect, useState } from 'react';
import { type LeadResponse } from '~/schemas';

interface UseLeadsOptions {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

interface LeadsResponse {
  leads: LeadResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useLeads(options: UseLeadsOptions = {}) {
  const [leads, setLeads] = useState<LeadResponse[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (options.search) params.set('search', options.search);
      if (options.status) params.set('status', options.status);
      if (options.page) params.set('page', options.page.toString());
      if (options.limit) params.set('limit', options.limit.toString());

      const response = await fetch(`/api/leads?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const result = await response.json() as {
        success: boolean;
        data: LeadsResponse;
        error?: string;
      };

      if (!result.success) {
        throw new Error(result.error ?? 'Failed to fetch leads');
      }

      setLeads(result.data.leads);
      setPagination(result.data.pagination);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: number, newStatus: 'PENDING' | 'REACHED_OUT') => {
    try {
      const response = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead status');
      }

      // Update local state
      setLeads(prevLeads =>
        prevLeads.map(lead =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );

      return { success: true };
    } catch (err) {
      console.error('Error updating lead status:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update status' };
    }
  };

  useEffect(() => {
    void fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.search, options.status, options.page, options.limit]);

  return {
    leads,
    pagination,
    isLoading,
    error,
    refetch: fetchLeads,
    updateLeadStatus,
  };
}