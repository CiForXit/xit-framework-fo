import styles from './LoginLocal.module.scss';
import React, {FormEvent, useState} from 'react';
import ROUTES from 'commons/constants/routes';
import {REFRESH_TOKEN_NAME, ACCESS_TOKEN_NAME, IUser, ProviderType} from 'types/AuthModel';
import {IAppProps} from 'App';
import XitCmm from 'commons/XitCmm';
import Alert from 'react-s-alert';
import {IApiResponse} from 'types/ApiModel';
import {ILoginReponse} from 'apis/AuthService';
import {useNavigate} from 'react-router-dom';

const Login = ({authService}: IAppProps) => {
  const [loginUser, setLoginUser] = useState<IUser>();
  const navigate = useNavigate();
  //const [userId, setUserId] = React.useState<string>('');
  //const [password, setPassword] = React.useState<string>('');

  //const [password, setPassword] = React.useState();
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {id, value} = e.target;
  //   if (!value) return;
  //   if (id === 'userId') setUserId(value);
  //   if (id === 'password') setPassword(value);
  // };

  const [userId, setUserId, onChangeUserId] = XitCmm.useInput<string>('');
  const [password, setPassword, onChangePassword] = XitCmm.useInput<string>('');

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //if (!userId) return XitCmm.alertParam('사용자 ID를 입력해 주세요');
    //if (!password) return XitCmm.alertParam('비밀번호를 입력해 주세요');
    if (!userId) return Alert.error('사용자 ID를 입력해 주세요');
    if (!password) return Alert.warning('비밀번호를 입력해 주세요');
    //return;
    authService
      .login({
        providerType: ProviderType.LOCAL,
        picture: '',
        userId,
        token: '', // ?? alert('''')
        password
      })
      .then((res: IApiResponse<ILoginReponse>) => {
        if (!res.success) {
          return;
        }
        if (res.data) {
          Alert.success(`Success ${userId} log in!`);
          localStorage.setItem(ACCESS_TOKEN_NAME, `${res.data.grantType} ${res.data.accessToken}`);
          XitCmm.setCookie(REFRESH_TOKEN_NAME, res.data.refreshToken);
        }
        navigate(ROUTES.MAIN);
        //this.props.history.push("/");
        //data ? console.log(`data: {}`, data) : '';
      });
  };

  const logout = () => {
    Alert.success(`Success ${userId} log out!`);
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    XitCmm.removeCookie(ACCESS_TOKEN_NAME);
    setUserId('');
    setPassword('');
  };

  return (
    <section className={styles.login}>
      <h1>Login</h1>
      <form>
        <input id="userId" type="userId" placeholder="아이디" value={userId} onChange={onChangeUserId} />
        <input id="password" type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
        <div className={styles.button}>
          <button type="button" onClick={handleSubmit}>
            로그인
          </button>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
