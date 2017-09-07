import React from 'react';
import {Icon} from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import TopTitle from '../../Common/TopTitle';
import SecurityCenterPayBTC from './12CT/SecurityCenterPayBTC'
import SecurityCenterPayBTCTable from './12CT/SecurityCenterPayBTCTable'
import CTwithdraw from '../../../images/12ct-withdraw.png'
import {addClass, removeClass,getBeforeDate} from '../../../tools/utils'
import {PayCoinList,PayCoinTable} from '../../Redux/Action/PayCoinAction'
import { getCurrentCionInfo } from '../../Redux/Action/PayAction'
import {img} from './../../host'
import {requestUserInfoInWithDraw} from '../../Redux/Action/WithDrawAction'
let clkCount = 0;//点击更多次数
let lists = null//保存点击的li列表
class SecurityCenterPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            more: true,//控制更多的icon
            closeAlert: true,//控制温馨提示弹窗的
            curCoinNum:'',//定义一个变量，每次切换都重新定义时间插件
            current:1//子组件的默认页数
        }
    }
    // 当充值的币种发生改变的时候
    onChangeValue(e) {
        this.setState({
            value: e.target.value
        })
    }
    //点击更换内容
    clkFunc(id, img, cont) {
        lists = this.refs.lists
        let more = this.refs.more
        const {payCoinList} = this.props.PayCoin
        payCoinList.map((cur, index) => {
            if (index == id) {
                //确定点击的币种，向下传入子集
                this.setState({
                    currencyNameEn:cur.currencyNameEn,
                    curCoinNum:1//定义一个变量，每次切换都重新定义时间插件
                })
                addClass(lists.children[id], 'warn-border')
                addClass(lists.children[id].children[0], 'warn-square')
            } else {
                removeClass(lists.children[index], 'warn-border')
                removeClass(lists.children[index].children[0], 'warn-square')
            }
        })
        //判断点击的是哪一个币种，根据下标来判断的
        const { dispatch } = this.props
        const { currencyId } = this.props.PayCoin.payCoinList[id]

        let coinType = {
            currentyId: currencyId,
            walletType: 1
        }
        //table请求数据
        let info = {
            status: 1,//1未完成2完成
            start: 1,
            size: 10,
            currencyId: currencyId,
            beginTime: getBeforeDate(1),
            endTime: getBeforeDate()
        }
        dispatch({type: 'CHANGE_CURRENCYID_IN_PROPERTY', currencyId: currencyId})
        dispatch(PayCoinList(dispatch, currencyId))
        dispatch(PayCoinTable(dispatch,info))
        dispatch(getCurrentCionInfo(dispatch, coinType))
        this.setState({
            value: id,
            img: img,
            text: cont,
            more: true,
            current:1
        })
        //点击更换币种的时候，恢复原来的高度,点击次数恢复0
        more.style.height = "86px"
        clkCount = 0;
    }
    //点击更多的时候改变按钮的方向
    moreFunc() {
        let more = this.refs.more
        clkCount++;
        if (clkCount == 1) {
            more.style.height = "638px"
            this.setState({
                more: false
            })
        } else if (clkCount == 2) {
            more.style.height = "86px"
            this.setState({
                more: true
            })
            clkCount = 0;
        } else {
            // 根本走不到这里
            clkCount = 0;
        }
    }
    //关闭温馨提示的弹窗
    closeALertFunc() {
        this.setState({
            closeAlert: false
        })
    }
    //点击我知道了关闭弹框
    closePayCoin() {
        sessionStorage.setItem('payCoinNum', "1")
    }
    //接收子组件传过来的页数
    nextModules (page) {
        this.setState({
            current:page
        })
    }
    componentDidMount() {
        document.body.scrollTop = 0
        //调取图标列表
        const {dispatch} = this.props
        const { currencyId } = this.props.PayCoin

        dispatch(PayCoinList(dispatch, currencyId))
        dispatch(requestUserInfoInWithDraw())
        dispatch(getCurrentCionInfo(dispatch, { currentyId: currencyId }))
        //table请求数据
        let info = {
            status: 1,//1未完成2完成
            start: 1,
            size: 10,
            currencyId: currencyId,
            beginTime: getBeforeDate(1),
            endTime: getBeforeDate()
        }
        dispatch(PayCoinTable(dispatch, info))
    }
    render() {
        const {isAuth, isValidatePass } = this.props
        const { payCoinList,currencyId } = this.props.PayCoin
        const { text, icoUrl } = this.props.PayCoin.selectedCoin
        const payCoinNum = sessionStorage.getItem('payCoinNum')
        let item = payCoinList.map((cur, index, arr) => {
            return <li key={index.toString()} className={cur.selected === 1 ? "warn-border fl" : "fl"}
                       onClick={this.clkFunc.bind(this, index, img + cur.icoUrl, cur.currencyName + '/' + cur.currencyNameEn)}>
                <span className={cur.selected === 1 ? "warn-square" : ""}></span>
                <img src={img + cur.icoUrl}/>
                <span>{cur.currencyName}/{cur.currencyNameEn}</span>
            </li>
        })
        return (
            <div className="SecurityCenterPay fr">
                <div className="SecurityCenterPay-warp">
                    <TopTitle title="充币"/>
                    <div className="PaySelect">
                        <div className="withdraw-icon-show clearfix">
                            <span className="fl">当前选中项：</span>
                            <div className="fl">
                                <img src={img + icoUrl}/><span className="warn">{text}</span>
                            </div>
                        </div>
                        <div className="pay-coin-more-wrap clearfix" ref="more">
                            <ul className="clearfix fl" ref="lists">
                                {item}
                            </ul>
                            <button className="fr withdraw-button-box" onClick={this.moreFunc.bind(this)}>
                                <span>更多</span><Icon type={this.state.more ? "down" : "up"}/>
                            </button>
                        </div>
                    </div>
                    <SecurityCenterPayBTC {...this.props} currencyId={currencyId} currencyNameEn={text.split("/")[1]}/>
                    <div
                        className={isAuth == 0 || isValidatePass == 0 || !payCoinNum ? "show SecurityCenterPay-alert" : "hide SecurityCenterPay-alert"}>
                        <div
                            className={this.state.closeAlert ? "SecurityCenterPay-alert-box PayCoin" : "hide SecurityCenterPay-alert-box PayCoin"}>
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
                                    : <Link to='/personal/paycoin' style={{margin: "0"}} onClick={this.closePayCoin.bind(this)}
                                            className="warn show text-center">我已了解</Link>}
                            </div>}
                        </div>
                    </div>
                </div>
                <SecurityCenterPayBTCTable nextModules={this.nextModules.bind(this)} current={this.state.current} curCoinNum={this.state.curCoinNum} currencyId={currencyId}  {...this.props}/>
            </div>
        )
    }
}
export default connect(state => {
    return {
        ...state.Pay,
        PayCoin: state.PayCoin,
        ...state.WithDraw.userInfo
    }
})(SecurityCenterPay)