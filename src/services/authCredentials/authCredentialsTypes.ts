import {AuthCredentialsData} from '@domain';

export interface AuthCredentialsService {
  authCredentials: AuthCredentialsData | null;
  saveCredentials: (ac: AuthCredentialsData) => Promise<void>;
  removeCredentials: () => Promise<void>;
  isLoading: boolean;
}
