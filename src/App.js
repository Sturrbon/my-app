import React, { Component } from 'react';
import { Layout, Card } from 'antd'

const { Header, Content } = Layout
class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
        </Header>
        <Content style={{ padding: '0 10px', margin: '20px 0 0 0', minHeight: '800px' }}>
          <Card title="欢迎访问">
            {this.props.children}
          </Card>
        </Content>
      </Layout>
    );
  }
}

export default App;
