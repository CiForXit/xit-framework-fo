import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export default (story: any) => (
  <Router>
    <Routes>
      <Route path="*">{story()}</Route>
    </Routes>
  </Router>
);
