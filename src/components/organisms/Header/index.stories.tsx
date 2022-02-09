import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from '.';

export default {
  title: 'Organisms / Header'
};

export const index: React.FC = () => (
  <>
    <Router>
      <Routes>
        <Route path="*">
          <Header />
        </Route>
      </Routes>
    </Router>
  </>
);
