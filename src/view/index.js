import React, { Component } from 'react'
import { Row, Col, Icon, Card } from 'antd'
class Home extends Component {

  handleClick = (text) => {
    if (text === 'yidong' || text === 'liantong' || text === 'dianxin') {
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
      scriptUrl: '//at.alicdn.com/t/font_1026098_s7ru6655vhj.js'
    })
    return (
      <div style={{ textAlign: 'center', fontSize: 40, background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16} style={{ marginBottom: '30px'}}>
          <Col onClick={this.handleClick.bind(this, 'jingdong')} span={12}>
            <Card hoverable={true} title="京东" bordered={false}><IconFont style={{ fontSize: '40px' }} type="icon-jingdong" /></Card>
          </Col>
          <Col onClick={this.handleClick.bind(this, 'taobao')} span={12}>
            <Card title="淘宝（天猫、支付宝）" bordered={false}><Icon style={{ fontSize: '40px' }} type="taobao" /></Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col onClick={this.handleClick.bind(this, 'yidong')} span={12}>
            <Card title="移动（尽请期待）"><IconFont style={{ fontSize: '40px' }} type="icon-yidong" /></Card>
          </Col>
          <Col onClick={this.handleClick.bind(this, 'liantong')} span={12}>
            <Card title="联通（尽请期待）"><IconFont style={{ fontSize: '40px' }} type="icon-liantonglogo" /></Card>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '30px'}}>
          <Col onClick={this.handleClick.bind(this, 'dianxin')} span={24}>
            <Card title="电信（尽请期待）"><IconFont style={{ fontSize: '40px' }} type="icon-dianxinlogo" /></Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home