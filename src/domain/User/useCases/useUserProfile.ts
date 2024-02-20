import {MutationOptions} from '@infra';
import {useUserProfileInfo} from '@services';
import {useMutation} from '@tanstack/react-query';

import {userService} from '../userService';
import {UserApi} from '../userTypes';


export function useUserProfile(options?: MutationOptions<UserApi>) {
  const {saveUserProfile} = useUserProfileInfo();
  const mutation = useMutation<UserApi, Error>(userService.me, {
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
    onSuccess: user => {
      saveUserProfile(user.data);
    },
  });

  return {
    isLoading: mutation.isLoading,
    me: () => mutation.mutate(),
  };
}
