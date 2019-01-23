import React, { Component } from 'react'
import { Modal, Form, Input, Row, Col, message } from 'antd'

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
            <a href="javscript:;" onClick={this.handleScan} >二维码</a>
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
              {getFieldDecorator('userName', {
                rules: [{
                  required: true, message: '请输入账户'
                }]
              })(
                <Input placeholder="请输入账户" />
              )}
            </FormItem>
            <FormItem
            >
              {getFieldDecorator('userPassword', {
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