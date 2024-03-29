export interface AuthCredentialsAPI {
  message: string;
  code: string;
  data: {
    token: string;
    refreshToken: string;
    expires: string;
  };
}

export interface AuthCredentialsData {
  token: string;
  refreshToken: string;
  expires: string;
}

export interface SignOutAPI {
  message: string;
  code: string;
}

export interface FieldIsAvailableAPI {
  message: string;
  isAvailable: boolean;
}

export interface ConfirmEmailAPI {
  message: string;
  code: string;
  data: {
    attempts?: number;
    token?: string;
    confirmed?: boolean;
  };
}

export interface RegisterAPI {
  message: string;
  code: string;
  data: {
    token: string;
  };
}

export interface ForgotPasswordAPI {
  message: string;
  code: string;
  data: {
    token: string;
  };
}

export interface ResetPasswordAPI {
  message: string;
  code: string;
}

export interface RegisterCredentials {
  token: string;
}

export interface AuthCredentials {
  token: string;
}

export interface ForgotPasswordData {
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
