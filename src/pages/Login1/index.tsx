import React, {useContext} from 'react';

import {useNavigate} from 'react-router-dom';
import {IconBtn} from 'components';
import {OAUTH_GOOGLE, LOGIN_SOCIAL} from 'commons/constants/string';
import googleSvg from 'assets/img/google.svg';
import LogoSvg from 'assets/img/logo.svg';
import LoginTemplate from './templates';
import {AfterLoginState} from 'stores/afterLoginStore';

const {REACT_APP_SERVER_URL} = process.env;

const AuthURL = (returnTo = '/'): string => `${REACT_APP_SERVER_URL}/api/auth?returnTo=${returnTo}`;

function Login(): React.ReactElement {
  const history = useNavigate();
  const loginCallbackState = useContext(AfterLoginState);

  return (
    <LoginTemplate
      logoImg={
        <img
          data-testid={'login-logo'}
          alt={'Logo'}
          src={LogoSvg}
          onClick={() => {
            history('/');
          }}
        />
      }
      socialLoginLabel={LOGIN_SOCIAL}
      oauthContent={
        <IconBtn
          btnProps={{
            styletype: 'transparent-border',
            onClick: () => {
              window.location.href = AuthURL(loginCallbackState);
            }
          }}
          fullid
          noneIconColor={'black'}
          circleImgSrc={googleSvg}
          children={OAUTH_GOOGLE}
        />
      }
    />
  );
}

export default Login;
