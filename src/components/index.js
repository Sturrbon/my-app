import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'

class Home extends Component {

  handleClick = () => {
    console.log(this)
    this.props.history.push('/login')
  }

  render() {
    const Jd = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1026098_uyw3843jcr8.js'
    })
    return (
      <div style={{ textAlign: 'center', fontSize: 40 }}>
        <Row>
          <Col onClick={this.handleClick} span={6}>京东</Col>
          <Col span={6}>淘宝</Col>
          <Col span={6}>天猫</Col>
          <Col span={6}>支付宝</Col>
        </Row>
        <Row>
          <Col span={6}>
            <Jd />
          </Col>
          <Col span={6}>
            <Icon type="taobao" />
          </Col>
          <Col span={6}>
            <Icon type="tianmao" />
          </Col>
          <Col span={6}>
            <Icon type="alipay" />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home