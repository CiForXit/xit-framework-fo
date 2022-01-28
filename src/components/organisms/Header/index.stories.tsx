import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from '.';

export default {
  title: 'Organisms / Header',
};

export const index: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="*">
          <Header />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
