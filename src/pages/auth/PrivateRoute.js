import React from 'react';
import {Route, Navigate} from 'react-router-dom';

const PrivateRoute = ({element: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? (
        <Component {...rest} {...props} />
      ) : (
        <Navigate
          to={{
            pathname: '/login',
            state: {from: props.location}
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
