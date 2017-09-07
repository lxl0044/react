import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import {customerCoinAccount} from './CommonAction'
import {getDate,getBeforeDate} from '../../../tools/utils'
import moment from 'moment'
const dateFormat = 'YYYY-MM-DD';

function receiveUserInfoInWithDraw(data) {
    return {
        type: 'USERINFO_IN_WithDraw',
        userInfo: data
    }
}
// 获取用户信息
export const requestUserInfoInWithDraw = (dispatch) => {
    return dispatch => {
        axios.post('/user/personalInfo')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(receiveUserInfoInWithDraw(res.data.attachment))
                }
            })
    }
}
function receiveCoinInfo(info) {
    return {
        type: 'WITHDRAW_GET_COIN_INFO',
        coinInfo: info
    }
}
//--------------------提现(非人民币)---------------------//
// 查询币种信息
export const queryCoinInfo = (dispatch, info) => {
    return dispatch => {
        axios.post('/coin/selectTakeCoin', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(receiveCoinInfo({...res.data.attachment}))
                }
            })
    }
}
function addCoinAddressStatus(status) {
    return {
        type: 'ADD_COIN_STATUS',
        status
    }
}
// 添加提币地址
export const addCoinAddress = (dispatch, info) => {
    return dispatch => {
        axios.post('/coin/insertTakeAddress', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    dispatch(queryCoinInfo(dispatch, {currencyId: res.data.attachment}))
                    dispatch(addCoinAddressStatus({alert: true}))
                    document.body.style.overflow = 'auto'
                } else if (res.data.status === 468) {
                    message.error('交易密码输入错误')
                } else {
                    message.error(res.data.message)
                }
            })
    }
}
// 删除提币地址
export const deldeteCoinAddress = (dispatch, info) => {
    return dispatch => {
        axios.post('/coin/updateCoinAddress', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    dispatch(queryCoinInfo(dispatch, {currencyId: info.currencyId}))
                } else{
                    message.error(res.data.message)
                }
            })
    }
}
//重置手续费的值
function resStateCT(money) {
    return {
        type: 'RES_STATE_CT_MONEY',
        money: money
    }
}
// 提交订单
export const submitWithDrawOrder = (dispatch, info,moneyCT,dealPassword,yzCode,phoneM,getWithdrawCT,currencyId) => {
    return dispatch => {
        axios.post('/coin/takeCoin', qs.stringify({
            ...info
        }))
            .then(function (res) {
                //提币
                let infoCTRecord = {
                    status: 1,//1未完成2完成
                    start: 1,
                    size: 10,
                    currentyId:currencyId,
                    beginTime: getBeforeDate(1),
                    endTime: getBeforeDate()
                }
                getWithdrawCT.style.backgroundColor = '#da161a';
                getWithdrawCT.style.border = "1px solid #da161a"
                getWithdrawCT.removeAttribute('disabled', 'disabled')
                if (res.data.status === 200) {
                    message.success('提币成功，请耐心等待')
                    moneyCT.value = ''
                    dealPassword.value = ''
                    yzCode.value = ''
                    phoneM.value = ''
                    //改变冲币中的手续费
                    dispatch(resStateCT(0))
                    //币种余额
                    dispatch(queryCoinInfo(dispatch, {currencyId: currencyId}))
                    //资产显示
                    dispatch(customerCoinAccount())
                    //提币记录
                    dispatch(WithDrawCTRecordTable(dispatch,infoCTRecord))
                } else if (res.data.status === 201) {
                    message.error(res.data.message)
                } else if (res.data.status === 1001) {
                    message.error('您的余额已不足')
                } else {
                    message.error(res.data.message)
                }
            })
    }
}
//--------------------提现记录(非人民币)---------------------//
// 币种提现记录
export const coinWithDrawRecord = (dispatch, info) => {
    return dispatch => {
        axios.post('/selectTakeList', qs.stringify({
            ...info
        }))
            .then(function (res) {
                // console.log(res)
            })
    }
}
//--------------------提现(人民币)---------------------//
function resStateCNY(sum) {
    return {
        type: 'RES_STATE_CNY_SUM',
        sum: sum
    }
}
export const submitWithDrawOrderCNY = (dispatch, info, resMoney, resDealPwd, resYzCode, resPhoneCode,getWithdraw) => {
    return dispatch => {
        axios.post('/withDraw', qs.stringify({
            ...info
        }))
            .then(function (res) {
                //提现
                let infoCNYRecord = {
                    status: 1,//1未完成2完成
                    start: 1,
                    size: 10,
                    screateTimeBegin: getBeforeDate(1),
                    createTimeEnd: getBeforeDate()
                }
                getWithdraw.style.backgroundColor = '#da161a';
                getWithdraw.style.border = "1px solid #da161a"
                getWithdraw.removeAttribute('disabled', 'disabled')
                if (res.data.status == 200) {
                    message.success("提交订单成功")
                    resMoney.value = ""
                    resDealPwd.value = ""
                    resYzCode.value = ""
                    resPhoneCode.value = ""
                    //充值实际到账
                    dispatch(resStateCNY(0))
                    //重新触发人民币的余额
                    dispatch(getWithDrawCNYBalance())
                    //资产显示
                    dispatch(customerCoinAccount())
                    //提现记录
                    dispatch(WithDrawCNYRecordTable(dispatch,infoCNYRecord))
                } else if (res.data.status === 201) {
                    message.error(res.data.message)
                } else if (res.data.status === 423) {
                    message.error("短信验证码不正确")
                } else if (res.data.status === 468) {
                    message.error("交易密码错误")
                } else {
                    message.error(res.data.message)
                }
            }.bind(this))
    }
}
//提现人民币的余额
function WithDrawCNYBalance(cashAmount) {
    return {
        type: 'GET_CNY_BALANCE',
        cnyBalance: cashAmount
    }
}
export const getWithDrawCNYBalance = (dispatch) => {
    return dispatch => {
        axios.post('/property')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(WithDrawCNYBalance(res.data.attachment.rmb.cashAmount))
                }
            })
    }
}
//--------------------提现(人民币)记录---------------------//
function WithDrawCNYRecord(CNYRecordTable) {
    return {
        type: 'GET_CNY_RECORD',
        CNYRecordTable: CNYRecordTable
    }
}
export const WithDrawCNYRecordTable = (dispatch, info) => {
    return dispatch => {
        axios.post('/withdrawList', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    //判断返回的数据的条数
                    if (res.data.attachment.list.length === 0) {
                        return dispatch(WithDrawCNYRecord({
                            isPage: res.data.attachment.list.length,
                            total:res.data.attachment.total,
                            data: res.data.attachment.list
                        }))
                    } else {
                        //不等于0就进入这里
                        return dispatch(WithDrawCNYRecord({
                            isPage: res.data.attachment.list.length,
                            total:res.data.attachment.total,
                            data: res.data.attachment.list
                        }))
                    }
                }
            })
    }
}
//--------------------提现(非人民币12ct)记录---------------------//
function WithDrawCTRecord(CTRecordTable) {
    return {
        type: 'GET_CT_RECORD',
        CTRecordTable: CTRecordTable
    }
}
let prev = 2
export const WithDrawCTRecordTable = (dispatch, info) => {
    return dispatch => {
        axios.post('/coin/selectTakeList', qs.stringify({
            ...info
        }))
            .then(function (res) {
                let startTime,endTime
                if (prev === info.currentyId) {
                    startTime = moment(info.beginTime, dateFormat)
                    endTime = moment(info.endTime, dateFormat)
                } else {
                    prev = info.currentyId
                    startTime = moment(getBeforeDate(1), dateFormat)
                    endTime = moment(getBeforeDate(), dateFormat)
                }
                if (res.data.status === 200) {
                    //判断返回的数据的条数
                    return dispatch(WithDrawCTRecord({
                        isPage: res.data.attachment.list.length,
                        total:res.data.attachment.total,
                        data: res.data.attachment.list,
                        startTime:startTime,
                        endTime:endTime,
                        status:info.status
                    }))
                }
            })
    }
}
//-----------------------撤销提现订单-------------------------


export const cancelWithDrawBill= (dispatch, info) => {
    return dispatch => {
        axios.post('/withdrawClose', qs.stringify({
            ...info
        }))
            .then(function (res) {
                let params = {
                    status: 1,//1未完成2完成
                    start: 1,
                    size: 10,
                    screateTimeBegin: getBeforeDate(1),
                    createTimeEnd: getBeforeDate()
                }
                if (res.data.status === 200) {
                    message.success("撤销成功")
                    //提现记录
                    dispatch(WithDrawCNYRecordTable(dispatch, params))
                    //重新触发人民币的余额
                    dispatch(getWithDrawCNYBalance())
                }else{
                    message.error(res.data.message)
                }
            })
    }
}

















