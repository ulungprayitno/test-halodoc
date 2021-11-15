import React, {Fragment} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/home';
import DetailPage from './pages/detail'

const App = () => {
  return (
    <Fragment>
      <Router basename="/">
          <HomePage />
      </Router>
    </Fragment>
  );
};

export default App;