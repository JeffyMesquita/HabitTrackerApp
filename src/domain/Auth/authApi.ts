import {api} from '@api';
import {AxiosRequestConfig} from 'axios';

import {
  AuthCredentialsAPI,
  AuthCredentialsData,
  ConfirmEmailAPI,
  FieldIsAvailableAPI,
  ForgotPasswordAPI,
  RegisterAPI,
  ResetPasswordAPI,
  SignOutAPI,
} from './authTypes';

const REFRESH_TOKEN_URL = 'user/refresh-token';

async function register(
  email: string,
  password: string,
  firstName: string,
): Promise<RegisterAPI> {
  const response = await api.post<RegisterAPI>('user/register', {
    email,
    password,
    firstName,
  });

  return response.data;
}

async function confirmEmail(code: string): Promise<ConfirmEmailAPI> {
  const response = await api.post<ConfirmEmailAPI>('user/confirm-email', {
    code,
  });
  return response.data;
}

async function forgotPassword(email: string): Promise<ForgotPasswordAPI> {
  const response = await api.post<ForgotPasswordAPI>('user/forgot-password', {
    email,
  });

  return response.data;
}

async function resetPassword(
  email: string,
  tempPassword: string,
  newPassword: string,
): Promise<ResetPasswordAPI> {
  const response = await api.post<ResetPasswordAPI>('user/reset-password', {
    email,
    tempPassword,
    newPassword,
  });
  return response.data;
}

async function isEmailAvailable(params: {
  email: string;
}): Promise<FieldIsAvailableAPI> {
  const response = await api.get<FieldIsAvailableAPI>('user/email-available', {
    params,
  });
  return response.data;
}

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>('user/login', {
    email,
    password,
  });

  return response.data;
}

async function signOut(): Promise<SignOutAPI> {
  const response = await api.get<SignOutAPI>('user/logout');

  return response.data;
}

async function refreshToken(refreshToken: string): Promise<AuthCredentialsAPI> {
  const response = await api.post<AuthCredentialsAPI>(REFRESH_TOKEN_URL, {
    refreshToken,
  });
  return response.data;
}

function isRefreshTokenRequest(request: AxiosRequestConfig): boolean {
  const url = request.url;
  return url === REFRESH_TOKEN_URL;
}

export const authApi = {
  register,
  confirmEmail,
  signIn,
  forgotPassword,
  resetPassword,
  isEmailAvailable,
  signOut,
  refreshToken,
  isRefreshTokenRequest,
};
