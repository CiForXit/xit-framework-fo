import React, {MouseEvent} from 'react';
import {IProvider} from '../../model/AuthModel';
// @ts-ignore
import styles from './SocialProvider.module.css';
import {IAppProps} from '../../App';

interface ISocialProps extends IAppProps {
  provider: IProvider;
}

const SocialProvider = ({authService, provider}: ISocialProps) => {
  const onSocialLogin = (e: MouseEvent<HTMLButtonElement>) => {
    authService.getSocialLoginUrl(provider.providerType);
  };

  return (
    <button className={styles.button} onClick={onSocialLogin}>
      <img className={styles.img} src={authService.getSocialImage(provider.providerType)} alt={provider.comment} />
    </button>
  );
};
export default SocialProvider;
