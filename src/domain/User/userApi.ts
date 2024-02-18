import {api} from '@api';

import {User, UserApi, UserInfo, UserProfile} from './userTypes';

async function me(): Promise<UserApi> {
  const response = await api.get<UserApi>('user/me');

  return response.data;
}

export const userApi = {
  me,
};
