import React from 'react';
import {IAppProps} from 'App';
import LoginLocal from 'pages/Login/LoginLocal';
import LoginSocial from 'pages/Login/LoginSocial';

const Login = ({authService}: IAppProps) => {
  return (
    <div>
      <LoginLocal authService={authService} />
      {/*<LoginSocial authService={authService} />*/}
    </div>
  );
};

export default Login;
