import {MutationOptions} from '@infra';
import {ForgotPasswordData} from '../authTypes';
import {useMutation} from '@tanstack/react-query';
import {authService} from '../authService';

interface Variables {
  email: string;
}

export function useAuthForgotPassword(
  options?: MutationOptions<ForgotPasswordData>,
) {
  const mutation = useMutation<ForgotPasswordData, Error, Variables>({
    mutationFn: ({email}) => authService.forgotPassword(email),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: forgotPassword => {
      if (forgotPassword.token) {
        authService.updateToken(forgotPassword.token);
      }
    },
  });

  return {
    isLoading: mutation.isLoading,
    forgotPassword: (variables: Variables) => mutation.mutate(variables),
    result: mutation.data,
  };
}
