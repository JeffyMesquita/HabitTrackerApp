export interface User {}

export interface UserInfo {
  id: string;
  email: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  roleId: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
  occupation: string;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface UserApi {
  code: string;
  message: string;
  data: {
    user: UserInfo;
    profile: UserProfile;
  };
}
