// @ts-ignore
import styles from './App.module.css';
import Login from './pages/auth/Login';
import AuthService from './service/AuthService';

export type TAuthservice = AuthService;

export interface IAppProps {
  authService: AuthService;
}

const App = ({authService}: IAppProps) => {
  //console.log('~~App~~~' + authService.login());
  //const name1 = () => {};
  return (
    <div className={styles.app}>
      <Login authService={authService} />
    </div>
  );
};

export default App;
