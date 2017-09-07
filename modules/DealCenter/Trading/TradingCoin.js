import React from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux'
import {Icon,message, Popover} from 'antd'
import TradingItemBuy from './TradingItemBuy'
import TradingItemSell from './TradingItemSell'
import Delegate from './Delegate'
import {
    lisntenPersonalTradingPrice,
    personalDelegateRecord,
    getPersonalTradingPwd,
    hasSettingDealPwd
} from '../../Redux/Action/DealCenterAction'

const content = (
    <div className="deal-rule-center">
        <p className="deal-rule-center-bidding warn">竞价原则</p>
        <p>价格优先、时间优先。价格较高的买进委托优先于价格较低买进委托，价格较低卖出委托优先于较高的卖出委托；同价位委托，则按时间顺序优先</p>
        <p>卖五:14.00 100</p>
        <p>卖四:13.00 100</p>
        <p>卖三:12.00 100</p>
        <p>卖二:11.00 200</p>
        <p>卖一:10.00 200</p>
        <p>买一:9.00 300 </p>
        <p>买二:8.00 100</p>
        <p>买三:7.00 200</p>
        <p>买四:6.00 200</p>
        <p>买五:5.00 200</p>
        <p>如果这个时候有人打出15.00买入500手,不考虑其它因素,最后的成交价是多少呢？</p>
        <p className="deal-rule-center-bidding blue">成交原则</p>
        <p>1、如果以大于等于卖一的价格挂可全部成交的买一单，则买一吃掉卖一，结算按照卖一价格结算，最新价格展示按照卖一价格展示</p>
        <p>2、如果以小于等于买一的价格挂可全部成交的卖一单，则卖一吃掉买一，结算按着买一价格结算，最新价格展示按照买一价格展示</p>
        <p>3、如果以高于卖五的价格挂买单，卖一数量不够，依次用卖二、卖三补……此时依次按卖一、卖二、卖三……价格结算，最新价格展示顺序为：卖一价格、卖二价格、卖三价格……</p>
        <p>4、如果以低于买五的价格挂卖单，买一的数量不够，依次用买二、买三补……此时按买一、买二、买三……结算，最新价格展示顺序为：买一价格、买二价格、买三价格……</p>
        <p>所以，该用户以高于卖五的价格挂单要买，则以10元成交200手、以11元成交200手、以12元成交100手。</p>
        <p>如果此时有人以8元卖出350手，那么如何成交呢？首先买一9元的300手会完全成交，其次买二以8元成交50手，谁先挂单谁先成交。</p>
    </div>
)

let timer
class TradingCoin extends React.Component {
    state = {
        show:true
    }
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
        if (!token && !uid) return
        const {dispatch} = this.props
        dispatch(lisntenPersonalTradingPrice())
        dispatch(personalDelegateRecord())
        dispatch(getPersonalTradingPwd())
        dispatch(hasSettingDealPwd())

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
                    <a href="javascript:;" className="blue">
                        <Popover placement="rightTop" content={content} trigger="click">
                            <span style={{marginLeft:"20px",marginRight:"5px"}}>竞价/成交原则</span><Icon type="question-circle-o"/>
                        </Popover>
                    </a>
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