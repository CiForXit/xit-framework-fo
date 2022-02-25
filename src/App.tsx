import {createTheme, ThemeProvider} from '@mui/material';
import theme from 'commons/theme';
import Normalize from 'commons/style/Normalize';
import GlobalStyles from 'commons/style/GlobalStyle';

import ROUTES from 'commons/constants/routes';

import LoginLocal from 'pages/Login/LoginLocal';
import AuthService from 'apis/AuthService';
import React, {useEffect, useState} from 'react';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {ACCESS_TOKEN_NAME} from 'types/AuthModel';
import {Header} from './stories/Header';
import GridRecord from 'grid';
import {AgGrid} from 'components';
import CellRendering from 'components/organisms/AgGrid/CellRendering';
import {Board, Signin} from 'pages';
import BoardService from 'apis/BoardService';
import Layout from './pages/Layout/Layout';
import Main from './pages/Main';
import Paperbase from './pages/paperbase/Paperbase';
import Board1 from './pages/Board/Board';

export interface IAppProps {
  authService: AuthService;
}

const boardService = new BoardService();

const App = ({authService}: IAppProps) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const loadCurrentlyLoggedInUser = () => {
    authService
      .getCurrentUser()
      .then((response) => {
        setCurrentUser(response || null);
        setAuthenticated(true);
      })
      .catch((error) => {});
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    setCurrentUser(null);
    setAuthenticated(false);
    Alert.success("You're safely logged out!");
  };

  // useEffect(() => {
  //   loadCurrentlyLoggedInUser();
  // }, [loadCurrentlyLoggedInUser]);

  // @ts-ignore
  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />

      <BrowserRouter>
        {/*<Header />*/}

        <Routes>
          <Route path="/" element={<LoginLocal authService={authService} />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/main" element={<Main />} />
          <Route path="/paper" element={<Paperbase />} />

          <Route path="/board" element={<Board />} />
          <Route path="/board1" element={<Board1 />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/grid" element={<GridRecord />} />
          <Route path="/grid2" element={<AgGrid />} />
          <Route path="/grid3" element={<CellRendering />} />
          {/*<Route path={ROUTES.MAIN} element={<Main />} />*/}
          <Route
            path={ROUTES.MAIN}
            element={
              <Header
                user={{currentUser}}
                onLogin={loadCurrentlyLoggedInUser}
                onLogout={handleLogout}
                onCreateAccount={() => {}}
              />
            }
          />
          {/*<PrivateRoute path="/profile" authenticated={authenticated} currentUser={currentUser} element={Profile} />*/}
          {/*<Route path="/oauth2/redirect/*" element={<OAuth2RedirectHandler />} />*/}
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
        {/*<Footer />*/}
      </BrowserRouter>
      <Alert stack={{limit: 3}} timeout={3000} position="top-right" effect="slide" offset={65} />
    </ThemeProvider>
  );
};

export default App;
