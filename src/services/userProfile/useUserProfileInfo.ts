import {create} from 'zustand';

import {UserProfileService} from './userProfileTypes';

export function useUserProfileInfo(): UserProfileService {
  return useUserProfileZustand();
}

const useUserProfileZustand = create<UserProfileService>(set => ({
  userProfile: null,
  isLoading: false,
  saveUserProfile: async up => set({userProfile: up}),
  removeUserProfile: async () => set({userProfile: null}),
}));
