import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <NavLink to="/" exact>首页</NavLink>
        <NavLink to="/login" exact>登录方式</NavLink>
        <NavLink to="/list" exact>数据展示</NavLink>
      </div>
    )
  }
}

export default Nav