// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import PageComponent from './components/PageComponent';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/page" component={PageComponent} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
