import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlatform } from '../actions'
import { Row, Col, Icon, Card, Modal, Form, Input, message } from 'antd'
import axios from '../axios';
class Home extends Component {
  
  state = {
    operateVisible: false,
    confirmLoading: false,
    operatePlatform: ''
  }

  handleClick = (text) => {
    this.props.handlePlatform(text)
    if (text === 'unicom' || text === 'telecom' || text === 'mobile') {
      this.setState({
        operateVisible: true,
        operatePlatform: text
      })
    } else {
      this.props.history.push({
        pathname: '/login',
        state: {
          flag: text
        }
      })
    }
  }

  handleOk = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        })
        axios.post(`${this.state.operatePlatform}/phone_config`, { 
          phone: values.phone,
          token: 'cdddef32b7ec4be9926d30f545e76c37'
        }).then(res => {
          if (this.state.operatePlatform === 'telecom') {
            this.props.history.push({
              pathname: '/login',
              state: {
                flag: this.state.operatePlatform,
                reqId: res.reqId,
                phone: values.phone
              }
            })
            return;
          }
          if (res.data.needSecondAuth) {
            const reqId = res.reqId
            axios.post(`${this.state.operatePlatform}/refresh_verify_code`, {
              reqId,
              phone: values.phone,
              token: 'cdddef32b7ec4be9926d30f545e76c37'
            }).then(sres => {
              console.log(sres)
              if (sres.data.phaseStatus === 'REFRESH_SMS_SUCCESS') {
                console.log(sres)
              } else {
                message.error('获取验证码失败，请稍后再试')
              }
            })
          }
          //if (res)
          // this.props.history.push({
          //   pathname: '/login',
          //   state: {
          //     flag: this.state.operatePlatform,
          //     reqId: res.reqId
          //   }
          // })
          this.setState({
            confirmLoading: false
          })
        }).catch(err => {
          console.log(err)
          this.setState({
            confirmLoading: false
          })
        })
      }
    })
  }

  handleCancel = () => {
    this.setState({
      operateVisible: false
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
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
            <Card style={{height: '220px'}} hoverable={true} title="淘宝" bordered={false}>
              <p style={{height: '40px'}}>淘宝&天猫&支付宝一键查询</p>
              <Icon style={{ fontSize: '40px', padding: '10px 0' }} type="taobao" />
            </Card>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col onClick={this.handleClick.bind(this, 'mobile')} {...colLayout}>
            <Card hoverable={true}  title="移动">
              <IconFont style={{ fontSize: '40px' }} type="icon-yidong" />
            </Card>
          </Col>
          <Col onClick={this.handleClick.bind(this, 'unicom')} {...colLayout}>
            <Card hoverable={true}  title="联通">
              <IconFont style={{ fontSize: '40px' }} type="icon-liantonglogo" />
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop: '30px'}}>
          <Col onClick={this.handleClick.bind(this, 'telecom')} span={24}>
            <Card hoverable={true}  title="电信"><IconFont style={{ fontSize: '40px' }} type="icon-dianxinlogo" /></Card>
          </Col>
        </Row>
        <Modal
          title="请填写手机号码"
          visible={this.state.operateVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确认'
          cancelText='取消'
          confirmLoading={this.state.confirmLoading}
        >
          <Form>
            <Form.Item
              label="手机号码"
            >
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请填写手机号码'},
                  { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请填写11位手机号码' }
                ]
              })(
                <Input placeholder="请填写手机号码" />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handlePlatform: text => {
      dispatch(getPlatform(text))
    }
  }
}

export default Form.create()(connect(null, mapDispatchToProps)(Home))