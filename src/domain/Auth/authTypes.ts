export interface AuthCredentialsAPI {
  message: string;
  code: string;
  data: {
    token: string;
  };
}

export interface SignOutAPI {
  message: string;
  code: string;
}

export interface ConfirmEmailAPI {
  message: string;
  code: string;
}

export interface RegisterAPI {
  message: string;
  code: string;
  data: {
    token: string;
  };
}

export interface RegisterCredentials {
  token: string;
}

export interface AuthCredentials {
  token: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
}

export interface SignInData {
  email: string;
  password: string;
}
