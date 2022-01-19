import React from 'react';
import {IAppProps} from '../App';
import LoginLocal from '../pages/auth/LoginLocal';
import LoginSocial from '../pages/auth/LoginSocial';

const Login = ({authService}: IAppProps) => {
  return (
    <div>
      <LoginLocal authService={authService} />
      <LoginSocial authService={authService} />
    </div>
  );
};

export default Login;
