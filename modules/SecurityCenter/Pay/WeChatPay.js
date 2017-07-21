import React from 'react';
import { payForWeiChat } from '../../Redux/Action/PayAction'
import { Icon,message } from 'antd';
import WeChatPayForCode from './WeChatPayForCode'

export default class WeChatPay extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                change:true,// 控制更改手机号
            }
        }
        //改变手机号
        changeFunc () {
            this.setState({
                change:false
            })
        }
        // 点击取消的时候
        cancelFunc (e) {
            //阻止冒泡
            e.stopPropagation();
            this.setState({
                change:true
            })
        }
        //完成手机号的时候
        clkFunc = (e) => {
            //阻止冒泡
            e.stopPropagation();
            let phone = this.refs.phone.value.trim()
            let reg = /^1[3|4|5|7|8]\d{9}$/
            if (!phone) return message.error("请填写手机号")
            if (reg.test(phone)) {
                this.setState({
                    change:true,
                    phone:phone
                })
            } else {
                return message.error("手机号填写错误")
            }
        }
        // 点击微信充值
        weChatPayCode () {
            const { amountHighLimit, amountLowLimit } = this.props.authConfig.authConfig
            let money = this.refs.money
            let point = this.refs.point.innerHTML
            let reg = /^[0-9]*$/ 
            let sum = money.value.trim() + "." + point
            if (!money.value.trim()) return message.error("请输入充值金额")
            if (!reg.test(money.value.trim())) return message.error("输入内容错误")
            if (sum < amountLowLimit) return message.error("充值金额最少" + amountLowLimit)
            if (sum > amountHighLimit) return message.error("充值金额最大不超过" + amountHighLimit)


            let payButton = this.refs.payButton
            payButton.setAttribute('disabled', 'disabled')
            payButton.style.backgroundColor = '#ccc';
            payButton.style.border = "1px solid #ccc"
            const { dispatch } = this.props
            dispatch(payForWeiChat(dispatch, sum, money,payButton))
        }

    render() {
        const { uname, name } = this.props.userInfo
        const { show } = this.props.payWeiChat
        const { random } = this.props.authConfig

        return (
            <div className="weChatPay">
                <div className={show ? "show weChatPayNum" : "hide weChatPayNum"}>
                    <span><Icon type="file-text" /></span>
                    <span>填写金额并完成充值订单</span>
                    <span><Icon type="pay-circle-o" /></span>
                    <span>用微信扫码支付</span>
                    <span><Icon type="clock-circle-o" /></span>
                    <span>支付成功后，10分钟内到账</span>
                </div>
                <div className={show ? "show weChatPayMain" : "hide weChatPayMain"}>
                    <div className="weChatPayCenter">
                        <div className="weChatPayInput">
                            <span>请输入充值金额：</span><input ref="money" type="text"/><span>.</span><span ref="point">{random < 10 ? "0" + random : random}</span>
                        </div>
                        <div className="checkInfo">
                            <span>请核对您的信息</span>
                        </div>
                        <div className="weChatPayNickName">
                            <span>用户昵称：</span>
                            <span>{uname}</span>
                        </div>
                        <div className="weChatPayName">
                            <span>姓名：</span>
                            <span>{name}</span>
                        </div>
                        {/*<div className="weChatPayResPhone">
                            <span>手机号：</span>
                            <span className={this.state.change ? "show inlineBlock" : "hide"}>{this.props.phone}</span>
                            <input type="text" ref="phone" placeholder="请填写手机号码" maxLength="11" className={this.state.change ? "hide" : "show inlineBlock"}/>
                            <span onClick={this.changeFunc.bind(this)}>
                                {this.state.change ? "修改" : <span><span onClick={this.clkFunc.bind(this)}>完成</span><span onClick={this.cancelFunc.bind(this)}>取消</span></span>}
                            </span>
                        </div>*/}
                        <div className="weChatPayButton">
                            <button ref="payButton" onClick={this.weChatPayCode.bind(this)}>充值</button>
                        </div>
                    </div>
                </div>
                {show ?  " " : <WeChatPayForCode { ...this.props }/>}
            </div>
        )
    }
}