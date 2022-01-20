import React, {Component} from 'react';
import {Navigate} from 'react-router-dom';
import {ACCESS_TOKEN_NAME} from '../../model/AuthModel';
//import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    var results = regex.exec(this.props.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  render() {
    const token = this.getUrlParameter('token');
    const error = this.getUrlParameter('error');

    if (token) {
      localStorage.setItem(ACCESS_TOKEN_NAME, token);
      return (
        <Navigate
          to={{
            pathname: '/profile',
            state: {from: this.props.location}
          }}
        />
      );
    } else {
      return (
        <Navigate
          to={{
            pathname: '/',
            state: {
              from: this.props.location,
              error: error
            }
          }}
        />
      );
    }
  }
}

export default OAuth2RedirectHandler;
