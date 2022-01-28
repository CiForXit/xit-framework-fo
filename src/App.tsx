import styles from './App.module.css';
import AuthService from './apis/AuthService';
import Header from './components/atoms/Header';
import React, {useState} from 'react';
import Footer from './components/atoms/Footer';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from './components/atoms/NotFound';
import Login from './components/organisms/Login';
//import {ACCESS_TOKEN_NAME} from './model/AuthModel';

//export type TAuthservice = AuthService;

export interface IAppProps {
  authService: AuthService;
}

const App = ({authService}: IAppProps) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // const [authenticated, setAuthenticated] = useState(false);
  //
  // const loadCurrentlyLoggedInUser = () => {
  //   authService
  //     .getCurrentUser()
  //     .then((response) => {
  //       setCurrentUser(response || null);
  //       setAuthenticated(true);
  //     })
  //     .catch((error) => {});
  // };
  //
  // const handleLogout = () => {
  //   localStorage.removeItem(ACCESS_TOKEN_NAME);
  //   setCurrentUser(null);
  //   setAuthenticated(false);
  //   Alert.success("You're safely logged out!");
  // };

  // useEffect(() => {
  //   loadCurrentlyLoggedInUser();
  // }, [loadCurrentlyLoggedInUser]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Login authService={authService} />} />
          {/*<PrivateRoute path="/profile" authenticated={authenticated} currentUser={currentUser} element={Profile} />*/}
          {/*<Route path="/oauth2/redirect/*" element={<OAuth2RedirectHandler />} />*/}
          <Route element={NotFound} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Alert stack={{limit: 3}} timeout={3000} position="top-right" effect="slide" offset={65} />
    </div>
  );
};

export default App;
