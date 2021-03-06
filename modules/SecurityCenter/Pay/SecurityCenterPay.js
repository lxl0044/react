import React from 'react';
import { Icon } from 'antd';
import {Link} from 'react-router';
import { connect } from 'react-redux'
import TopTitle from '../../Common/TopTitle';
import '../../../css/securitycenterpay'
import SecurityCenterPayCNY from './SecurityCenterPayCNY'
import SecurityCenterPayBTC from './SecurityCenterPayBTC'
import SecurityCenterPayCNYTable from './SecurityCenterPayCNYTable'
import SecurityCenterPayBTCTable from './SecurityCenterPayBTCTable'
import CNYwithdraw from '../../../images/CNY-withdraw.png'

let clkCount = 0;//点击更多次数

class SecurityCenterPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:1,
            img:CNYwithdraw,//默认是人民币
            text:"人民币/CNY",//默认币种文字
            more:true,//控制更多的icon
            closeAlert:true//控制温馨提示弹窗的
        }
    }
    // 当充值的币种发生改变的时候
    onChangeValue (e) {
        this.setState({
            value:e.target.value
        })
    }
    //点击更换内容
    clkFunc (id,img,cont) {
        this.setState({
            value:id,
            img:img,
            text:cont
        })
    }
    //点击更多的时候改变按钮的方向
    moreFunc () {
        clkCount ++;
        if (clkCount == 1) {
            this.setState({
                more:false
            })
        } else if (clkCount == 2) {
            this.setState({
                more:true
            })
            clkCount = 0;
        }else{
            // 根本走不到这里
            clkCount = 0;
        }
    }

    //关闭温馨提示的弹窗
    closeALertFunc () {
        this.setState({
            closeAlert:false
        })
    }
    //点击我知道了关闭弹框
    closePayCoin() {
        sessionStorage.setItem('pay', "1")
    }
    componentDidMount () {
        document.body.scrollTop = 0
    }

    render() {
        const { isAuth,isValidatePass } = this.props.userInfo
        const pay = sessionStorage.getItem('pay')
        return (
            <div className="SecurityCenterPay fr">
                <div className="SecurityCenterPay-warp">
                    <TopTitle title="充值"/>
                    {this.state.value ==  1 ? <SecurityCenterPayCNY {...this.props}/> : this.state.value ==  2 ?  <SecurityCenterPayBTC {...this.props}/> : ''}
                    <div
                        className={isAuth == 0 || isValidatePass == 0 || !pay ? "show SecurityCenterPay-alert" : "hide SecurityCenterPay-alert"}>
                        <div
                            className={this.state.closeAlert ? "SecurityCenterPay-alert-box" : "hide SecurityCenterPay-alert-box"}>
                            <div className="bankCardPayTop"></div>
                            <div className="bankCardPayTopTtileIcon clearfix">
                                <span className="fl warn">{isAuth == 0 || isValidatePass == 0 ? "温馨提示" : "风险提示"}</span>
                                {isAuth == 0 || isValidatePass == 0 ?
                                    <span className="fr warn"><Icon type="close-circle-o"
                                                                    onClick={this.closeALertFunc.bind(this)}/></span> : ''}
                            </div>
                            {isAuth == 0 || isValidatePass == 0 ?
                                <div className="SecurityCenterPay-alert-text text-center">
                                    <p>{isAuth === 0 ? "根据监管部门的要求，为保障您的账户及资产安全，" : "为保障您的账户及资金安全，请及时设置交易密码"}</p>
                                    <p className="warn">{isAuth === 0 ? "用户必须通过实名认证，才可以进行充值/提现操作！" : "*交易密码为交易、提现时使用，并非登录密码"}</p>
                                </div> : <div className="SecurityCenterPay-alert-text text-center" style={{marginTop:"30px"}}>
                                    <p style={{padding: "10px", fontSize: "14px", textAlign: "left"}}>
                                        数字货币价格波动较大，其交易存在较大风险（预挖、暴涨暴跌、庄家操控、团队解散、技术缺陷等），12链严格执行《关于防范比特币风险的通知》等政策法规，依法为数字货币投资者提供自由交易平台，但对币的价值不做任何投资承诺，请您投资前对数字货币充分认知，理性判断自己的投资能力，审慎做出投资决策！</p>
                                </div>}
                            {isAuth == 0 || isValidatePass == 0 ? <div className="SecurityCenterPay-alert-btn">
                                {isAuth == 0 || isValidatePass == 0 ? <Link className="warn show text-center"
                                                                            to={isAuth == 0 ? "/personal/certification" : "/personal/settings"}>{isAuth == 0 ? "进行实名认证" : "进行交易密码设置"}</Link>
                                    : <Link style={{margin: "0"}} onClick={this.closePayCoin.bind(this)}
                                            className="warn show text-center">我已了解</Link>}
                            </div> : <div className="SecurityCenterPay-alert-btn" style={{margin: "0 auto"}}>
                                {isAuth == 0 || isValidatePass == 0 ? <Link className="warn show text-center"
                                                                            to={isAuth == 0 ? "/personal/certification" : "/personal/settings"}>{isAuth == 0 ? "进行实名认证" : "进行交易密码设置"}</Link>
                                    : <Link to='/personal/securitycenterpay' style={{margin: "0"}} onClick={this.closePayCoin.bind(this)}
                                            className="warn show text-center">我已了解</Link>}
                            </div>}
                        </div>
                    </div>
                </div>
                {this.state.value == 1 ? <SecurityCenterPayCNYTable { ...this.props }/> : this.state.value ==  2 ? <SecurityCenterPayBTCTable  { ...this.props }/> : ''}

            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.Pay
    }
})(SecurityCenterPay)

