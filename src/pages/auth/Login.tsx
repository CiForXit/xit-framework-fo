// @ts-ignore
import styles from './Login.module.css';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import React, {MouseEvent, useState} from 'react';
//import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {ISocialProvider, IUser, LoginType} from '../../model/AuthModel';
import {IAppProps} from '../../App';
import {soicial as tData} from '../../common/js/social_provider';
import SocialProvider from '../../components/auth/SocialProvider';
import Button from '@mui/material/Button';

interface ILoginProps {
  user: IUser;
  login: (user: IUser) => void;
}

const Login = ({authService}: IAppProps) => {
  const [loginUser, setLoginUser] = useState<IUser>();
  const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

  const responseGoogle = (response: any) => {
    if (!response) return;
    console.log(`googleId : [${response.googleId}]`);
    console.log(`tokenId : [${response.tokenId}]`);
    console.log(`accessToken : [${response.accessToken}]`);
    console.log(`tokenObj : `, response.tokenObj);
    setLoginUser({
      snsType: LoginType.GOOGLE,
      userId: response.googleId,
      picture: ''
    });
    //loginUser && authService.login(loginUser);
    //setLoginUser(undefined);
    const res = authService.login(loginUser!);
    console.log(res);
  };
  const responseErrorGoogle = (response: any) => {
    console.log(response);
  };

  const goToMaker = () => {
    // console.log(user.uid);
    // history.push({
    //   pathname: '/maker',
    //   state: {
    //     id: user.uid,
    //     email: user.email
    //   }
    // });
  };

  const onSocialLogin = (e: MouseEvent<HTMLButtonElement>, socialType: string) => {
    authService.getSocialLoginUrl(socialType);
  };
  const onLogin = (e: MouseEvent<HTMLButtonElement>) => {
    if (!e || !e.currentTarget || e.currentTarget.textContent) return;
    //authService.
    // authService //
    //   .login(e.currentTarget.textContent)
    //   .then((data) => goToMaker(data));
  };

  const logout = () => {
    setLoginUser({
      snsType: LoginType.DEFAULT,
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
          {/*<li className={styles.item}>*/}
          {/*  <button className={styles.button} onClick={onLogin}>*/}
          {/*    Google*/}
          {/*  </button>*/}
          {/*</li>*/}
          {/*<li className={styles.item}>*/}
          {/*  <button className={styles.button} onClick={onLogin}>*/}
          {/*    Github*/}
          {/*  </button>*/}
          {/*</li>*/}
          {tData.map((d: ISocialProvider) => (
            <SocialProvider key={d.socialType} authService={authService} social={d} />
          ))}
        </ul>
        <form>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
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
      {/*<GoogleLogin*/}
      {/*  buttonText="login"*/}
      {/*  clientId={clientId}*/}
      {/*  onSuccess={responseGoogle}*/}
      {/*  onFailure={responseErrorGoogle}*/}
      {/*  cookiePolicy={'single_host_origin'}*/}
      {/*/>*/}

      {/*<GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={logout} />*/}
    </section>
  );
};

export default Login;
