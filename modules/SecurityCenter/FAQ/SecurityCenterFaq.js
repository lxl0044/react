import React from 'react';
import TopTitle from '../../Common/TopTitle';
import {Pagination,Tabs} from 'antd';
import Problem from './Problem/Problem'
import Authentication from './Authentication/Authentication'
import Deposit from './Deposit/Deposit'
import Recharge from './Recharge/Recharge'
import Basis from './Basis/Basis'
import DealBasis from './DealBasis/DealBasis'
import DealCenter from './DealCeneter/DealCenter'
import Noun from './Noun/Noun'
const TabPane = Tabs.TabPane;


export default class SecurityCenterFaq extends React.Component {

    //回调函数
    callBack ( ) {
        const dealCenter = sessionStorage.getItem('dealCenter')
        if (dealCenter) {
            sessionStorage.removeItem("dealCenter")
        }
    }
    componentDidMount () {
        const dealCenter = sessionStorage.getItem('dealCenter')
        if (dealCenter) {
            sessionStorage.removeItem("dealCenter")
        }
    }
    componentWillUnmount () {
        sessionStorage.removeItem("dealCenter")
    }
    render() {
        const dealCenter = sessionStorage.getItem('dealCenter')
        return (
            <div className="SecurityCenterFaq fr">
                <div className="FaqTaps">
                    <TopTitle title="FAQ"/>
                    <Tabs defaultActiveKey={!dealCenter ? "1" : dealCenter} onChange={this.callBack.bind(this)}>
                        <TabPane tab="常见问题" key="1">
                            <Problem />
                        </TabPane>
                        <TabPane tab="实名认证" key="2">
                            <Authentication />
                        </TabPane>
                        <TabPane tab="充值" key="3">
                            <Deposit />
                        </TabPane>
                        <TabPane tab="提现" key="4">
                            <Recharge />
                        </TabPane>
                        <TabPane tab="基础知识" key="5">
                            <Basis />
                        </TabPane>
                        <TabPane tab="交易知识" key="6">
                            <DealBasis />
                        </TabPane>
                        <TabPane tab="名词解释" key="7">
                            <Noun />
                        </TabPane>
                        <TabPane tab="交易规则" key="8">
                            <DealCenter />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}