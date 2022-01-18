// @ts-ignore
import styles from './App.module.css';
import LoginLocal from './pages/auth/LoginLocal';
import AuthService from './service/AuthService';
import Header from './components/layout/Header';
import React from 'react';
import Footer from './components/layout/Footer';
import LoginSocial from './pages/auth/LoginSocial';

//export type TAuthservice = AuthService;

export interface IAppProps {
  authService: AuthService;
}

const App = ({authService}: IAppProps) => {
  //console.log('~~App~~~' + authService.login());
  //const name1 = () => {};
  return (
    <section className={styles.app}>
      <Header />
      <LoginLocal authService={authService} />
      <LoginSocial authService={authService} />
      <Footer />
    </section>
  );
};

export default App;
