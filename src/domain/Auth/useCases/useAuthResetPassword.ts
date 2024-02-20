import {MutationOptions} from '@infra';
import {ResetPasswordAPI} from '../authTypes';
import {useMutation} from '@tanstack/react-query';
import {authService} from '../authService';

interface Variables {
  email: string;
  tempPassword: string;
  newPassword: string;
}

export function useAuthResetPassword(
  options?: MutationOptions<ResetPasswordAPI>,
) {
  const mutation = useMutation<ResetPasswordAPI, Error, Variables>({
    mutationFn: ({email, tempPassword, newPassword}) =>
      authService.resetPassword(email, tempPassword, newPassword),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: resetPassword => {
      if (resetPassword) authService.removeToken();
    },
  });

  return {
    isLoading: mutation.isLoading,
    resetPassword: (variables: Variables) => mutation.mutate(variables),
    result: mutation.data,
  };
}
