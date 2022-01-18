// @ts-ignore
import styles from './LoginSocial.module.css';
import React, {MouseEvent, useState} from 'react';
//import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {IUser, IProvider, ProviderType} from '../../model/AuthModel';
import {IAppProps} from '../../App';
import {soicial as tData} from '../../common/js/social_provider';
import SocialProvider from '../../components/auth/SocialProvider';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import XitCmm from '../../common/XitCmm';

interface ILoginProps {
  user: IUser;
  login: (user: IUser) => void;
}

const LoginSocial = ({authService}: IAppProps) => {
  const [loginUser, setLoginUser] = useState<IUser>();

  const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

  const responseGoogle = (response: any) => {
    if (!response) return;
    console.log(`googleId : [${response.googleId}]`);
    console.log(`tokenId : [${response.tokenId}]`);
    console.log(`accessToken : [${response.accessToken}]`);
    console.log(`tokenObj : `, response.tokenObj);
    setLoginUser({
      providerType: ProviderType.GOOGLE,
      userId: response.googleId,
      picture: ''
    });
    //loginUser && authService.login(loginUser);
    //setLoginUser(undefined);
    const res = authService.login(loginUser!);
    console.log(res);
  };
  const responseErrorGoogle = (response: any) => {
    console.log('responseErrorGoogle ::' + response);
  };

  const onSocialLogin = (e: MouseEvent<HTMLButtonElement>, providerType: string) => {
    authService.getSocialLoginUrl(providerType);
  };

  return (
    <section className={styles.social}>
      <ul className={styles.list}>
        {tData.map((d: IProvider) => (
          <SocialProvider key={d.providerType} authService={authService} provider={d} />
        ))}
      </ul>
    </section>
  );
};

export default LoginSocial;
