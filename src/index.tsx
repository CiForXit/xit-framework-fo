import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';

import AuthService from './apis/AuthService';

//const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
