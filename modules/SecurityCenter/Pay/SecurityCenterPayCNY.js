import React from 'react';
import {Tabs} from 'antd';
import {getBeforeDate} from '../../../tools/utils'
import {requestUserInfoInPay, queryRechargeRecord, authConfig} from '../../Redux/Action/PayAction'
import WeChatPay from './WeChatPay'
import AlipayPay from './AlipayPay'
import BankCardPay from './BankCardPay'
import PayInform1 from './PayInform1'
import PayInform2 from './PayInform2'
import PayInform3 from './PayInform3'

const TabPane = Tabs.TabPane;


export default class SecurityCenterPayCNY extends React.Component {
    state = {
        key: 1,
        show: true
    }

    // 标签页分页
    callback(key) {
        console.log(key,"key")
        const { status } = this.props.rechargeCNYList
        const { dispatch } = this.props
        let info = {
            rechargeType: key,
            actionId: 1,
            currencyId: 1
        }

        this.setState({
            key: key
        }, () => {
            let params = {
                start: 1,
                status: status,
                screateTimeBegin: getBeforeDate(1),
                createTimeEnd: getBeforeDate(),
                rechargeType: this.state.key
            }
            dispatch(queryRechargeRecord(dispatch,params))
        })
        dispatch(authConfig(dispatch,info))
    }

    //一开始拿到信息列表
    componentDidMount() {
        const {dispatch} = this.props
        let info = {
            rechargeType: 1,
            actionId: 1,
            currencyId: 1
        }
        dispatch(requestUserInfoInPay())
        dispatch(authConfig(dispatch,info))
    }

    render() {
        return (
            <div className="SecurityCenterPayCNY">
                <div className="PayCNYBox">
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="微信" key="1">
                            <WeChatPay {...this.props} keys={this.state.key}/>
                        </TabPane>
                        {/*<TabPane tab="支付宝" key="2">*/}
                            {/*<AlipayPay {...this.props} keys={this.state.key}/>*/}
                        {/*</TabPane>*/}
                        <TabPane tab="银行卡转账" key="3">
                            <BankCardPay {...this.props} keys={this.state.key}/>
                        </TabPane>
                    </Tabs>
                </div>
                {this.state.key == 1 ? <PayInform1 {...this.props}/> : this.state.key == 2 ? <PayInform2 {...this.props}/> : this.state.key == 3 ?
                    <PayInform3 {...this.props}/> : ''}
            </div>
        )
    }
}