import {
  AuthCredentialsAPI,
  AuthCredentialsData,
  RegisterAPI,
  RegisterCredentials,
} from './authTypes';

function toAuthCredentials(
  authCredentialsAPI: AuthCredentialsAPI,
): AuthCredentialsData {
  return {
    token: authCredentialsAPI.data.token,
    refreshToken: authCredentialsAPI.data.refreshToken,
    expires: authCredentialsAPI.data.expires,
  };
}

function toRegisterCredentials(registerAPI: RegisterAPI): RegisterCredentials {
  return {
    token: registerAPI.data.token,
  };
}

export const authAdapter = {toAuthCredentials, toRegisterCredentials};
