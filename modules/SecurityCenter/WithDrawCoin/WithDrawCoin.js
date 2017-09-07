import React from 'react';
import {Icon,message} from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {requestUserInfoInWithDraw, queryCoinInfo,WithDrawCTRecordTable,submitWithDrawOrder, deldeteCoinAddress} from '../../Redux/Action/WithDrawAction'
import TopTitle from '../../Common/TopTitle';
import './../WithDraw/css/withdraw12ct.css'
import Withdraw12CTTable from './12CT/Withdraw12CTTable'
import CTwithdraw from '../../../images/12ct-withdraw.png'
import { WithDrawCoinList,WithDrawDOM } from '../../Redux/Action/WithDrawCoinAction'
import { img } from './../../host'
import { addClass, removeClass,getBeforeDate } from '../../../tools/utils'
import Withdraw12CTAlert from "./12CT/Withdraw12CTAlert"
import Withdraw12CTInfo from './12CT/Withdraw12CTInfo'
import axios from 'axios'
import qs from 'qs'
import { formatNumber } from '../../../tools/utils'
var md5 = require('../../../tools/MD5.js')
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";
const base = 'data:image/png;base64,'
let clkCount = 0;//点击更多次数
let lists = null;//保存点击的li列表
let timer = null;

class SecurityCenterWithdraw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            more: true,//控制更多的icon
            closeAlert:true,//控制温馨提示弹窗的
            currencyNameEn:"12CT",//默认名称
            display: true,//点击删除的添加的地址
            address: true,//控制地址的弹窗
            number:'',//默认地址
            captcha: '',
            codeUUID: '',
            money: '', // 提币数量
            validMoney: true, // 提币数量是否合法
            alertMsg:'',//输入可提现金额离焦的时候
            current:1//页数
        }
    }
    // 当充值的币种发生改变的时候
    onChangeValue(e) {
        this.setState({
            value: e.target.value
        })
    }
    //点击更换内容
    clkFunc (id,img,cont) {
        lists = this.refs.lists
        const { withDrawCoinList } = this.props
        //获取节点，成功的时候清空输入框
        let moneyCT = this.refs.number
        let more = this.refs.more
        let dealPassword = this.refs.dealPwd
        let yzCode = this.refs.yzCode
        let phoneM = this.refs.phoneCode
        //点击获取验证码的按钮
        let btn = this.refs.sendBtn
        withDrawCoinList.map((cur,index) => {
            if(index == id){
                this.setState({
                    currencyNameEn:cur.currencyNameEn
                })
                addClass(lists.children[id], 'warn-border')
                addClass(lists.children[id].children[0], 'warn-square')
            } else{
                removeClass(lists.children[index], 'warn-border')
                removeClass(lists.children[index].children[0], 'warn-square')
            }
        })
        //判断点击的是哪一个币种，根据下标来判断的
        const { dispatch } = this.props
        const { currencyId } = this.props.withDrawCoinList[id]
        //清楚定时器
        clearInterval(timer)
        btn.style.color = '#0397f7'
        btn.removeAttribute('disabled', 'disabled')
        btn.innerText = "获取验证码"
        this.setState({
            address: true,
            money:0,
            alertMsg:'',
            number:''
        })
        clkCount = 0
        //table请求数据
        let info = {
            status: 1,//1未完成2完成
            start: 1,
            size: 10,
            currentyId:currencyId,
            beginTime: getBeforeDate(1),
            endTime: getBeforeDate()
        }
        let msg = {
            currencyId: currencyId
        }
        this.getCaptcha()
        dispatch({type: 'CHANGE_CURRENCYID_IN_PROPERTY', currencyId: currencyId})
        dispatch(WithDrawCoinList(dispatch,currencyId))
        dispatch(queryCoinInfo(dispatch,msg))
        dispatch(WithDrawCTRecordTable(dispatch, info))
        dispatch(WithDrawDOM(dispatch,moneyCT,dealPassword,yzCode,phoneM))
        this.setState({
            value:id,
            img:img,
            text:cont,
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
            more.style.height = "648px"
            this.setState({
                more: false
            })
        } else if (clkCount == 2) {
            more.style.height = "86px"
            this.setState({
                more: true
            })
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
        sessionStorage.setItem('withDrawCoin', "1")
    }
    //一开始拿到信息列表
    componentDidMount() {
        const {dispatch} = this.props
        const { currencyId } = this.props


        let info = {
            currencyId: currencyId
        }
        let msg = {
            status: 1,//1未完成2完成
            start: 1,
            size: 10,
            currentyId:currencyId,
            beginTime: getBeforeDate(1),
            endTime: getBeforeDate()
        }
        dispatch(WithDrawCTRecordTable(dispatch, msg))
        dispatch(requestUserInfoInWithDraw())
        dispatch(queryCoinInfo(dispatch,info))
        dispatch(WithDrawCoinList(dispatch, currencyId))
        this.getCaptcha()
    }
    // 点击地址信息那一行的时候关闭弹窗
    closeFunc(index) {
        const { addressList } = this.props.coinInfo.resp
        if(addressList[index]) {
            this.setState({
                number: addressList[index].address,
                address: true
            })
        }
        // 再重新复值点击次数
        clkCount = 0;
    }
    // 当我点击删除的时候
    delFunc(id) {
        const { dispatch } = this.props
        const { currencyId } = this.props

        let info = {
            currencyId: currencyId,
            walletAddressId: id
        }
        dispatch(deldeteCoinAddress(dispatch, info))
    }
    // 点击更换银行卡的时候,第一次点击出现，第二次消失
    changeAddressFunc() {
        clkCount++;
        if (clkCount == 1) {
            this.setState({
                address: false
            })
        } else if (clkCount == 2) {
            this.setState({
                address: true
            })
            clkCount = 0;
        } else {
            // 根本走不到这里
            clkCount = 0;
        }
    }
    //点击添加地址
    addAddress() {
        const {dispatch} = this.props
        dispatch({type: 'OPEN_ADD_ADDRESS'})
        document.body.style.overflow = 'hidden'
    }
    // 获取验证码
    getCaptcha() {
        axios.post('user/getimg')
            .then(function (res) {
                this.setState({
                    captcha: base + res.data.attachment.IMGCode,
                    codeUUID: res.data.attachment.codeUUID
                })
            }.bind(this))
    }
    //点击提交订单
    submitFunc() {
        let uid = localStorage.getItem("uid")
        const { address } = this.props.coinInfo.resp.addressList[0]
        let moneyNumber = this.refs.number.value.trim()
        let dealPwd = md5(this.refs.dealPwd.value.trim() + dealSalt + uid)
        let phoneCode = this.refs.phoneCode.value.trim()
        if(!address) return message.error('请选择您的提币地址')
        if(!moneyNumber) return message.error('请输入提币数量')
        if(!this.state.validMoney) message.error('提币数量不合法')
        if(!this.refs.dealPwd.value.trim()) return message.error('请输入交易密码')
        if(!phoneCode) return message.error('请输入短信验证码')
        //获取节点，成功的时候清空输入框
        let moneyCT = this.refs.number
        let dealPassword = this.refs.dealPwd
        let yzCode = this.refs.yzCode
        let phoneM = this.refs.phoneCode
        //点击按钮变灰色
        let getWithdrawCT = this.refs.getWithdrawCT
        getWithdrawCT.setAttribute('disabled', 'disabled')
        getWithdrawCT.style.backgroundColor = '#c61014';
        getWithdrawCT.style.border = "1px solid #c61014"
        const { dispatch,money } = this.props
        let info = {
            address: !this.state.number ? address : this.state.number, // 币地址
            amount: moneyNumber, // 数量
            currencyId: this.props.currencyId, // 币种
            fdPwd:dealPwd,//交易密码
            actionId: 4, // 用户行为
            phoneCode: phoneCode,
        }
        this.setState({
            money:money,
            alertMsg:''
        })
        dispatch(submitWithDrawOrder(dispatch, info,moneyCT,dealPassword,yzCode,phoneM,getWithdrawCT,this.props.currencyId))
    }
    // 输入金额，动态改变手续费
    inputHandler = (e) => {
        this.setState({
            money: e.target.value
        })
    }
    // 提现数量失去blur事件
    checkWithdraw = () => {
        const { amountLowLimit,amountHighLimit } = this.props.coinInfo.detail
        const { point } = this.props.coinInfo.resp
        let moneyNumber = this.refs.number
        let moneyNumberPoint = this.refs.number.value.trim()
        const { cashAmount } = this.props.coinInfo.resp // 可提币数量
        //处理提币输入的小数点后几位的限制
        let moneyNumberPointLength =  moneyNumberPoint.split(".")
        if (!moneyNumberPointLength[1]) {
        } else {
            if (moneyNumberPointLength[1].length > point) {
                this.setState({
                    validMoney: false,
                    money:0,
                    alertMsg:"小数点后最多" + point + "位"
                })
            } else{
                this.setState({
                    alertMsg:""
                })
            }
        }
        if(moneyNumberPoint > cashAmount) {
            this.setState({
                validMoney: false,
                money:0,
                alertMsg:"超出可提币数量"
            })
            moneyNumber.value = ''
        } else if(moneyNumberPoint < amountLowLimit) {
            this.setState({
                validMoney: false,
                money:0,
                alertMsg:"不能小于最小提币数量"
            })
            moneyNumber.value = ''
        } else if(moneyNumberPoint > amountHighLimit) {
            this.setState({
                validMoney: false,
                money:0,
                alertMsg:"不能大于最大提币数量"
            })
            moneyNumber.value = ''
        } else{
            this.setState({
                validMoney: true,
                alertMsg:""
            })
        }
    }
    // 发送短信验证码
    sendFunc = () => {
        let codeUUID = this.state.codeUUID
        let number = this.refs.number.value.trim()
        let yzCode = this.refs.yzCode.value.trim()
        let dealPwd = this.refs.dealPwd.value.trim()
        let btn = this.refs.sendBtn
        let time = 60
        if(!number) return message.error('请输入提币数量')
        if(!this.state.validMoney) message.error('提币数量不合法')
        if(!dealPwd) return message.error('请输入交易密码')
        if(!yzCode) return message.error('请输入图片验证码')
        axios.post('/coin/sendSms', qs.stringify({
            vercode: yzCode,
            codeid: codeUUID
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    btn.setAttribute('disabled', 'disabled')
                    btn.style.color = '#ccc';
                    timer = setInterval(function () {
                        time--
                        if (time < 0) {
                            clearInterval(timer)
                            btn.removeAttribute('disabled', 'disabled')
                            btn.style.color = '#0397f7'
                            btn.innerText = "获取验证码"
                        } else {
                            btn.innerText = "重新发送（" + time + "s）"
                        }
                    }, 1000)
                }
                if (res.data.status === 412) {
                    btn.style.color = '#0397f7'
                    clearInterval(timer)
                    btn.removeAttribute('disabled', 'disabled')
                    btn.innerText = "获取验证码"
                    message.error("图片验证码错误")
                }
            }.bind(this))
    }
    //接收子组件传过来的页数
    nextModules (page) {
        this.setState({
            current:page
        })
    }
    //在组件卸载的时候清除定时器
    componentWillUnmount() {
        //清除倒计时定时器
        clearInterval(timer)
    }
    render() {
        const { currencyId } = this.props
        const { isAuth,isValidatePass } = this.props.userInfo
        const { withDrawCoinList } = this.props
        const {addressList,cashAmount,fee,point} = this.props.coinInfo.resp
        const {address} = this.props.coinInfo.resp.defaultAddress
        const {alert} = this.props
        const { text, icoUrl } = this.props.selectedCoin
        const withDrawCoin = sessionStorage.getItem('withDrawCoin')


        let item1 = addressList.map((cur, index) => {
            return <div className="withdraw-add-address-box-mian clearfix" style={{display: cur.display}}
                        key={index.toString()}>
                <p className="fl text-center " onClick={this.closeFunc.bind(this, index)}
                   title={cur.note}>{cur.note}</p>
                <p className="fl text-center " onClick={this.closeFunc.bind(this, index)}>{cur.address}</p>
                <p className="fr text-center warn" onClick={this.delFunc.bind(this, cur.id)}>删除</p>
            </div>
        })
        let item = withDrawCoinList.map((cur,index,arr) => {
            return  <li key={index.toString()} className={cur.selected === 1 ? "warn-border fl" : "fl"} onClick={this.clkFunc.bind(this,index,img + cur.icoUrl,cur.currencyName + '/' + cur.currencyNameEn )}>
                <span className={cur.selected === 1 ? "warn-square" : ""}></span>
                <img src={img + cur.icoUrl}/>
                <span>{cur.currencyName}/{cur.currencyNameEn}</span>
            </li>
        })
        return (
            <div className="SecurityCenterWithdraw fr">
                <div className="SecurityCenterWithdraw-warp">
                    <TopTitle title="提币"/>
                    <div className="withdraw">
                        <div className="withdraw-icon-show clearfix">
                            <span className="fl">当前选中项：</span>
                            <div className="fl">
                                <img src={img + icoUrl}/><span className="warn">{text}</span>
                            </div>
                        </div>
                        <div className="clearfix withdraw-coin-more-wrap" ref="more">
                            <ul className="clearfix fl" ref="lists">
                                {item}
                            </ul>
                            <button className="fr withdraw-button-box" onClick={this.moreFunc.bind(this)}>
                                <span>更多</span><Icon type={this.state.more ? "down" : "up"}/>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="Withdraw12CTPay">
                            <div className="withdraw-number">
                                <span className="withdraw-text">可提币数量：</span><span
                                className="warn withdraw-text">{cashAmount}</span><span className="withdraw-little">({text.split("/")[1]})</span>
                            </div>
                            <div className="withdraw-address clearfix">
                                <span className="withdraw-text fl">提币地址：</span>
                                <div className="fl withdraw-address-box">
                                    <input placeholder="请选择提现地址" type="text" value={ !this.state.number ? address : this.state.number } disabled/>
                                    <button onClick={this.changeAddressFunc.bind(this)}>{!address ? "添加地址" : "更换地址"}</button>
                                </div>
                            </div>
                            <div className={this.state.address ? "hide withdraw-add-address" : "show withdraw-add-address"}>
                                <div className="withdraw-add-address-box">
                                    {item1}
                                </div>
                                <div className="withdraw-add-address-box-button">
                                    <button onClick={this.addAddress.bind(this)}>添加地址</button>
                                </div>
                            </div>
                            <div className="withdraw-num">
                                <span className="withdraw-text">提币数量：</span>
                                <input ref="number" placeholder="请输入提现数量"
                                       className="withdraw-input" type="number" min="0"
                                       onChange={this.inputHandler} onBlur={this.checkWithdraw}
                                />
                                {currencyId === 5 ? <span className="ml20">请输入整数</span> : <span className="ml20">小数点后最多<span className="warn">{point}</span>位</span> }
                                <p className="warn">{this.state.alertMsg}</p>
                            </div>
                            <div className="withdraw-fee">
                                <span className="withdraw-text">提币手续费：</span>
                                <input className="withdraw-input withdraw-input-fee" type="text"
                                       placeholder="请输入手续费" value={currencyId === 5 ? Math.ceil(this.state.money * fee) : parseFloat(this.state.money * fee).toFixed(point)} disabled="disabled"/>
                                <span className="ml20"><span>手续费为{ formatNumber(fee * 100,2) }%</span><span className="warn">{currencyId === 5 ? "（小数部分视为1.0收取）" : ""}</span></span>
                            </div>
                            <div className="withdraw-pwd">
                                <span className="withdraw-text">交易密码：</span>
                                <input ref="dealPwd" placeholder="请输入交易密码" className="withdraw-input" type="password"/>
                            </div>
                            <div className="withdraw-yzCode clearfix">
                                <span className="withdraw-text fl">图片验证码：</span>
                                <input ref="yzCode" placeholder="请输入图片验证码" className="withdraw-input fl" type="text"/>
                                <div className="withdraw-yzCode-box fl">
                                    <img src={this.state.captcha} onClick={this.getCaptcha.bind(this)} alt=""/>
                                </div>
                            </div>
                            <div className="withdraw-phoneCode">
                                <span className="withdraw-text">短信验证码：</span>
                                <input ref="phoneCode" placeholder="请输入短信验证码" className="withdraw-input" type="text"/>
                                <button ref="sendBtn" onClick={this.sendFunc.bind(this)}>获取验证码</button>
                            </div>
                            <div className="withdraw-button">
                                <button ref="getWithdrawCT"  onClick={this.submitFunc.bind(this)}>提交提币订单</button>
                            </div>
                            {alert ? "" :
                                <Withdraw12CTAlert currencyId={this.state.currencyId} {...this.props}/>}
                        </div>
                        <Withdraw12CTInfo { ...this.props.coinInfo.detail }/>
                    </div>
                    <div
                        className={isAuth == 0 || isValidatePass == 0 || !withDrawCoin ? "show SecurityCenterPay-alert" : "hide SecurityCenterPay-alert"}>
                        <div
                            className={this.state.closeAlert ? "SecurityCenterPay-alert-box WithDrawCoin" : "hide SecurityCenterPay-alert-box WithDrawCoin"}>
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
                                    : <Link to='/personal/withdrawcoin' style={{margin: "0"}} onClick={this.closePayCoin.bind(this)}
                                            className="warn show text-center">我已了解</Link>}
                            </div>}
                        </div>
                    </div>
                </div>
                <Withdraw12CTTable nextModules={this.nextModules.bind(this)} current={this.state.current} { ...this.props }/>
            </div>
        )
    }
}
export default connect(state => {
    return {
        ...state.WithDraw,
        ...state.WithDrawCoin,
        ...state.PayCoin
    }
})(SecurityCenterWithdraw)