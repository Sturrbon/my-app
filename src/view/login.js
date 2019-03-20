import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Button, Spin, Input, Row, Col, Card, message } from 'antd'
import axios from '../axios'

const FormItem = Form.Item
let timer = null
let scanTimer = null
class Login extends Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      msgModalVisible: false,
      operateVisible: false,
      operateConfirmLoading: false,
      msgConfirmLoading: false,
      confirmLoading: false,
      scanLoading: false,
      scanSrc: '',
      scanVisible: false,
      isScan: false,
      isStop: false,
      counter: 120,
      msgCodeId: '',
      scanId: '',
      flag: '',
      reqId: '',
      phone: '',
      dataList: {}
    }
  }

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      this.setState({
        flag: this.props.location.state.flag
      })
      if (this.props.location.state.flag === 'telecom') {
        this.setState({
          reqId: this.props.location.state.reqId,
          phone: this.props.location.state.phone,
          visible: true
        })
      }
    } else {
      this.props.history.push('/')
    }
  }

  // 提交用户名密码
  handleOk = (e) => {
    e.preventDefault()
    this.props.form.validateFields(['name', 'password'], (err, value) => {
      if (!err) {
        this.setState({
          confirmLoading: true
        })
        const params = value
        params.token = 'cdddef32b7ec4be9926d30f545e76c37'
        if (this.state.flag === 'telecom') {
          params.reqId = this.state.reqId
          axios.post( this.state.flag+'/login_submit', params).then(res => {
            console.log(res)
            if (res.data.phaseStatus === 'LOGIN_SUCCESS') {
              if (this.state.flag === 'telecom') {
                const teleParam = {
                  name: this.state.phone,
                  token: 'cdddef32b7ec4be9926d30f545e76c37',
                  reqId: this.state.reqId
                }
                axios.post(this.state.flag+'/refresh_sms_code', teleParam).then(sres => {
                  const res = JSON.parse(sres)
                  if (sres.Response.ResponseData.ResultDesc === '操作成功') {
                    message.success('验证码已发送')
                    this.setState({
                      operateVisible: true
                    })
                  }
                })
              }
            }
          })
        } else {
          axios.post( this.state.flag+'/login', params).then(res => {
          if (res && res.code) {
            const status = res.code
            if (status === 200) {
              message.success(res.m)
              this.goList(res.data)
            } else if (status === 300) {
              message.info(res.m)
              this.setState({
                msgModalVisible: true,
                msgCodeId: res.data.reqId
              })
            } else {
              message.info(res.m)
            }
            this.setState({
              confirmLoading: false,
              visible: false
            })
          }
          this.setState({
            confirmLoading: false
          })
          }).catch(err => {
            console.log(err)
          })
        }
      }
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
    if (this.state.flag === 'telecom') {
      this.props.history.push('/')
    }
  }

  // 获取二维码
  handleScan = () => {
    clearInterval(scanTimer)
    this.setState({
      isScan: true,
      scanVisible: true,
      scanLoading: true
    })
    axios.get(this.state.flag+'/getqrcode', { params: {
      token: 'cdddef32b7ec4be9926d30f545e76c37'
    } }).then(res => {
      if (res) {
        console.log(res)
        message.success(res.m)
        this.setState({
          scanSrc: 'data:image/jpeg;base64,' + res.data.pic,
          scanId: res.data.reqId,
          scanLoading: false
        }, () => {
          this.scanCheck()
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  
  // 验证二维码
  scanCheck = () => {
    clearInterval(scanTimer)
    axios.get(this.state.flag+'/verifyqrcode', {params:{
      reqId: this.state.scanId,
      token: 'cdddef32b7ec4be9926d30f545e76c37'
    }}).then(res => {
      if (res && res.code) {
        const status = res.code
        if (status === 301) {
          message.error('二维码已失效，请重新获取二维码')
        }
        if (status === 200) {
          message.success('成功授权并获取数据')
          this.setState({
            dataList: res.data
          })
          this.goList(res.data)
        }
        if (status === 300) {
          scanTimer = setInterval(() => {
            this.scanCheck()
          }, 2000)
        }
      } else {
        message.error('服务异常')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  handleClick = () => {
    this.setState({
      visible: true,
      isScan: false
    })
  }

  // 提交短信验证码
  handleOkMsg = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          msgConfirmLoading: true
        })
        const reqId = this.state.msgCodeId
        axios.get(this.state.flag+'/verifycode', { params: {
          'token': 'cdddef32b7ec4be9926d30f545e76c37',
          'reqId':reqId,
          'code': values.code
        }}).then(res => {
          if (res && res.code) {
            const status = res.code
            if (status === 200) {
              message.success(res.m)
              this.setState({
                msgModalVisible: false
              })
              this.goList(res.data)
            } else if (status === 300) {
              message.error('服务异常')
            } else if (status === 301) {
              message.error(res.m)
            } else if (status === 302) {
              message.error(res.m)
            }
          }
          this.setState({
            msgConfirmLoading: false
          })
        }).catch(err => {
          message.error('服务异常')
        })
      }
    })
  }

  handleCalcelMsg = () => {
    this.setState({
      msgModalVisible: false
    })
  }

  // 获取验证码
  handleSubmitCode = (e) => {
    e.preventDefault()
    const { isStop } = this.state
    clearInterval(timer)
    if (!isStop) {
      this.setState({
        isStop: true
      })
      axios.get(this.state.flag+`/getcode`, { params: {
        reqId: this.state.msgCodeId,
        token: 'cdddef32b7ec4be9926d30f545e76c37'
      }}).then(res => {
        const status = res.code
        if (status === 200) {
          message.success(res.m)
        } else if (status === 300) {
          message.error(res.m)
        } else if (status === 301) {
          message.error('请稍后再试')
        } else if (status === 302) {
          message.error(res.m)
        }
      }).catch(err => {
        console.log(err)
      })
      timer = setInterval(() => {
        let counter = this.state.counter
        counter --
        if (counter === 0) {
          this.setState({
            isStop: false,
            counter: 120
          })
          clearInterval(timer)
        } else {
          this.setState({
            counter: counter
          })
        }
      }, 1000)
    }
  }

  goList = (d) => {
    this.props.history.push({
      pathname: '/list',
      state: {
        data: d
      }
    })
  }

  handleCancelScan = () => {
    clearInterval(scanTimer)
    this.setState({
      scanVisible: false
    })
  }

  handleOkOperate = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) message.error(err)
      const params = {
        ...values,
        reqId: this.state.reqId,
        token: 'cdddef32b7ec4be9926d30f545e76c37'
      }
      axios.post(`${this.state.flag}/code_submit`, params).then(res => {
        if (res.retMsg === '成功') {
          let i = 0
          while (i < 100) {
            axios.post(`${this.state.flag}/get_status`, {reqId: this.state.reqId, token: 'cdddef32b7ec4be9926d30f545e76c37'}).then(sres => {
              if (res.data.phaseStatus === 'SUCCESS') {
                axios.post(`${this.state.flag}/get_result`, {name: this.state.phone, reqId: this.state.reqId, token: 'cdddef32b7ec4be9926d30f545e76c37'}).then(ssres => {
                  console.log(ssres)  
                  i = 100
                })
              } else {
                i++
              }
            })
          }
        }
      })
    })
  }

  handleCancelOperate = () => {
    this.setState({
      operateVisible: false
    })
  }

  render() {
    const { visible, scanVisible, scanSrc, scanLoading, confirmLoading, msgModalVisible, msgConfirmLoading, isScan, counter, isStop } = this.state
    const { operateVisible, operateConfirmLoading } = this.state
    const { getFieldDecorator } = this.props.form
    const modalTitle = isScan ? '二维码登录' : '账户登录'
    const buttonText = isStop ? (counter + '秒后可再次获取验证码') : '获取验证码'
    const operateModal = (
      <Modal
        title="请填写以下信息"
        visible={operateVisible}
        confirmLoading={operateConfirmLoading}
        okText="确认"
        cancelText="取消"
        onOk={this.handleOkOperate}
        onCancel={this.handleCancelOperate}
      >
        <Form>
          <FormItem label="姓名">
            {getFieldDecorator('sfzname', {
              rules: [{ required: true, message: '请填写姓名'}]
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="身份证号码">
            {getFieldDecorator('idcard', {
              rules: [{ required: true, message: '请填写身份证号码'}]
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="手机验证码">
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请填写验证码'}]
            })(
              <Input type="text" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
    const msgModal = (
      <Modal
        title="请填写短信验证码"
        visible={msgModalVisible}
        confirmLoading={msgConfirmLoading}
        okText="确认"
        cancelText="取消"
        onOk={this.handleOkMsg}
        onCancel={this.handleCalcelMsg}
      >
        <Form>
          <FormItem
            label="短信验证码"
          >
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请填写短信验证码'}]
            })(
              <Input type="text" />
            )}
            <Button type="primary" htmlType="button" disabled={ isStop ? true : false} onClick={this.handleSubmitCode}>{buttonText}</Button>
          </FormItem>
        </Form>
      </Modal>
    )
    const scanModal = (
      <Modal
        title={`京东登录二维码`}
        visible={scanVisible}
        onCancel={this.handleCancelScan}
        footer={null}
      >
        <div style={{ textAlign: 'center' }}>
          <Spin spinning={scanLoading}>
            <div>
              <img alt='二维码' style={{width: '200px'}} src={scanSrc} />
            </div>
          </Spin>
        </div>
      </Modal>
    )
    

    return (
      <div>
        <Row gutter={16}>
          <h1>请选择登录方式</h1>
          <Col span={12}>
            <Card hoverable={true} style={{fontSize: '40px', textAlign: 'center'}} onClick={this.handleClick}>账户密码</Card>
          </Col>
          <Col span={12}>
            <Card hoverable={true} onClick={this.handleScan} style={{ fontSize: '40px', textAlign: 'center' }}>二维码</Card>
          </Col>
        </Row>
        {msgModal}
        {scanModal}
        {operateModal}
        <Modal
          title={modalTitle}
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

const mapStateToProps = state => {
  return {
    platform: state.platform
  }
}

export default connect(mapStateToProps, null)(Form.create()(Login))