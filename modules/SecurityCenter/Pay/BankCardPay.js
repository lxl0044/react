import React from 'react';
import {
    getBankCardLists,
    getBankTypeList,
    addBankCard,
    deleteBankCard,
    bankTransferAccounts
} from '../../Redux/Action/PayAction'
import {Icon, message} from 'antd';
import BankCardPayAlert from './BankCardPayAlert'
//保存点击次数
let clkCount = 0;
// 保存添加银行卡弹框的开户银行value
let value = '08d3ffc37f0a4518958d40f1b2bc29bf';
export default class BankCardPay extends React.Component {
    state = {
        change: true,//改变手机号
        card: true,//更换银行卡
        display: true,//控制添加银行卡的弹框
        bankCard: true,//验证添加银行卡的弹框的select的值
        cardNumber: true,//验证添加银行卡的弹框的input的值
        number: '',
        cardId: ''
    }
    // 标签页分页
    //改变手机号
    changeFunc() {
        this.setState({
            change: false
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
                change: true
            })
        } else {
            return message.error("手机号填写错误")
        }
    }

    // 点击取消的时候
    cancelFunc(e) {
        //阻止冒泡
        e.stopPropagation();
        this.setState({
            change: true
        })
    }

    //点击获取收款账号
    handleFunc() {
        const {amountHighLimit, amountLowLimit} = this.props.authConfig.authConfig
        let money = this.refs.money.value.trim()
        let point = this.refs.point.innerHTML
        let {cardId, number} = this.props.cardInfo
        let id = this.state.cardId ? this.state.cardId : cardId
        const {phone} = this.props.userInfo
        let reg = /^[0-9]*$/
        let sum = money + "." + point
        if (!money) return message.error("请输入充值金额")
        if (!reg.test(money)) return message.error("输入内容错误")
        if (sum < amountLowLimit) return message.error("充值金额最少" + amountLowLimit)
        if (sum > amountHighLimit) return message.error("充值金额最大不超过" + amountHighLimit)
        if (!number) return message.error("请绑定银行卡")
        const {dispatch} = this.props

        let payButton = this.refs.payButton
        payButton.setAttribute('disabled', 'disabled')
        payButton.style.backgroundColor = '#ccc';
        payButton.style.border = "1px solid #ccc"

        let info = {
            amount: sum,
            cardId: id,
            phone: phone
        }
        dispatch(bankTransferAccounts(dispatch, info, payButton))
        this.refs.money.value = ''
    }

    // 点击更换银行卡的时候,第一次点击出现，第二次消失
    changeCardFunc() {
        clkCount++;
        if (clkCount == 1) {
            this.setState({
                card: false
            })
        } else if (clkCount == 2) {
            this.setState({
                card: true
            })
            clkCount = 0;
        }
    }

    // 点击银行卡信息那一行的时候关闭弹窗
    closeFunc(cardNumber, cardId) {
        this.setState({
            card: true,
            cardId: cardId,
            number: cardNumber
        })
        // 再重新复值点击次数
        clkCount = 0;
    }

    // 当我点击删除的时候
    delFunc(id) {
        const {dispatch} = this.props
        dispatch(deleteBankCard(dispatch, id))
    }

    //点击添加银行卡
    addCard() {
        const {dispatch} = this.props
        dispatch({type: 'SHOW_ADD_BACKCARD'})
        document.body.style.overflow = 'hidden'
    }

    // 点击弹框叉号的时候
    clickHandler() {
        let cardNumber = this.refs.cardNumber
        cardNumber.value = ''
        const {dispatch} = this.props
        dispatch({type: 'HIDE_ADD_BACKCARD'})
        document.body.style.overflow = 'auto'
    }

    // 选择开户行的时候
    onChange(e) {
        //获取银行卡列表
        value = e.target.value
    }

    //确认添加银行卡
    sureCardFunc() {
        let name = this.refs.bankName.innerHTML
        let cardNumber = this.refs.cardNumber.value.trim()
        let getBtn = this.refs.getBtn
        //去除空格
        let replaceCardNumber = cardNumber.replace(/\s+/g, "");
        // 判断select框
        if (!value) {
            this.setState({
                bankCard: false
            })
            return false
        } else {
            this.setState({
                bankCard: true
            })
        }
        // 判断输入银行卡号
        if (!cardNumber) {
            this.setState({
                cardNumber: false
            })
            return false
        }
        if (!this.state.cardNumber) {
            return false
        }
        const {dispatch} = this.props
        let info = {
            bankUuid: value,
            bankCardNo: replaceCardNumber,
            bankCustomerName: name
        }
        getBtn.setAttribute('disabled', 'disabled')
        getBtn.style.backgroundColor = '#ccc';
        getBtn.style.border = "1px solid #ccc"
        dispatch(addBankCard(dispatch, info, getBtn))
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getBankCardLists())
        dispatch(getBankTypeList())
    }

    //输入银行卡号的时候每位添加一个空格
    inputFunc() {
        let cardNumber = this.refs.cardNumber
        let value = cardNumber.value
        if (/\S{5}/.test(value)) {
            cardNumber.value = value.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        }
    }

    render() {
        const {number, cardList, isIconShow} = this.props.cardInfo
        const {options} = this.props.bankTypeList
        const {name, phone} = this.props.userInfo
        const {display, msg, showCardStatus} = this.props.saveCardInfo
        const {random} = this.props.authConfig
        let item = cardList.map((cur, index) => {
            return <div className="bankCardPayCardChangeList" key={index.toString()}>
                <p className="fl text-center " onClick={this.closeFunc.bind(this, cur.bankCardNo, cur.cardId)}>
                    <Icon
                        className={( this.state.cardId == cur.cardId || (this.state.cardId == '' ? index == 0 : false)) ? "green show" : "green hide"}
                        type="check-circle"/>
                    <span>{cur.bankName}</span></p>
                <p className="fl text-center "
                   onClick={this.closeFunc.bind(this, cur.bankCardNo, cur.cardId)}>{cur.bankCardNo}</p>
                <p className="fr text-center warn" onClick={this.delFunc.bind(this, cur.cardId)}>删除</p>
            </div>
        })
        let option = options.map((cur, index) => {
            return <option key={index.toString()} value={`${cur.bankUuid}`}>{cur.bankCenterName}</option>
        })
        return (
            <div className="bankCardPay">
                <div className="bankCardPayNum">
                    <span><Icon type="file-text"/></span>
                    <span>填写金额并完成充值订单</span>
                    <span><Icon type="pay-circle-o"/></span>
                    <span>登录网银支付订单</span>
                    <span><Icon type="clock-circle-o"/></span>
                    <span>转账成功后，40分钟内到账</span>
                </div>
                <div className="bankCardPayMain">
                    <div className="bankCardPayCenter">
                        <div className="bankCardPayInput">
                            <span>请输入充值金额：</span><input ref="money" type="text"/><span>.</span><span
                            ref="point">{random < 10 ? "0" + random : random}</span>
                        </div>
                        <div className="bankCardPayName">
                            <span>汇款人姓名：</span><span>{name}</span><span>（仅支持使用本人银行卡充值）</span>
                        </div>
                        <div className="bankCardPayCard clearfix">
                            <span className="fl">汇款人银行卡号：</span>
                            <div className="bankCardPayChange clearfix inlineBlock fl">
                                <input type="text" disabled className="fl"
                                       value={isIconShow == 0 ? '' : ( this.state.number ? this.state.number : number )}/>
                                <button className="fr"
                                        onClick={this.changeCardFunc.bind(this)}>{isIconShow == 0 ? "添加银行卡" : "更换银行卡"}</button>
                            </div>
                        </div>
                        <div className={this.state.card ? "hide bankCardPayCardChange" : "show bankCardPayCardChange"}>
                            {item}
                            {/*<Icon className={isIconShow == 0 ? "green hide" : "green show"} type="check-circle"/>*/}
                            <div className="bankCardPayCardAdd">
                                <button className="warn" onClick={this.addCard.bind(this)}>添加银行卡</button>
                            </div>
                        </div>
                        <div
                            className={display ? "hide bankCardPayCardAddInfo" : "show bankCardPayCardAddInfo"}>
                            <div className="bankCardPayCardAddInfoBox">
                                <div className="bankCardPayCardAddInfoBoxCenter">
                                    <div className="AddInfoBoxCenterTop"></div>
                                    <div className="bankCardPayTopTtileIcon clearfix">
                                        <span className="fl warn">银行转账充值</span><span className="fr warn"><Icon
                                        type="close-circle-o"
                                        onClick={this.clickHandler.bind(this)}/></span>
                                    </div>
                                    <div className="AddInfoBoxCenterMain">
                                        <div className="AddInfoBoxCenterMainName">
                                            <span>姓名：</span>
                                            <span ref="bankName" className="font-weight">{name}</span>
                                            <span>（仅支持您本人银行卡充值）</span>
                                        </div>
                                        <div className="AddInfoBoxCenterMainOpen">
                                            <span>开户行：</span>
                                            <select placeholder="选择开户银行" onChange={this.onChange.bind(this)}>
                                                {option}
                                            </select>
                                            {this.state.bankCard ? "" : <span className="warn show">*开户行信息不能为空</span>}
                                        </div>
                                        <div className="AddInfoBoxCenterMainCard">
                                            <span>银行卡号：</span><input type="text"
                                                                     maxLength="30" ref="cardNumber"
                                                                     onInput={this.inputFunc.bind(this)}
                                                                     placeholder="请填写银行号码"/>
                                            {showCardStatus ? "" : <span className="warn show"><em>*</em>{msg}</span>}
                                        </div>
                                        <div className="AddInfoBoxCenterMainLogin">
                                            <span>注册手机号：</span>
                                            <span>{phone}</span>
                                        </div>
                                        <div className="AddInfoBoxCenterMainButton">
                                            <button className="warn" ref="getBtn"
                                                    onClick={this.sureCardFunc.bind(this)}>确定
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="bankCardPayResPhone">
                            <span>手机号：</span>
                            <span className={this.state.change ? "show inlineBlock" : "hide"}>{this.props.phone}</span>
                            <input type="text" ref="phone" placeholder="请填写手机号码" maxLength="11" className={this.state.change ? "hide" : "show inlineBlock"}/>
                            <span onClick={this.changeFunc.bind(this)}>
                                {this.state.change ? "修改" : <span><span className="bankCardPayResPhone-finish" onClick={this.clkFunc.bind(this)}>完成</span><span onClick={this.cancelFunc.bind(this)}>取消</span></span>}
                            </span>
                        </div>*/}
                        <div className="bankCardPayButton">
                            <button ref="payButton" onClick={this.handleFunc.bind(this)}>获取收款账号</button>
                        </div>
                        <BankCardPayAlert {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}