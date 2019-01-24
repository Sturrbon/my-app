import React, { Component } from 'react'
import { Modal, Form, Input, Row, Col, message } from 'antd'
import axios from '../axios'

const FormItem = Form.Item
const confirm = Modal.confirm
class Login extends Component {
  constructor() {
    super()
    this.state = {
      // do
      visible: false,
      confirmLoading: false
    }
  }

  handleOk = (e) => {
    e.preventDefault()
    console.log(this)
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value)
        const params = value
        params.token = 'cdddef32b7ec4be9926d30f545e76c37'
        axios.post('/jingdong/login', { params }).then(res => {
          console.log(res)
        })
      }
    })

  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleScan = () => {
    //
    const params = {
      name: '17098389419',
      password: 'Tt7896357',
      token: 'cdddef32b7ec4be9926d30f545e76c37'
    }
    // params.token = 'cdddef32b7ec4be9926d30f545e76c37'
    axios.post('/api/jingdong/login', params).then(res => {
      console.log(res)
    })

    // axios.get('/jingdong/getqrcode', {params:{ token: 'cdddef32b7ec4be9926d30f545e76c37'}}).then(res => {
    //   console.log(res)
    // })
  }

  handleClick = () => {
    this.setState({
      visible: true
    })
  }

  render() {
    const { visible, confirmLoading } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Row>
          <h1>请选择登录方式</h1>
          <Col span={12}>
            <a href="javascript:;" onClick={this.handleClick}>账户密码</a>
          </Col>
          <Col span={12}>
            <a href="javascript:;" onClick={this.handleScan} >二维码</a>
          </Col>
        </Row>
        <Modal
          title="登录"
          confirmLoading={confirmLoading}
          visible={visible}
          okText="确认"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: '请输入账户'
                }]
              })(
                <Input placeholder="请输入账户" />
              )}
            </FormItem>
            <FormItem
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码'
                }]
              })(
                <Input type="password" placeholder="请输入密码" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(Login)