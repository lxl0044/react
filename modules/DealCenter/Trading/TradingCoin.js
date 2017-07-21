import React from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux'
import {Icon} from 'antd'
import TradingItemBuy from './TradingItemBuy'
import TradingItemSell from './TradingItemSell'
import Delegate from './Delegate'
import {
    lisntenPersonalTradingPrice,
    personalDelegateRecord,
    getPersonalTradingPwd,
    hasSettingDealPwd
} from '../../Redux/Action/DealCenterAction'


let timer
class TradingCoin extends React.Component {

    closeAlertTip = () => {
        const {dispatch} = this.props
        dispatch({type: 'CLOSE_TIPS_BOX'})
    }
    //点击交易规则跳转个人中心FAQ
    onDealCenter () {
        sessionStorage.setItem("dealCenter", "8")
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        const {currentId} = this.props.cates.current
        if (!token && !uid) return
        const {dispatch} = this.props
        dispatch(lisntenPersonalTradingPrice(dispatch, currentId))
        dispatch(personalDelegateRecord())
        dispatch(getPersonalTradingPwd())
        dispatch(hasSettingDealPwd())


        timer = setInterval(function () {
            dispatch(lisntenPersonalTradingPrice(dispatch, currentId))
            dispatch(personalDelegateRecord())
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(timer)
    }

    render() {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        const {hasDealPwd} = this.props

        return (
            <div className="trading">
                {!token && !uid ? <div className="trading-wrapper">
                    <div className="wrapper-cont">
                        <Link to="/login">请登陆后进行交易</Link>
                    </div>
                </div> : ''}
                <div style={{fontSize:"16px",margin:"16px auto",width:"1200px"}}>
                    <Link to="/personal/faq" className="blue" onClick={this.onDealCenter.bind(this)}>
                        <span>交易规则</span>
                    </Link>
                </div>
                <div className="trading-box">
                    <div className="trading-cont fl">
                        {hasDealPwd ? '' : <div className="dealPwd-alert">
                            <div className="clearfix">
                                <Icon type="close-circle-o" className="fr" onClick={this.closeAlertTip}/>
                            </div>
                            <div className="dealPwd-alert-cont">
                                <dl className="text-center">
                                    <dt>交易时需要输入交易密码</dt>
                                    <dd>请设置交易密码</dd>
                                    <dd>
                                        <Link to="/personal/settings">去设置</Link>
                                    </dd>
                                </dl>
                            </div>
                        </div>}
                        <TradingItemBuy {...this.props}/>
                        <TradingItemSell {...this.props}/>
                        <p className="fl"><span className="show">交易密码输入设置可在个人中心-安全设置中关闭</span><Icon type="exclamation-circle" /><span className="warn">温馨提示：数字货币价格波动较大，其交易存在较大风险，请您投资前对数字货币充分认知，理性判断自己的投资能力，审慎做出投资决策!</span></p>
                    </div>
                    <div className="delegate-box fr">
                        <Delegate {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.dealcenterRealtime
    }
})(TradingCoin)