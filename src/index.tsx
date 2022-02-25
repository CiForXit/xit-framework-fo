import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import AuthService from './apis/AuthService';
import { store } from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const authService = new AuthService();
//const theme = createTheme();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App authService={authService} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
