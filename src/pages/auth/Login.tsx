// @ts-ignore
import styles from './Login.module.css';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import React, {MouseEvent, useState} from 'react';
//import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {IUser, IProvider, ProviderType} from '../../model/AuthModel';
import {IAppProps} from '../../App';
import {soicial as tData} from '../../common/js/social_provider';
import SocialProvider from '../../components/auth/SocialProvider';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import Swal from 'sweetalert2';
import * as events from 'events';
import axios from 'axios';
import XitCmm from '../../common/XitCmm';

interface ILoginProps {
  user: IUser;
  login: (user: IUser) => void;
}

const Login = ({authService}: IAppProps) => {
  const [loginUser, setLoginUser] = useState<IUser>();
  const [userId, setUserId] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  //const [password, setPassword] = React.useState();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;
    if (!value) return;
    if (id === 'userId') setUserId(value);
    if (id === 'password') setPassword(value);
  };
  const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

  const SERVER = 'http://localhost:8090/api/v1/auth/login';

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
  const onLogin = (e: MouseEvent<HTMLButtonElement>) => {
    if (!userId) return XitCmm.alertParam('사용자 ID를 입력해 주세요');
    if (!password) return XitCmm.alertParam('비밀번호를 입력해 주세요');

    authService
      .login({
        providerType: ProviderType.LOCAL,
        picture: '',
        userId: userId,
        token: '', // ?? alert('''')
        password: password
      })
      .then((data) => (data ? console.log(`data: {}`, data) : ''));
  };

  const logout = () => {
    setLoginUser({
      providerType: ProviderType.LOCAL,
      userId: '',
      picture: ''
    });
  };

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          {tData.map((d: IProvider) => (
            <SocialProvider key={d.providerType} authService={authService} provider={d} />
          ))}
        </ul>
        <form>

          <input id="userId" type="userId" placeholder="아이디" value={userId} onChange={handleChange} />
          <input id="password" type="password" placeholder="비밀번호" value={password} onChange={handleChange} />
          <div className={styles.button}>
            <Button variant="contained" onClick={onLogin}>
              로그인
            </Button>
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          </div>
        </form>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
