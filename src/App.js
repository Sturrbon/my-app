import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Card } from 'antd'
import { Route } from 'react-router-dom'
import './App.css'
import Home from './components/index'
import manageRoute from './routes/manage'

const { Header, Content, Footer } = Layout
const MenuItem = Menu.Item
const BreadcrumbItem = Breadcrumb.Item

class App extends Component {

  componentWillMount() {
    console.log('App', this)
  }

  render() {
    

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
          <Card>
            <Route exact component={Home} />
          </Card>
          <div>
            {manageRoute.map((route, index) => {
              console.log(route)
              return (
                <div>
                <Route key={index} exact components={`${route}['component']`} path={`${route}['path']`}></Route>
                </div>
              )
            })}
          </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default App;
