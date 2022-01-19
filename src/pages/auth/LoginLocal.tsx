// @ts-ignore
import styles from './LoginLocal.module.css';
import React, {MouseEvent, useState} from 'react';

import {IUser, ProviderType} from '../../model/AuthModel';
import {IAppProps} from '../../App';
import Button from '@mui/material/Button';
import XitCmm from '../../common/XitCmm';
import Alert from 'react-s-alert';

// interface ILoginProps {
//   user: IUser;
//   login: (user: IUser) => void;
// }

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //if (!userId) return XitCmm.alertParam('사용자 ID를 입력해 주세요');
    //if (!password) return XitCmm.alertParam('비밀번호를 입력해 주세요');
    if (!userId) Alert.error('사용자 ID를 입력해 주세요');
    if (!password) Alert.warning('비밀번호를 입력해 주세요');
    return;
    authService
      .login({
        providerType: ProviderType.LOCAL,
        picture: '',
        userId: userId,
        token: '', // ?? alert('''')
        password: password
      })
      .then((data) => {
        localStorage.setItem('accessToken', 'data?.accessToken');
        Alert.success("You're successfully logged in!");
        //this.props.history.push("/");
        //data ? console.log(`data: {}`, data) : '';
      });
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <input
            type="text"
            name="userId"
            className="form-control"
            placeholder="사용자 ID"
            value={userId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <button type="submit" className="btn btn-block btn-primary">
            Login
          </button>
        </div>
        {/*<input id="userId" type="userId" placeholder="아이디" value={userId} onChange={handleChange} />*/}
        {/*<input id="password" type="password" placeholder="비밀번호" value={password} onChange={handleChange} />*/}
        <div className={styles.button}>
          {/*<Button variant="contained">로그인</Button>*/}
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Login;
