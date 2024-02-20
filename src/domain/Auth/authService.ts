import {api} from '@api';

import {authAdapter} from './authAdapter';
import {authApi} from './authApi';
import {
  AuthCredentialsData,
  ConfirmEmailAPI,
  RegisterCredentials,
  SignOutAPI,
} from './authTypes';

async function register(
  email: string,
  password: string,
  firstName: string,
): Promise<RegisterCredentials> {
  try {
    const registerAPI = await authApi.register(email, password, firstName);
    return authAdapter.toRegisterCredentials(registerAPI);
  } catch (error) {
    console.log('error', error);
    throw new Error('Não foi possível realizar o cadastro');
  }
}

async function confirmEmail(code: string): Promise<ConfirmEmailAPI> {
  const response = await authApi.confirmEmail(code);
  return response;
}

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsData> {
  try {
    const authCredentialsAPI = await authApi.signIn(email, password);

    return authAdapter.toAuthCredentials(authCredentialsAPI);
  } catch (error) {
    throw new Error('email ou senha inválido');
  }
}

async function signOut(): Promise<SignOutAPI> {
  const response = await authApi.signOut();
  return response;
}

function updateToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeToken() {
  api.defaults.headers.common.Authorization = null;
}

async function authenticateByRefreshToken(
  refreshToken: string,
): Promise<AuthCredentialsData> {
  const acAPI = await authApi.refreshToken(refreshToken);
  return authAdapter.toAuthCredentials(acAPI);
}

export const authService = {
  register,
  signIn,
  confirmEmail,
  signOut,
  updateToken,
  removeToken,
  authenticateByRefreshToken,
  isRefreshTokenRequest: authApi.isRefreshTokenRequest,
};
