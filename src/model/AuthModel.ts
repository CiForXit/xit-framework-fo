export enum LoginType {
  DEFAULT = 'DEFAULT',
  GOOGLE = 'GOOGLE',
  KAKAO = 'KAKAO',
  GITHUB = 'GITHUB'
}

export interface IUser {
  snsType: LoginType;
  picture: string;
  userId: string;
  token?: string;
  passwd?: string;
}

export interface ILoginUser {
  snsType: LoginType;
  userId: string;
  token: string;
  refreshToken?: string;
}

export interface ISocialProvider {
  socialType: string;
  src: string;
  comment: string;
}
