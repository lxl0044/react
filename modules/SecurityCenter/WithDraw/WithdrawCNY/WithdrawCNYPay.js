import React from 'react';
import axios from 'axios'
import qs from 'qs'
import { message,Icon } from 'antd';
import WithdrawCNYAlert from "./WithdrawCNYAlert"
import WithdrawCNYInfo from './WithdrawCNYInfo'
import { submitWithDrawOrderCNY,getWithDrawCNYBalance } from '../../../Redux/Action/WithDrawAction'
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";
const base = 'data:image/png;base64,'
var md5 = require('../../../../tools/MD5.js')
let clkCount = 0;//记录点击次数
let money = null//记录input输入金额
let timer = null//创建定时器
export default class WithdrawCNYPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],//建立数组
            display:true,//点击删除的添加的卡号
            address:true,//控制地址的弹窗
            number:"",//显示提现的卡号的
            captcha: '',
            codeUUID: '',
            alert:true,//显示弹框添加弹框
            sum:0,//实际到账 = 输入金额 - （输入金额*手续费）
            cardList:[],//添加之后银行卡列表
            isIconShow:'',//保存银行卡列表的长度
            cardId:"",//保存银行卡对应的cardId，点击获取收款账号的时候发送给后台
            fee:"",//手续费
            amountLowLimit:"",//最低充值钱
            amountHighLimit:"",//最高充值钱
            alertMsg:''//输入可提现金额离焦的时候
        }
    }
    // 点击地址信息那一行的时候关闭弹窗
    closeFunc (id) {
        let getList = this.state.cardList;
        getList.map((cur,index,arr)=>{
            if ( cur.cardId && cur.cardId == id) {
                this.setState({
                    number:cur.bankCardNo,
                    cardId:cur.cardId
                })
            }
        })
        this.setState({
            address:true
        })
        // 再重新复值点击次数
        clkCount = 0;
    }
    // 当我点击删除的时候
    delFunc (id) {
        let getList = this.state.cardList;
        getList.map((cur,index,arr)=>{
            if ( cur.cardId && cur.cardId == id) {
                cur.display = "none"
            }
        })
        //删除银行卡列表
        axios.delete('/cardDel/'+id)
            .then(function (res) {
                //如果状态等于200，重新渲染列表
                if (res.data.status == 200 ) {
                    //获取银行卡列表
                    axios.post('/cardList')
                        .then(function (res) {
                            if (res.data.status == 200) {
                                this.setState({
                                    cardList:res.data.attachment,
                                    isIconShow:res.data.attachment.length,
                                })
                            }
                            //判断银行卡列表的条数，判断图标的显示
                            if (res.data.attachment.length == 0) {
                                this.setState({
                                    number:'',
                                    cardId:''
                                })
                            } else {
                                this.setState({
                                    number:res.data.attachment[0].bankCardNo,
                                    cardId:res.data.attachment[0].cardId
                                })
                            }
                        }.bind(this))
                }
            }.bind(this))
        this.setState({
            data:getList
        })
    }
    // 点击更换银行卡的时候,第一次点击出现，第二次消失
    changeAddressFunc () {
        clkCount ++;
        if (clkCount == 1) {
            this.setState({
                address:false
            })
        } else if (clkCount == 2) {
            this.setState({
                address:true
            })
            clkCount = 0;
        }else{
            // 根本走不到这里
            clkCount = 0;
        }
    }
    //点击地址
    addAddress () {
        this.setState({
            alert:false
        })
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
    //接收子组件传来的值
    sendChild (state) {
        this.setState({
            alert:state
        })
        document.body.style.overflow = 'auto'
    }
    //点击提交提现订单
    submitFunc () {
        let uid = localStorage.getItem("uid")
        let withMoney = this.refs.withMoney.innerHTML
        let money = this.refs.money.value.trim()
        let cardId = this.state.cardId
        let dealPassword = this.refs.dealPwd.value.trim()
        let dealPwd = md5(this.refs.dealPwd.value.trim() + dealSalt + uid)
        let phoneCode = this.refs.phoneCode.value.trim()
        //获取节点，成功的时候清空输入框
        let resMoney = this.refs.money
        let resDealPwd = this.refs.dealPwd
        let resYzCode = this.refs.yzCode
        let resPhoneCode = this.refs.phoneCode
        if (withMoney == 0) return message.error("您还没有金额可提现")
        if (!cardId) return message.error("请选择银行卡")
        if (!money) return message.error("请输入提现金额")
        if (!dealPassword) return message.error("请输入交易密码")
        if (!phoneCode) return message.error("请输入短信验证码")
        //点击按钮变灰色
        let getWithdraw = this.refs.getWithdraw
        getWithdraw.setAttribute('disabled', 'disabled')
        getWithdraw.style.backgroundColor = '#ccc';
        getWithdraw.style.border = "1px solid #ccc"
        const { dispatch,sum} = this.props
        let info = {
            amount:money,
            cardId:cardId,
            actionId:2,
            currencyId:1,
            tradePassword:dealPwd,
            smsMessage:phoneCode
        }
        this.setState({
            sum:sum,
            alertMsg:''
        })
        dispatch(submitWithDrawOrderCNY(dispatch, info,resMoney,resDealPwd,resYzCode,resPhoneCode,getWithdraw))
    }
    componentWillMount() {
        //获取可提现金额
        const { dispatch } = this.props
        dispatch(getWithDrawCNYBalance())
        //获取手续费
        axios.post('/authConfig',qs.stringify({
            actionId:2,
            currencyId:1
        }))
            .then(function (res) {
                if (res.data.status == 200) {
                    this.setState({
                        fee:res.data.attachment.fee,
                        amountHighLimit:res.data.attachment.amountHighLimit,
                        amountLowLimit:res.data.attachment.amountLowLimit
                    })
                }
            }.bind(this))
    }
    componentDidMount() {
        this.getCaptcha()
        //获取银行卡列表
        axios.post('/cardList')
            .then(function (res) {
                if (res.data.status == 200) {
                    //获取银行卡列表的展示
                    this.setState({
                        cardList:res.data.attachment,
                        isIconShow:res.data.attachment.length
                    })
                    //判断银行卡列表的条数，判断图标的显示
                    if (res.data.attachment.length == 0) {
                        this.setState({
                            number:'',
                            cardId:''
                        })
                    } else {
                        this.setState({
                            number:res.data.attachment[0].bankCardNo,
                            cardId:res.data.attachment[0].cardId
                        })
                    }
                }
            }.bind(this))
        //获取地址列表
        this.setState({
            address:true
        })
    }
    //每次输入的金额改变的时候，计算总数
    numFunc (e) {
        money = e.target.value
        let poundage = this.refs.poundage.innerHTML
        let sum = money - (poundage * money * 0.01)
        this.setState({
            sum:sum.toFixed(2)
        })
    }
    //输入金额离焦的时候判断最大和最小输出金额
    moneyBlurFunc () {
        let withMoney = this.refs.withMoney.innerHTML
        let amountHighLimit = this.state.amountHighLimit//最大输入金额
        let amountLowLimit = this.state.amountLowLimit//最小输入金额
        let poundage = this.refs.poundage.innerHTML//手续费
        let resMoney = this.refs.money//输入的钱
        let resMoneyNum = this.refs.money.value.trim()
        if (parseFloat(resMoneyNum) > parseFloat(withMoney)) {
            //充值实际到账
            this.setState({
                sum:0,
                alertMsg:"超出可提现金额"
            })
            resMoney.value = ""
            return
        } else{
            this.setState({
                alertMsg:""
            })
        }
        if (resMoneyNum > amountHighLimit) {
            //充值实际到账
            this.setState({
                sum:0,
                alertMsg:"最大金额不能超过" + amountHighLimit
            })
            resMoney.value = ""
            return
        }else{
            this.setState({
                alertMsg:""
            })
        }
        if (!/^\d+$/.test(resMoneyNum)) {
            resMoney.value = ""
            this.setState({
                sum:0,
                alertMsg:"请输入正确的提现金额"
            })
            return
        }else{
            this.setState({
                alertMsg:""
            })
        }
        if (resMoneyNum < amountLowLimit) {
            //充值实际到账
            this.setState({
                sum:0,
                alertMsg:"最小金额不能少于" + amountLowLimit
            })
            resMoney.value = ""
            return
        }else{
            this.setState({
                alertMsg:""
            })
        }
    }
    //发送验证码
    sendFunc () {
        let cardId = this.state.cardId
        let money = this.refs.money.value.trim()
        let withMoney = this.refs.withMoney.innerHTML
        let dealPwd = this.refs.dealPwd.value.trim()
        let yzCode = this.refs.yzCode.value.trim()
        let btn = this.refs.sendBtn
        let time = 60
        let amountHighLimit = this.state.amountHighLimit
        let amountLowLimit = this.state.amountLowLimit
        let blurMoney = money
        if (withMoney == 0) return message.error("您还没有金额可提现")
        if (!cardId) return message.error("请选择银行卡")
        if (!money) return message.error("请输入提现金额")
        if (!dealPwd) return message.error("请输入交易密码")
        if (!yzCode) return message.error("请输入图片验密码")
        if (blurMoney > amountHighLimit) {
            message.error("最大金额不能超过" + amountHighLimit)
            return
        }
        if (blurMoney < amountLowLimit) {
            message.error("最小金额不能少于" + amountLowLimit)
            return
        }
        axios.post('/user/sendMsgWithUid', qs.stringify({
            vercode: yzCode,
            type:"05",
            codeid:this.state.codeUUID
        }))
            .then(function (res) {
                //根据后台请求的数据判断用户输入的值返回错误信息
                if (res.data.status == 200) {
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
                if (res.data.status == 412) {
                    btn.style.color = '#0397f7'
                    clearInterval(timer)
                    btn.removeAttribute('disabled', 'disabled')
                    btn.innerText = "获取验证码"
                    message.error("图片验证码错误")
                    return
                }
            }.bind(this))
    }
    render() {
        const { cnyBalance } = this.props
        const {name, phone} = this.props.userInfo
        let item = this.state.cardList.map((cur,index,arr) => {
            return  <div className="bankCardPayCardChangeList" style={{display:cur.display}} key={index.toString()}>
                <p className="fl text-center " onClick={this.closeFunc.bind(this,cur.cardId)}>
                    <Icon className={this.state.cardId == cur.cardId ? "green show" : "green hide"} type="check-circle" />
                    <span>{cur.bankName}</span></p>
                <p className="fl text-center " onClick={this.closeFunc.bind(this,cur.cardId)}>{cur.bankCardNo}</p>
                <p className="fr text-center warn" onClick={this.delFunc.bind(this,cur.cardId)}>删除</p>
            </div>
        })
        return (
            <div>
                <div className="WithdrawCNYPay">
                    <div className="WithdrawCNYPay-number">
                        <span className="WithdrawCNYPay-text">可提现金额：¥</span><span ref="withMoney" className="WithdrawCNYPay-big-text warn WithdrawCNYPay-text">{cnyBalance}</span>
                    </div>
                    <div className="WithdrawCNYPay-address clearfix">
                        <span className="WithdrawCNYPay-text fl">收款人银行卡号：</span>
                        <div className="fl WithdrawCNYPay-address-box">
                            <input placeholder="请选择银行卡号" ref="cardNumber" type="text" value={this.state.isIconShow == 0 ? '' : this.state.number} disabled/><button onClick={this.changeAddressFunc.bind(this)}>
                            {this.state.isIconShow == 0 ? "添加银行卡" : "更换银行卡"}</button>
                        </div>
                    </div>
                    <div className={this.state.address ? "hide WithdrawCNYPay-add-address" : "show WithdrawCNYPay-add-address"}>
                        <div className="WithdrawCNYPay-add-address-box">
                            {item}
                            {/*{this.state.isIconShow == 0 ? <Icon className="green hide" type="check-circle" /> : <Icon className="green show" type="check-circle" />}*/}
                        </div>
                        <div className="WithdrawCNYPay-add-address-box-button">
                            <button className="warn" onClick={this.addAddress.bind(this)}>添加银行卡</button>
                        </div>
                    </div>
                    <div className="WithdrawCNYPay-num">
                        <span className="WithdrawCNYPay-text">请输入提现金额：</span>
                        <input ref="money" onBlur={this.moneyBlurFunc.bind(this)} placeholder="请输入提现金额"
                               className="WithdrawCNYPay-input" min={this.state.amountLowLimit} max={this.state.amountHighLimit} onChange={this.numFunc.bind(this)} type="number"/>
                        {/*<InputNumber min={0} max={200000} defaultValue={0} onChange={this.numFunc.bind(this)} />*/}
                        <span className="WithdrawCNYPay-low-high"><span>最低提现金额</span><span className="warn">{this.state.amountLowLimit}</span><span>，最高提现金额</span><span className="warn">{this.state.amountHighLimit}</span></span>
                        <p className="warn">{this.state.alertMsg}</p>
                        <p className="WithdrawCNYPay-p-gray"><span className="WithdrawCNYPay-gray">预计到账：</span><span className="WithdrawCNYPay-gray warn">¥{this.state.sum}</span>
                            <span  className="WithdrawCNYPay-gray">(手续费</span><span className="WithdrawCNYPay-gray" ref="poundage">{this.state.fee * 100}</span><span className="WithdrawCNYPay-gray">%)</span>
                        </p>
                    </div>
                    {/*<div className="WithdrawCNYPay-fee">
                    <span className="WithdrawCNYPay-text">提现手续费：</span>
                    <input ref="formalities" placeholder="请输入提现手续费"  className="WithdrawCNYPay-input" type="text" placeholder="默认值是0"/>
                </div>*/}
                    <div className="WithdrawCNYPay-pwd">
                        <span className="WithdrawCNYPay-text">交易密码：</span>
                        <input ref="dealPwd" placeholder="请输入交易密码" className="WithdrawCNYPay-input" type="password"/>
                    </div>
                    <div className="WithdrawCNYPay-yzCode clearfix">
                        <span className="WithdrawCNYPay-text fl">图片验证码：</span>
                        <input ref="yzCode" placeholder="请输入图片验证码" className="WithdrawCNYPay-input fl" type="text"/>
                        <div className="WithdrawCNYPay-yzCode-box fl">
                            <img src={this.state.captcha} onClick={this.getCaptcha.bind(this)} alt=""/>
                        </div>
                    </div>
                    <div className="WithdrawCNYPay-phoneCode">
                        <span className="WithdrawCNYPay-text">短信验证码：</span>
                        <input ref="phoneCode" placeholder="请输入短信验证码" className="WithdrawCNYPay-input" type="text"/>
                        <span ref="sendBtn" onClick={this.sendFunc.bind(this)}>获取验证码</span>
                    </div>
                    <div className="WithdrawCNYPay-button">
                        <button className="warn" ref="getWithdraw" onClick={this.submitFunc.bind(this)}>提交提现订单</button>
                    </div>
                    {this.state.alert ? "" : <WithdrawCNYAlert name={name} uname={this.props.uname} phone={phone} show={this.state.alert} onChildAlert={this.sendChild.bind(this)}/>}
                </div>
                <WithdrawCNYInfo fee={this.state.fee}  amountLowLimit={this.state.amountLowLimit} amountHighLimit={this.state.amountHighLimit}/>
            </div>
        )
    }
}