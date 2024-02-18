import {api} from '@api';

import {
  AuthCredentialsAPI,
  ConfirmEmailAPI,
  RegisterAPI,
  SignOutAPI,
} from './authTypes';

async function register(
  email: string,
  password: string,
  firstName: string,
): Promise<RegisterAPI> {
  const response = await api.post('user/register', {email, password});

  return response.data;
}

async function confirmEmail(code: string): Promise<ConfirmEmailAPI> {
  const response = await api.post(`user/confirm-email`, {code});
  return response.data;
}

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsAPI> {
  const response = await api.post('user/login', {email, password});

  return response.data;
}

async function signOut(): Promise<SignOutAPI> {
  const response = await api.get<SignOutAPI>('user/logout');

  return response.data;
}

export const authApi = {
  register,
  confirmEmail,
  signIn,
  signOut,
};
