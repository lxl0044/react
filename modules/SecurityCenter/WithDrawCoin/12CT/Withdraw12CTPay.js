import React from 'react';
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'
import Withdraw12CTAlert from "./Withdraw12CTAlert"
import Withdraw12CTInfo from './Withdraw12CTInfo'
import { submitWithDrawOrder, deldeteCoinAddress } from '../../../Redux/Action/WithDrawAction'
var md5 = require('../../../../tools/MD5.js')
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";
const base = 'data:image/png;base64,'
const data = [{
    id: 1,
    note: "12ct",
    address: "1FqYa2E1pozSY9QBvgQCVn8qQWxrS8trVX"
}, {
    id: 2,
    note: "12ct",
    address: "2FqYa2E1pozSY9QBvgQCVn8qQWxrS8tr11"
}, {
    id: 3,
    note: "12ct",
    address: "3FqYa2E1pozSY9QBvgQCVn8qQWxrS8tr12"
}]
let clkCount = 0;//记录点击次数
let timer = null;
export default class Withdraw12CTPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: true,//点击删除的添加的地址
            address: true,//控制地址的弹窗
            number:'',//默认地址
            captcha: '',
            codeUUID: '',
            money: '', // 提币数量
            validMoney: true, // 提币数量是否合法
            alertMsg:''//输入可提现金额离焦的时候
        }
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
        let info = {
            currencyId: 2,
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
        if(!dealPwd) return message.error('请输入交易密码')
        if(!phoneCode) return message.error('请输入手机验证码')
        //获取节点，成功的时候清空输入框
        let moneyCT = this.refs.number
        let dealPassword = this.refs.dealPwd
        let yzCode = this.refs.yzCode
        let phoneM = this.refs.phoneCode
        //点击按钮变灰色
        let getWithdrawCT = this.refs.getWithdrawCT
        getWithdrawCT.setAttribute('disabled', 'disabled')
        getWithdrawCT.style.backgroundColor = '#ccc';
        getWithdrawCT.style.border = "1px solid #ccc"
        const { dispatch,money } = this.props
        let info = {
            address: address, // 币地址
            amount: moneyNumber, // 数量
            currencyId: 2, // 币种
            fdPwd:dealPwd,//交易密码
            actionId: 4, // 用户行为
            phoneCode: phoneCode
        }
        this.setState({
            money:money,
            alertMsg:''
        })
        dispatch(submitWithDrawOrder(dispatch, info,moneyCT,dealPassword,yzCode,phoneM,getWithdrawCT))
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
    // componentDidMount() {
    //     this.getCaptcha()
    // }
    componentDidMount() {
        let first
        if(this.props.coinInfo.resp.addressList.length === 0) {
            first = ''
        } else {
            first = this.props.coinInfo.resp.addressList[0].address
        }
        this.getCaptcha()
        this.setState({
            number: first
        })
    }
    render() {
        const {addressList,cashAmount,fee,point} = this.props.coinInfo.resp
        const {alert} = this.props
        let item = addressList.map((cur, index) => {
            return <div className="withdraw-add-address-box-mian clearfix" style={{display: cur.display}}
                        key={index.toString()}>
                <p className="fl text-center " onClick={this.closeFunc.bind(this, index)}
                   title={cur.note}>{cur.note}</p>
                <p className="fl text-center " onClick={this.closeFunc.bind(this, index)}>{cur.address}</p>
                <p className="fr text-center warn" onClick={this.delFunc.bind(this, cur.id)}>删除</p>
            </div>
        })
        return (
            <div>
                <div className="Withdraw12CTPay">
                    <div className="withdraw-number">
                        <span className="withdraw-text">可提币数量：</span><span
                        className="warn withdraw-text">{cashAmount}</span><span className="withdraw-little">（12CT）</span>
                    </div>
                    <div className="withdraw-address clearfix">
                        <span className="withdraw-text fl">提币地址：</span>
                        <div className="fl withdraw-address-box">
                            <input placeholder="请选择提现地址" type="text" value={ this.state.number } disabled/>
                            <button onClick={this.changeAddressFunc.bind(this)}>{!this.state.number ? "添加地址" : "更换地址"}</button>
                        </div>
                    </div>
                    <div className={this.state.address ? "hide withdraw-add-address" : "show withdraw-add-address"}>
                        <div className="withdraw-add-address-box">
                            {item}
                        </div>
                        <div className="withdraw-add-address-box-button">
                            <button className="warn" onClick={this.addAddress.bind(this)}>添加地址</button>
                        </div>
                    </div>
                    <div className="withdraw-num">
                        <span className="withdraw-text">提币数量：</span>
                        <input ref="number" placeholder="请输入提现数量"
                               className="withdraw-input" type="number" min="0"
                               onChange={this.inputHandler} onBlur={this.checkWithdraw}
                        />
                        <span className="ml20">小数点后最多<span className="warn">{point}</span>位</span>
                        <p className="warn">{this.state.alertMsg}</p>
                    </div>
                    <div className="withdraw-fee">
                        <span className="withdraw-text">提币手续费：</span>
                        <input className="withdraw-input withdraw-input-fee" type="text"
                               placeholder="请输入手续费" value={parseFloat(this.state.money * fee).toFixed(point)} disabled="disabled"/>
                        <span className="ml20">手续费为{ fee * 100 }%</span>
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
                        <button className="warn" ref="getWithdrawCT"  onClick={this.submitFunc.bind(this)}>提交提币订单</button>
                    </div>
                    {alert ? "" :
                        <Withdraw12CTAlert {...this.props}/>}
                </div>
                <Withdraw12CTInfo { ...this.props.coinInfo.detail }/>
            </div>
        )
    }
}