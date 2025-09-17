'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginCredentials {
  username: string;
  password: string;
}

interface UseAuthOptions {
  onSuccess?: () => void;
}

export function useAuth(options: UseAuthOptions = {}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const result = await response.json() as { success: boolean; error?: string };

      if (!response.ok || !result.success) {
        setError(result.error ?? 'Login failed');
        return { success: false, error: result.error ?? 'Login failed' };
      }

      if (options.onSuccess) {
        options.onSuccess();
      } else {
        router.push('/admin/dashboard');
      }

      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    login,
    isLoading,
    error,
    clearError,
  };
}