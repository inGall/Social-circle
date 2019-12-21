import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Test from './pages/Test';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/LoginPage" component={LoginPage} />
          <Route exact path="/MainPage" component={MainPage} />
          <Route exact path="/Test" component={Test} />
        </Switch>
      </Router>
    );
  }
}

export default App;
