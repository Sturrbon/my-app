import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import App from '../App'
import NotFound from '../NotFound'

import Login from '../components/login'

class RouterMap extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={App}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/home/login" component={Login}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default RouterMap