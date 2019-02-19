import React, { Component } from 'react'
import { Col, Row, Card, Avatar, Badge, Icon } from 'antd'
import { data } from '../mock'
import JSONPretty from 'react-json-pretty'

// 白条信息
// 京东评分
// 白条状态
// 快捷支付卡信息
// 近两年订单信息
// 昵称
class Charts extends Component {
    state =  {
        title: '京东'
    }
    render() {
        const { BtPrivilege, billLists, card, order } = data.data
        const { accountScore, activityScore, btType, credit, financeScore, needPayTotal, nickName } = data.data
        console.log(nickName)
        return (
            <div>
                <Card
                    title="查询数据"
                >
                    <h3>{`${this.state.title}数据`}</h3>
                    <Row>
                        <Col>
                            <Avatar size={64} icon="user" />
                            <span>用户昵称:{nickName}</span>
                        </Col>
                        <Col>
                            <h4>账户信息</h4>
                            <p>白条开通状态</p>
                            <p>账户余额</p>
                            <p>白条消费额度</p>
                            <p>京享值</p>
                            <p>账户类型</p>
                            <p>是否绑定微信</p>
                            <p>账户风险等级</p>
                            <p>白条待还金额</p>
                            <p>小白信用值</p>
                            <p>金融评分</p>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default Charts