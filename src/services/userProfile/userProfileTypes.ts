import {UserApi} from '@domain';

export interface UserProfileService {
  userProfile: UserApi['data'] | null;
  saveUserProfile: (up: UserApi['data']) => Promise<void>;
  removeUserProfile: () => Promise<void>;
  isLoading: boolean;
}
