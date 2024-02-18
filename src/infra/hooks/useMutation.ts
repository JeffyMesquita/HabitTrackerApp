import {useState} from 'react';

export interface MutationOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (message: string) => void;
  errorMessage?: string;
}

/**
 *
 * @deprecated use useMutation from `@tanstack/react-query` instead
 */
export function useMutation<TVariable, TData>(
  mutationFn: (variables: TVariable) => Promise<TData>,
  options?: MutationOptions<TData>,
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  async function mutate(variables: TVariable) {
    try {
      setLoading(true);
      setError(null);
      const data = await mutationFn(variables);

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    } catch (mutateError) {
      if (options?.onError) {
        options.onError(options?.errorMessage || 'Erro ao realizar ação');
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return {
    mutate,
    loading,
    error,
  };
}
