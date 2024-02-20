import {useAuthIsEmailAvailable} from '@domain';
import {UseFormGetFieldState, UseFormWatch} from 'react-hook-form';

import {SignUpSchema} from './SignUpSchema';

type Props = {
  watch: UseFormWatch<SignUpSchema>;
  getFieldState: UseFormGetFieldState<SignUpSchema>;
};

type ReturnValues = {
  errorMessage?: string;
  notReady: boolean;
  isFetching: boolean;
};

export function useAsyncValidation({watch, getFieldState}: Props): {
  emailValidation: ReturnValues;
} {
  const email = watch('email');
  const emailState = getFieldState('email');
  const emailIsValid = !emailState.invalid && !emailState.isDirty;
  const emailQuery = useAuthIsEmailAvailable({
    email,
    enable: !emailIsValid,
  });

  return {
    emailValidation: {
      errorMessage: emailQuery.isUnavailable
        ? 'email indisponível.'
        : undefined,
      notReady: emailQuery.isFetching || emailQuery.isUnavailable,
      isFetching: emailQuery.isFetching,
    },
  };
}
