import React from 'react';
import {IAppProps} from '../../App';
import LoginLocal from '../molecules/login/LoginLocal';
import LoginSocial from '../molecules/login/LoginSocial';

const Login = ({authService}: IAppProps) => {
  return (
    <div>
      <LoginLocal authService={authService} />
      {/*<LoginSocial authService={authService} />*/}
    </div>
  );
};

export default Login;
