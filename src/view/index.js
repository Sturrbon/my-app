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
    const colLayout = {
      xs: 12,
      sm: 12
    }
    return (
      <div style={{ textAlign: 'center', fontSize: 18, background: '#ECECEC', padding: '10px' }}>
        <Row gutter={6} style={{ marginBottom: '30px'}}>
          <Col onClick={this.handleClick.bind(this, 'jingdong')} {...colLayout}>
            <Card style={{height: '220px'}}  hoverable={true} title="京东" bordered={false}>
              <p style={{height: '40px'}}>京东一键查询</p>
              <IconFont style={{ fontSize: '40px', padding: '10px 0' }} type="icon-jingdong" />
            </Card>
          </Col>
          <Col onClick={this.handleClick.bind(this, 'taobao')} {...colLayout}>
            <Card style={{height: '220px'}} title="淘宝" bordered={false}>
              <p style={{height: '40px'}}>淘宝&天猫&支付宝一键查询</p>
              <Icon style={{ fontSize: '40px', padding: '10px 0' }} type="taobao" />
            </Card>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col onClick={this.handleClick.bind(this, 'yidong')} {...colLayout}>
            <Card title="移动">
              <p>敬请期待</p>
              <IconFont style={{ fontSize: '40px' }} type="icon-yidong" />
            </Card>
          </Col>
          <Col onClick={this.handleClick.bind(this, 'liantong')} {...colLayout}>
            <Card title="联通">
              <p>敬请期待</p>
              <IconFont style={{ fontSize: '40px' }} type="icon-liantonglogo" />
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop: '30px'}}>
          <Col onClick={this.handleClick.bind(this, 'dianxin')} span={24}>
            <Card title="电信"><IconFont style={{ fontSize: '40px' }} type="icon-dianxinlogo" /></Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home