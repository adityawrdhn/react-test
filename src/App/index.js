import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { LayoutHome } from 'App/Layout';
import { Users } from 'App/Pages/Users';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <LayoutHome exact path="/" component={Users} />
        <Redirect to="/" />
      </Switch>
    )
  }
}
