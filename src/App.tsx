import styles from './App.module.css';
import AuthService from './apis/AuthService';
import Header from './components/atoms/Header';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Footer from './components/atoms/Footer';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import NotFound from './components/atoms/NotFound';
import Login from './components/organisms/Login';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';

import { Loading } from 'components';
import { useCookies } from 'react-cookie';
import defaultTheme from 'commons/style/themes/default';
import Normalize from 'commons/style/Normalize';
import GlobalStyles from 'commons/style/GlobalStyle';
import GlobalStoreProvider from 'stores';
import { ThemeProvider } from 'styled-components';
import {useApiRequest, useIsMount} from "./hooks";
import {checkJoinEvent} from "./apis";
import {FAILURE, SUCCESS} from "./hooks/useApiRequest";
import {FORBIDDEN, NOT_FOUND, OK, UNAUTHORIZED} from "http-status";
import {NOT_OPEN, SOLD_OUT} from "./commons/constants/number";
import {RESERVE_INVALID_DATE, RESERVE_REQUIRE_LOGIN, RESERVE_SOLD_OUT, RESERVE_WRONG_NUMBER} from "./commons/constants/string";
import {AfterLoginAction} from "./stores/afterLoginStore";
import {UserAccountAction, UserAccountState} from "./stores/accountStore";
import {defaultAccountState} from "./stores/accountStore/reducer";
import SignUp from "./pages/SignUp";
import EventJoin from "./pages/EventJoin";
import EventCreate from "./pages/EventCreate";
import EventDetail from "./pages/EventDetail";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";

console.log(process.env);
const { REACT_APP_TEST_UID_TOKEN } = process.env;

//import {ACCESS_TOKEN_NAME} from './model/AuthModel';

//export type TAuthservice = AuthService;
const authService = new AuthService();

export interface IAppProps {
  authService: AuthService;
}

const App : React.FC = () => {
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
    <GlobalStoreProvider>
      <ThemeProvider theme={defaultTheme}>
        <Normalize />
        <GlobalStyles  theme={defaultTheme}/>
        <BrowserRouter>
          <Routes>
            <Route path="/login/*" element={<Login authService={authService}/>}/>
            <Route path="*" element={<NotFound/>}/>
            {/*
            <PublicRoute path="/" element={<Main/>} />
            <PublicRoute path="/login/*" element={<Login authService={authService}/>} />
            <PublicRoute path="/signup" element={SignUp} />
            <PrivateRoute path="/event/create" element={<EventCreate/>} />
            <PublicRoute
              path="/events/:eventId([0-9]+)"
              element={<EventDetail/>}
            />
            <JoinRoute
              path="/events/:eventId([0-9]+)/register/tickets"
              element={<EventJoin/>}
            />
            <PrivateRoute
              path="/my/:templateName(tickets|events)"
              element={<MyPage/>}
            />
            <PublicRoute path="*" element={<NotFound/>} />
            */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </GlobalStoreProvider>


    //
    // <div className={styles.app}>
    //   <BrowserRouter>
    //     <Header />
    //
    //     <Routes>
    //       <Route path="/" element={<Login authService={authService} />} />
    //       {/*<PrivateRoute path="/profile" authenticated={authenticated} currentUser={currentUser} element={Profile} />*/}
    //       {/*<Route path="/oauth2/redirect/*" element={<OAuth2RedirectHandler />} />*/}
    //       <Route element={NotFound} />
    //     </Routes>
    //     <Footer />
    //   </BrowserRouter>
    //   <Alert stack={{limit: 3}} timeout={3000} position="top-right" effect="slide" offset={65} />
    // </div>
  );
};

export default App;

function JoinRoute({
                     element: TargetPage,
                     ...rest
                   }: any): React.ReactElement {
  const history = useNavigate();
  const isCallRequest = useRef(false);
  const [checkEvent, setCheckEvent] = useState(false);
  const [checkOpenResult, fetchCheckOpen] = useApiRequest<any>(checkJoinEvent);

  const path = window.location.pathname;
  const PATH_REGEX = /\/events\/([0-9]+)\/register\/tickets/;
  const idRegex = PATH_REGEX.exec(path);
  const ticketId = idRegex ? idRegex[1] : '';

  useEffect(() => {
    if (isCallRequest.current) return;
    fetchCheckOpen({ type: 'REQUEST', body: [ticketId, 1] });
    isCallRequest.current = true;
  }, [fetchCheckOpen, ticketId, isCallRequest]);

  useEffect(() => {
    if (checkOpenResult.type === SUCCESS || checkOpenResult.type === FAILURE) {
      setCheckEvent(true);
      if (checkOpenResult.err && checkOpenResult.err.response) {
        const { status, data } = checkOpenResult.err.response;
        const { state } = data;
        if (status === FORBIDDEN) {
          switch (state) {
            case NOT_OPEN:
              return alert(RESERVE_INVALID_DATE);
            case SOLD_OUT:
              return alert(RESERVE_SOLD_OUT);
          }
        }
        if (status === NOT_FOUND) {
          return alert(RESERVE_WRONG_NUMBER);
        }
        if (status === UNAUTHORIZED) {
          return alert(RESERVE_REQUIRE_LOGIN);
        }
      }
    }
  }, [checkOpenResult]);

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return !checkEvent ? (
          <Loading />
        ) : checkOpenResult.status === OK ? (
          <TargetPage {...props} />
        ) : (
          history(`/events/${ticketId}`, {replace: true})
        );
      }}
    />
  );
}

function PublicRoute({ ...rest }: any): React.ReactElement {
  const { setLoginCallback } = useContext(AfterLoginAction);

  useEffect(() => {
    setLoginCallback('/');
  }, [setLoginCallback]);

  return <Route {...rest} />;
}

function PrivateRoute({
                        element: TargetPage,
                        ...rest
                      }: any): React.ReactElement {
  const [cookies] = useCookies(['UID']);
  const accountState = useContext(UserAccountState);
  const { setLoginState } = useContext(UserAccountAction);
  const [isLoginCheck, setIsLoginCheck] = useState(false);
  const { setLoginCallback } = useContext(AfterLoginAction);
  const path = window.location.pathname;

  useEffect(() => {
    setLoginState(true);
  }, [setLoginState]);

  useEffect(() => {
    if (isLoginCheck && !accountState.isLogin) setLoginCallback(path);
  }, [rest, accountState.isLogin, setLoginCallback, isLoginCheck, path]);

  useIsMount(() => {
    if (defaultAccountState !== accountState) setIsLoginCheck(true);
  }, accountState);

  if (cookies.UID === `${REACT_APP_TEST_UID_TOKEN}`) {
    return (
      <Route {...rest} render={(props: any) => <TargetPage {...props} />} />
    );
  }

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return !isLoginCheck ? (
          <Loading />
        ) : accountState.isLogin ? (
          <TargetPage {...props} />
        ) : (
          // <Redirect to="/login" />
          <Route element={<Navigate replace to="/login"/>}/>
        );
      }}
    />
  );
}

