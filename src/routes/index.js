import React, { Component } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import App from '../App'
import NotFound from '../NotFound'
import Home from '../view'
import Login from '../view/login'
import List from '../view/list'

class RouterMap extends Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/list" component={List}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}

export default RouterMap