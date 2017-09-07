import React from 'react';
import {Tabs} from 'antd';
import { sureInstationTrunCoinList, resInstationTabKey } from '../../../Redux/Action/InstationTrunCoinAction'

import InstationTrunCoinTable from './InstationTrunCoinTable'
import InstationTrunJoinTable from './InstationTrunJoinTable'
import { getBeforeDate } from '../../../../tools/utils'
const TabPane = Tabs.TabPane;

export default class InstationTrunCoinTabs extends React.Component {
    state = {
        current:1//分页每次切换的时候
    }
    callback (key) {
        const { dispatch } = this.props
        const { currencyId } = this.props.InstationTrunCoinInfo.attachment
        let parmas = {
            createTimeBegin:getBeforeDate(1),
            createTimeEnd:getBeforeDate(),
            currencyId: currencyId,
            size:10,
            start:1,
            type:key
        }
        this.setState({
            current:1
        })
        dispatch(sureInstationTrunCoinList(dispatch,parmas))
        dispatch(resInstationTabKey(key))
    }
    //接收子组件传过来的页数
    nextModules (page) {
        this.setState({
            current:page
        })
    }
    render() {
        const { defaultKey } = this.props
        return (
            <div className="InstationTrunCoinTabs">
                <Tabs activeKey={`${defaultKey}`} onChange={this.callback.bind(this)}>
                    <TabPane tab="转出记录" key="1">
                        <InstationTrunCoinTable nextModules={this.nextModules.bind(this)} current={this.state.current} {...this.props}/>
                    </TabPane>
                    <TabPane tab="转入记录" key="2">
                        <InstationTrunJoinTable nextModules={this.nextModules.bind(this)} current={this.state.current} {...this.props}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}