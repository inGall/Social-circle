import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Search from './pages/Search';
import Request from './pages/Request';
import Setting from './pages/Setting';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/LoginPage" component={LoginPage} />
          <Route exact path="/MainPage" component={MainPage} />
          <Route exact path="/Search" component={Search} />
          <Route exact path="/Request" component={Request} />
          <Route exact path="/Setting" component={Setting} />
        </Switch>
      </Router>
    );
  }
}

export default App;
