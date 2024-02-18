import {MutationOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {ConfirmEmailAPI} from '../authTypes';

interface Variables {
  code: string;
}

export function useAuthConfirmEmail(
  options?: MutationOptions<ConfirmEmailAPI>,
) {
  const mutation = useMutation<ConfirmEmailAPI, Error, Variables>({
    mutationFn: ({code}) => authService.confirmEmail(code),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: () => {
      authService.removeToken();
    },
  });

  return {
    isLoading: mutation.isLoading,
    confirmEmail: (variables: Variables) => mutation.mutate(variables),
  };
}
