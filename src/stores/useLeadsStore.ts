'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { type LeadResponse } from '~/schemas';

interface LeadsState {
  leads: LeadResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;

  currentFilters: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  };
}

interface LeadsActions {
  setLeads: (leads: LeadResponse[]) => void;
  setPagination: (pagination: LeadsState['pagination']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: LeadsState['currentFilters']) => void;

  fetchLeads: (options?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  updateLeadStatus: (
    leadId: number,
    newStatus: 'PENDING' | 'REACHED_OUT'
  ) => Promise<{ success: boolean; error?: string }>;
  refetch: () => Promise<void>;
}

type LeadsStore = LeadsState & LeadsActions;

export const useLeadsStore = create<LeadsStore>()(
  devtools(
    (set, get) => ({
      leads: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
      },
      isLoading: false,
      error: null,
      currentFilters: {},

      setLeads: (leads) => set({ leads }, false, 'setLeads'),
      setPagination: (pagination) =>
        set({ pagination }, false, 'setPagination'),
      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
      setError: (error) => set({ error }, false, 'setError'),
      setFilters: (filters) =>
        set({ currentFilters: filters }, false, 'setFilters'),

      fetchLeads: async (options = {}) => {
        set({ currentFilters: options }, false, 'setFilters');

        set({ isLoading: true, error: null }, false, 'fetchLeads:start');

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

          const result = (await response.json()) as {
            success: boolean;
            data: {
              leads: LeadResponse[];
              pagination: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
              };
            };
            error?: string;
          };

          if (!result.success) {
            throw new Error(result.error ?? 'Failed to fetch leads');
          }

          set(
            {
              leads: result.data.leads,
              pagination: result.data.pagination,
              isLoading: false,
              error: null,
            },
            false,
            'fetchLeads:success'
          );
        } catch (err) {
          console.error('Error fetching leads:', err);
          set(
            {
              isLoading: false,
              error:
                err instanceof Error ? err.message : 'Failed to fetch leads',
            },
            false,
            'fetchLeads:error'
          );
        }
      },

      updateLeadStatus: async (leadId, newStatus) => {
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

          const currentLeads = get().leads;
          const updatedLeads = currentLeads.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          );

          set({ leads: updatedLeads }, false, 'updateLeadStatus');

          return { success: true };
        } catch (err) {
          console.error('Error updating lead status:', err);
          return {
            success: false,
            error:
              err instanceof Error ? err.message : 'Failed to update status',
          };
        }
      },

      refetch: async () => {
        const { currentFilters, fetchLeads } = get();
        await fetchLeads(currentFilters);
      },
    }),
    {
      name: 'leads-store',
    }
  )
);
