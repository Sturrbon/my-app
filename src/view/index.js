import React, { Component } from 'react'
import { Row, Col, Icon, Card } from 'antd'
import { baseUrl } from '../config/urlconfig'

class Home extends Component {
  constructor() {
    super()
  }

  handleClick = (text) => {
    if (text === 'tianmao' || text === 'zhifubao') {
      alert('敬请期待')
      return
    }
    this.props.history.push({
      pathname: '/login',
      state: {
        flag: text
      }
    })
  }
  render() {
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1026098_0o6ylv7gwbb.js'
    })
    return (
      <div style={{ textAlign: 'center', fontSize: 40, background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16} style={{ marginBottom: '30px'}}>
          <Col onClick={this.handleClick.bind(this, 'jingdong')} span={12}>
            <Card hoverable={true} title="京东" bordered={false}><IconFont style={{ fontSize: '40px' }} type="icon-jingdong" /></Card>
          </Col>
          <Col onClick={this.handleClick.bind(this, 'tianmao')} span={12}>
            <Card title="天猫（尽请期待）" bordered={false}><IconFont style={{ fontSize: '40px' }} type="icon-tianmaot" /></Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col onClick={this.handleClick.bind(this, 'taobao')} span={12}>
            <Card title="淘宝（尽请期待）"><Icon style={{ fontSize: '40px' }} type="taobao" /></Card>
          </Col>
          <Col onClick={this.handleClick.bind(this, 'zhifubao')} span={12}>
            <Card title="支付宝（尽请期待）"><Icon style={{ fontSize: '40px' }} type="alipay" /></Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home