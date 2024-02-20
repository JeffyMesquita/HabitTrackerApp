import {useAuthCredentials} from '@services';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {SignOutAPI} from '../authTypes';

export function useAuthSignOut() {
  const {removeCredentials} = useAuthCredentials();
  const mutation = useMutation<SignOutAPI, Error>({
    mutationFn: () => authService.signOut(),
    retry: false,
    onSuccess: removeCredentials,
  });

  return {
    isLoading: mutation.isLoading,
    signOut: () => mutation.mutate(),
  };
}
