import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import moment from 'moment'
import { customerCoinAccount } from './CommonAction'
import { getBeforeDate } from '../../../tools/utils'
const dateFormat = 'YYYY-MM-DD';
function receiveUserInfoInPay(data) {
    return {
        type: 'USERINFO_IN_PAY',
        userInfo: data
    }
}
// 获取用户信息
export const requestUserInfoInPay = (dispatch) => {
    return dispatch => {
        axios.post('/user/personalInfo')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(receiveUserInfoInPay(res.data.attachment))
                }
            }.bind(this))
    }
}
function receiveAuthConfig (info) {
    return {
        type: 'GET_AUTH_CONFIG',
        authConfig: info
    }
}
// 查询用户权限配置
/*
* actionId: 1,人民币
* currencyId: 1 人民币
*/
export const authConfig = (dispatch, info) => {
    return dispatch => {
        axios.post('/authConfig', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if(res.data.status === 200) {
                    let info = {
                        random: res.data.random,
                        authConfig: res.data.attachment
                    }
                    return dispatch(receiveAuthConfig(info))
                }
            })
    }
}
// ----------------------------微信支付----------------------------------//
function payForWeiChatInfo(info) {
    return {
        type: 'PAY_FOR_WEICHAT_INFO',
        payWeiChat: info
    }
}
// 点击微信支付
export const payForWeiChat = (dispatch, amount, el,payForWeiChat) => {
    return dispatch => {
        axios.post('/scanCode', qs.stringify({
            amount: amount,
            rechargeType: 1,
            actionId: 1,
            currencyId: 1
        }))
            .then(function (res) {
                payForWeiChat.style.backgroundColor = '#fff';
                payForWeiChat.style.border = "1px solid #da161a"
                payForWeiChat.removeAttribute('disabled', 'disabled')
                if (res.data.status === 200) {
                    el.value = ''
                    let info = {
                        show: false,
                        img: res.data.attachment.qrCodeUrl,
                        payMoney: amount,
                        orderNumber: res.data.attachment.ref_id
                    }
                    dispatch(payForWeiChatInfo(info))
                } else if(res.data.status === 201) {
                    message.error(res.data.message)
                } else {
                    message.error(res.data.message)
                }
            })
    }
}
function WeiChatPayCallback(data) {
    return {
        type: 'WEICHAT_CALLBACK_INFO',
        weiChatInfo: data
    }
}
// 轮询检查微信充值是否成功
export const checkWeiChatPay = (dispatch, orderNumber) => {
    return dispatch => {
        axios.post('/reCharge/' + orderNumber)
            .then(function (res) {
                if (res.data.status === 200) {
                    //如果充值成功了，还是失败状态传下去
                    if (res.data.attachment.status == 2 || res.data.attachment.status == 3) {
                        let info = {
                            payStatus: res.data.attachment.status,
                            actual_amount: res.data.attachment.actual_amount,
                            closeBox: false
                        }
                        if(res.data.attachment.status == 2) {
                            dispatch(customerCoinAccount())
                        }
                        return dispatch(WeiChatPayCallback(info))
                    }
                }
            })
    }
}
// ----------------------------支付宝支付----------------------------------//
function payForAlipayInfo(info) {
    return {
        type: 'PAY_FOR_ALIPAY_INFO',
        payAlipay: info
    }
}
export const payForAlipay = (dispatch, amount, el,payForAlipay) => {
    return dispatch => {
        axios.post('/scanCode', qs.stringify({
            amount: amount,
            rechargeType: 2,
            actionId: 1,
            currencyId: 1
        }))
            .then(function (res) {
                payForAlipay.style.backgroundColor = '#fff';
                payForAlipay.style.border = "1px solid #da161a"
                payForAlipay.removeAttribute('disabled', 'disabled')
                if (res.data.status === 200) {
                    el.value = ''
                    let info = {
                        show: false,
                        img: res.data.attachment.qrCodeUrl,
                        payMoney: amount,
                        orderNumber: res.data.attachment.ref_id
                    }
                    dispatch(payForAlipayInfo(info))
                } else if(res.data.status === 201) {
                    message.error(res.data.message)
                } else {
                    message.error(res.data.message)
                }
            })
    }
}
// 轮询检查支付宝充值是否成功
function AlipayCallback(data) {
    return {
        type: 'ALIPAY_CALLBACK_INFO',
        alipayInfo: data
    }
}
export const checkAlipay = (dispatch, orderNumber) => {
    return dispatch => {
        axios.post('/reCharge/' + orderNumber)
            .then(function (res) {
                if (res.data.status === 200) {
                    //如果充值成功了，还是失败状态传下去
                    if (res.data.attachment.status == 2 || res.data.attachment.status == 3) {
                        let info = {
                            payStatus: res.data.attachment.status,
                            actual_amount: res.data.attachment.actual_amount,
                            closeBox: false
                        }
                        if(res.data.attachment.status == 2) {
                            dispatch(customerCoinAccount())
                        }
                        return dispatch(AlipayCallback(info))
                    }
                }
            })
    }
}
// ----------------------------银行卡支付----------------------------------//
// 获取银行卡列表
function receiveCardLists(info) {
    return {
        type: "GET_BANK_CARD_LIST",
        cardInfo: info
    }
}
export const getBankCardLists = (dispatch) => {
    return dispatch => {
        axios.post('/cardList')
            .then(function (res) {
                if (res.data.status === 200) {
                    let number, cardId
                    if (res.data.attachment.length == 0) {
                        number = ''
                        cardId = ''
                    } else {
                        number = res.data.attachment[0].bankCardNo,
                            cardId = res.data.attachment[0].cardId
                    }
                    let info = {
                        number: number,
                        cardId: cardId,
                        cardList: res.data.attachment,
                        isIconShow: res.data.attachment.length
                    }
                    return dispatch(receiveCardLists(info))
                }
            })
    }
}
function receiveBankTypeList(option) {
    return {
        type: 'GET_BANK_TYPE_LIST',
        options: option
    }
}
// 获取银行卡类型列表
export const getBankTypeList = (dispatch) => {
    return dispatch => {
        //获取银行卡列表
        axios.post('/bankTypeList')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(receiveBankTypeList(res.data.attachment))
                }
            })
    }
}
function addBankCardStatus(info) {
    return {
        type: 'ADD_BANK_STATUS',
        saveCardInfo: info
    }
}
// 添加银行卡
export const addBankCard = (dispatch, info,getBtn) => {
    return dispatch => {
        axios.post('/cardSave', qs.stringify({
            ...info
        }))
            .then(function (res) {
                getBtn.style.backgroundColor = '#fff';
                getBtn.style.border = "1px solid #da161a"
                getBtn.removeAttribute('disabled', 'disabled')
                if (res.data.status === 200) {
                    document.body.style.overflow = 'auto'
                    dispatch(getBankCardLists())
                    let info = {
                        display: true,
                        showCardStatus: true,
                        msg: ''
                    }
                    return dispatch(addBankCardStatus(info))
                } else if(res.data.status === 500){
                    let info = {
                        display: false,
                        showCardStatus: false,
                        msg: res.data.message
                    }
                    return dispatch(addBankCardStatus(info))
                }
            })
    }
}
// 删除银行卡
export const deleteBankCard = (dispatch, id) => {
    return dispatch => {
        axios.delete('/cardDel/' + id)
            .then(function (res) {
                if (res.data.status === 200) {
                    dispatch(getBankCardLists())
                }
            })
    }
}
function receiveCompanyInfo(info) {
    return {
        type: 'COMPANY_BANK_INFO',
        companyInfo: info
    }
}
// 银行转账
export const bankTransferAccounts = (dispatch, info,getBtn) => {
    return dispatch => {
        axios.post('/transfer', qs.stringify({
            ...info,
            actionId: 1,
            currencyId: 1
        }))
            .then(function (res) {
                getBtn.style.backgroundColor = '#fff';
                getBtn.style.border = "1px solid #da161a"
                getBtn.removeAttribute('disabled', 'disabled')
                if (res.data.status === 200) {
                    //请求数据放在state，然后在传到弹窗里
                    let info = {
                        companyName: res.data.attachment.CardAccountName,
                        companyBank: res.data.attachment.bankDeposit,
                        companyBankCardNo: res.data.attachment.bankCardNo.replace(/\s/g, '').replace(/(.{4})/g, "$1 "),
                        companyNote: res.data.attachment.note,
                        companyAmount: res.data.attachment.amount,
                        companyBankTypeName: res.data.attachment.bankTypeName,
                        companyBankUrl: res.data.attachment.url,
                        bankCenterName: res.data.attachment.bankCenterName,
                        show: false
                    }
                    document.body.style.overflow = 'hidden'
                    dispatch(receiveCompanyInfo(info))
                } else if(res.data.status === 201) {
                    message.error(res.data.message)
                } else {
                    message.error(res.data.message)
                }
            })
    }
}
// ----------------------------查询当前币种地址及二维码----------------------------------//
function cionInfoResult(info) {
    return {
        type: 'CURRENT_COIN_INFO',
        coinInfo: info
    }
}
export const getCurrentCionInfo = (dispatch, info) => {
    return dispatch => {
        axios.post('/coin/selectUserAddress', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    let info = {
                        address: res.data.attachment.address,
                        img: res.data.attachment.image
                    }
                    return dispatch(cionInfoResult(info))
                }
            })
    }
}
// ----------------------------查询充值记录----------------------------------//
function rechargeRecordList(lists) {
    return {
        type: 'RECHARGE_RECORD_LIST',
        rechargeCNYList: lists
    }
}
let prev = "1";
export const queryRechargeRecord = (dispatch, params) => {
    return dispatch => {
        axios.get('/reChargeList', {
            params: {
                ...params,
                size: 10
            }
        })
            .then(function (res) {
                if (res.data.status === 200) {
                    let startTime,endTime
                    if(prev === params.rechargeType) {
                        startTime = moment(params.screateTimeBegin, dateFormat)
                        endTime = moment(params.createTimeEnd, dateFormat)
                    } else {
                        prev = params.rechargeType
                        startTime = moment(getBeforeDate(1), dateFormat)
                        endTime = moment(getBeforeDate(), dateFormat)
                    }
                    let info = {
                        lists: res.data.attachment.list,
                        total: res.data.attachment.total,
                        startTime: startTime,
                        endTime: endTime,
                        rechargeType: params.rechargeType,
                        status: params.status
                    }
                    return dispatch(rechargeRecordList(info))
                }
            })
    }
}