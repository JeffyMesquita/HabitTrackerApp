import {userApi} from './userApi';
import {UserApi} from './userTypes';

async function me(): Promise<UserApi> {
  const response = await userApi.me();
  return response;
}

export const userService = {
  me,
};
