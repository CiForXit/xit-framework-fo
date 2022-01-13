import React, {memo} from 'react';
// @ts-ignore
import styles from './Header.module.css';

const Header = (/*{onLogout}*/) => {
  console.log('`~~~~~~~~~~~~~~~~~');
  return (
    <header className={styles.header}>
      {/*{onLogout && (*/}
      {/*  <button className={styles.logout} onClick={onLogout}>*/}
      {/*    Logout*/}
      {/*  </button>*/}
      {/*)}*/}
      <img className={styles.logo} src="/images/logo.png" alt="logo" />
      <h1 className={styles.title}>Xit Admin Login</h1>
    </header>
  );
};

export default Header;
