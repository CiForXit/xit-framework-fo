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

export interface ISocialProvider {
  socialType: string;
  src: string;
  comment: string;
}
