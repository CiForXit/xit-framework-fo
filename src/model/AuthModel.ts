export const ACCESS_TOKEN_NAME = 'accessToken';
export const REFRESH_TOKEN_NAME = 'accessToken';
export const AUTH_HEADER_NAME = 'Authorization';

export enum ProviderType {
  GOOGLE = 'GOOGLE',
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  LOCAL = 'LOCAL'
}

export interface IUser {
  providerType: ProviderType;
  picture: string;
  userId: string;
  token?: string;
  password?: string;
}

export interface ILoginUser {
  providerType: ProviderType;
  userId: string;
  token: string;
  refreshToken?: string;
}

export interface IProvider {
  providerType: string;
  src: string;
  comment: string;
}
