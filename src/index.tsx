import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';

import AuthService from './apis/AuthService';
import store from 'stores';

const authService = new AuthService();
//const theme = createTheme();

ReactDOM.render(
  // <Provider store={{}}>
  // <ThemeProvider theme={createTheme}>
  //   <Normalize />
  //   <GlobalStyles />
  <App authService={authService} />,
  //</ThemeProvider>,
  // </Provider>,
  document.getElementById('root')
);
