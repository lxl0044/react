import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Buy from './TradingBuy'
import Sell from './TradingSell'
import Delegation from './DealCenterDelegation'
import {
    lisntenPersonalTradingPrice,
    personalDelegateRecord,
    getPersonalTradingPwd,
    hasSettingDealPwd
} from '../../Redux/Action/DealCenterAction'

class DealCenterTrading extends React.Component {

    componentDidMount() {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        if (!token && !uid) return
        const {dispatch} = this.props
        dispatch(lisntenPersonalTradingPrice())
        dispatch(personalDelegateRecord())
        dispatch(getPersonalTradingPwd())
        dispatch(hasSettingDealPwd())

    }

    render () {
        const { boxColor, color, boxTopColor } = this.props.style
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')

        return (
            <div className="new-dealcenter-trading-coin">
                { !token && !uid ? <div className="trading-wrapper">
                    <Link to="/login">请登录后进行交易</Link>
                </div> : ''
                }
                <div className="new-dealcenter-trading-container" style={{color: `${color}`}}>
                    <div className="new-dealcenter-trading-cont">
                        <div className="trading-buy-sell clearfix" style={{backgroundColor: `${boxColor}`}}>
                            <Buy { ...this.props }/>
                            <Sell { ...this.props }/>
                        </div>
                        <div className="trading-tips" style={{backgroundColor: `${boxTopColor}`}}>
                            <p className="warn">温馨提示：数字货币价格波动较大，其交易存在较大风险，请您投资前对数字货币充分认知，理性判断自己的投资能力，审慎做出投资决策！</p>
                        </div>
                    </div>
                </div>
                <Delegation { ...this.props }/>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.dealcenterRealtime
    }
})(DealCenterTrading)