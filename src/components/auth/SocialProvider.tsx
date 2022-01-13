import React, {MouseEvent} from 'react';
import {ISocialProvider} from '../../model/AuthModel';
// @ts-ignore
import styles from './SocialProvider.module.css';
import AuthService from '../../service/AuthService';
import {IAppProps} from '../../App';

interface ISocialProps extends IAppProps {
  social: ISocialProvider;
}

const SocialProvider = ({authService, social}: ISocialProps) => {
  const onSocialLogin = (e: MouseEvent<HTMLButtonElement>) => {
    authService.getSocialLoginUrl(social.socialType);
  };

  return (
    <button className={styles.button} onClick={onSocialLogin}>
      <img className={styles.img} src={authService.getSocialImage(social.socialType)} alt={social.comment} />
    </button>
  );
};
export default SocialProvider;
