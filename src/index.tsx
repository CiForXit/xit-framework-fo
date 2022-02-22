import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';

import AuthService from './apis/AuthService';
//import {ThemeProvider} from 'styled-components';
import {createTheme, ThemeProvider} from '@mui/material';
import theme from 'commons/theme';
import defaultTheme from 'commons/style/themes/default';
import Normalize from 'commons/style/Normalize';
import GlobalStyles from 'commons/style/GlobalStyle';
import {Provider} from 'react-redux';
import store from 'stores';

const authService = new AuthService();

ReactDOM.render(
  // <Provider store={{}}>
  <ThemeProvider theme={createTheme}>
    <Normalize />
    <GlobalStyles />
    <App authService={authService} />
  </ThemeProvider>,
  // </Provider>,
  document.getElementById('root')
);
