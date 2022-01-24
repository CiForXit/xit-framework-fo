import React, {MouseEvent} from 'react';
import {IProvider} from '../../../model/AuthModel';
// @ts-ignore
import styles from './SocialProvider.module.css';
import {IAppProps} from '../../../App';
// import fbLogo from '../../common/img/fb-logo.png';
// import googleLogo from '../../common/img/google-logo.png';
// import githubLogo from '../../common/img/github-logo.png';

interface ISocialProps extends IAppProps {
  provider: IProvider;
}

const SocialProvider = ({authService, provider}: ISocialProps) => {
  return (
    <a className="btn btn-block social-btn google" href={authService.getSocialLoginUrl(provider.providerType)}>
      <img src={authService.getSocialImage(provider.providerType)} alt={provider.providerType} />
    </a>
  );
};
export default SocialProvider;
