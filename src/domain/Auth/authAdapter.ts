import {
  AuthCredentials,
  AuthCredentialsAPI,
  RegisterCredentials,
  RegisterAPI,
} from './authTypes';

function toAuthCredentials(
  authCredentialsAPI: AuthCredentialsAPI,
): AuthCredentials {
  return {
    token: authCredentialsAPI.data.token,
  };
}

function toRegisterCredentials(registerAPI: RegisterAPI): RegisterCredentials {
  return {
    token: registerAPI.data.token,
  };
}

export const authAdapter = {toAuthCredentials, toRegisterCredentials};
