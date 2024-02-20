import {MutationOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {RegisterCredentials} from '../authTypes';

interface Variables {
  email: string;
  password: string;
  firstName: string;
}

export function useAuthRegister(
  options?: MutationOptions<RegisterCredentials>,
) {
  const mutation = useMutation<RegisterCredentials, Error, Variables>({
    mutationFn: ({email, password, firstName}) =>
      authService.register(email, password, firstName),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: authCredentials =>
      authService.updateToken(authCredentials.token),
  });

  return {
    isLoading: mutation.isLoading,
    register: (variables: Variables) => mutation.mutate(variables),
  };
}
