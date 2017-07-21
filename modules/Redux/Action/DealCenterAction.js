import io from 'socket.io-client'
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'
import { realTime } from '../../host'
import { customerCoinAccount } from './CommonAction'
let socket = io(realTime, {
    transports: ['websocket']
})

// ------------- 交易密码 -------------------//

function getDealPwd (status) {
    return {
        type: 'GET_PERSON_DEALPWD',
        status: status
    }
}



export const hasSettingDealPwd = () => {
    return dispatch => {
        axios.post('user/personalInfo')
            .then(function (res) {
                if(res.data.status === 200) {
                    return dispatch(getDealPwd(res.data.attachment.isValidatePass === 1))
                }
            })
    }
}




// ---------------右侧栏目---------------//
function dealCenterCates (info,status) {
    return {
        type: 'DEAL_CENTER_CATES',
        cates: info,
        spread: status
    }
}

// 发送消息 --- 右侧栏目
let coin = '2'
export const emitMsgForCates = (dispatch, coinCode) => {
    if(coinCode && coin !== coinCode) {
        coin = coinCode
    }
    return dispatch => {
        socket.emit('quote_center_coins',{coinCode: coin, coinId: 2})
        socket.on('quote_center_coins', function (data) {
            dispatch(dealCenterCates(data, true))
        })
    }
}

// ---------------首页行情图--------------- //

function receiveRealTimeMarketInfo (data) {
    return {
        type: 'REAL_TIME_DETAILS',
        info: data
    }
}

function receiveRealTimeMarketChart (data) {
    return {
        type: 'REAL_TIME_CHART_INFO',
        chart: data
    }
}


export const requestRealTimeDetails = (dispatch, coin = '2') => {
    return dispatch => {
        //socket 获取第一次数据
        socket.emit('quote', {coinCode: coin, coinId: 2})
        socket.emit("realtime", {coinCode: coin, coinId: 2})
        //监听消息
        socket.on(`quote_${coin}`, function (data) {
            dispatch(receiveRealTimeMarketInfo(data))
        })
        //监听数据
        socket.on(`realtime_${coin}`, function (data) {
            dispatch(receiveRealTimeMarketChart(data))
        })

    }
}

// // --------------交易中心k线图---------//
//
// // 接收数据 --分时
// function dealCenterRealtimeKline (data, time) {
//     return {
//         type: 'DEAL_CENTER_KLINE_REALTIME',
//         klineRealTime: data,
//         index: time,
//         status: true
//     }
// }
//
// // 接收数据 --1分
// function dealCenterOneKline (data, time) {
//     return {
//         type: 'DEAL_CENTER_KLINE_ONE',
//         klineOne: data,
//         index: time,
//         status: true
//     }
// }
//
// // 接收数据 --5分
// function dealCenterFiveKline (data, time) {
//     return {
//         type: 'DEAL_CENTER_KLINE_FIVE',
//         klineFive: data,
//         index: time,
//         status: true
//     }
// }
// // 接收数据 --10分
// function dealCenterTenKline (data, time) {
//     return {
//         type: 'DEAL_CENTER_KLINE_TEN',
//         klineTen: data,
//         index: time,
//         status: true
//     }
// }
//
// // 接收数据 --30分
// function dealCenterThirtyKline (data, time) {
//     return {
//         type: 'DEAL_CENTER_KLINE_THIRTY',
//         klineThirty: data,
//         index: time,
//         status: true
//     }
// }
//
// // 接收数据 --60分
// function dealCenterHoursKline (data, time) {
//     return {
//         type: 'DEAL_CENTER_KLINE_HOURS',
//         klineHours: data,
//         index: time,
//         status: true
//     }
// }
//
// // 接收数据 -- 一天
// function dealCenterDayKline (data, time) {
//     return {
//         type: 'DEAL_CENTER_KLINE_DAY',
//         klineDay: data,
//         index: time,
//         status: true
//     }
// }
//
// let index
// export const klineEmitMsgForRealtime = (dispatch, time, coin) => {
//     index = time
//     return dispatch => {
//         switch (index) {
//             case 0:
//                 socket.emit('quote_center_realtime', {coinCode:coin, coinId: 2})
//                 break
//             case 1:
//                 socket.emit('quote_center_kline', {coinCode:coin, coinId: 2, type: 1})
//                 break
//             case 2:
//                 socket.emit('quote_center_kline', {coinCode:coin, coinId: 2, type: 5})
//                 break
//             case 3:
//                 socket.emit('quote_center_kline', {coinCode:coin, coinId: 2, type: 10})
//                 break
//             case 4:
//                 socket.emit('quote_center_kline', {coinCode:coin, coinId: 2, type: 30})
//                 break
//             case 5:
//                 socket.emit('quote_center_kline', {coinCode:coin, coinId: 2, type: 60})
//                 break
//             case 6:
//                 socket.emit('quote_center_kline', {coinCode:coin, coinId: 2, type: 7200})
//                 break
//         }
//
//         socket.on(`quote_center_realtime_${coin}`, function (data) {
//             dispatch(dealCenterRealtimeKline(data, index))
//         })
//         socket.on(`quote_center_kline_one_${coin}`, function (data) {
//             dispatch(dealCenterOneKline(data, index))
//         })
//         socket.on(`quote_center_kline_five_${coin}`, function (data) {
//             dispatch(dealCenterFiveKline(data, index))
//         })
//         socket.on(`quote_center_kline_ten_${coin}`, function (data) {
//             dispatch(dealCenterTenKline(data, index))
//         })
//         socket.on(`quote_center_kline_thirty_${coin}`, function (data) {
//             dispatch(dealCenterThirtyKline(data, index))
//         })
//         socket.on(`quote_center_kline_hours_${coin}`, function (data) {
//             dispatch(dealCenterHoursKline(data, index))
//         })
//         socket.on(`quote_center_kline_day_${coin}`, function (data) {
//             dispatch(dealCenterDayKline(data, index))
//         })
//     }
// }
//
//
// --------------------交易-----------------------//

function receiveDelegateRecord (data) {
    return {
        type: 'TRADING_DELEGATE_RECORD',
        delegateRecord: data
    }
}

// 获取用户委托信息
export const personalDelegateRecord = (dispatch) => {
    return dispatch => {
        axios.post('/user/showOrderList', qs.stringify({
            status: 0
        }))
            .then(function (res) {
                if(res.data.status === 200) {
                    dispatch(receiveDelegateRecord({ ...res.data.attachment }))
                }
            })
    }
}

function receivePersonalTradingPrice (data) {
    return {
        type: 'REALTIME_PERSONAL_ACCOUNT',
        personalAccount: data
    }
}

// 实时监听用户交易资产
export const lisntenPersonalTradingPrice = (dispatch, coin = '2') => {
    const token = localStorage.getItem('token')
    const uid = localStorage.getItem('uid')
    if(!uid && !token) return;
    return dispatch => {
        socket.emit('personal_account_change', { token: token, uid: uid, coinCode: coin})
        socket.on(`personal_account_change_${uid}_${coin}`, function (data) {
            dispatch(receivePersonalTradingPrice(data))
        })
    }
}

function receivePersonalTradingPwd (status) {
    return {
        type: 'PERSONAL_TRADING_PWD_STATUS',
        pwdStatus: status
    }
}

// 获取用户交易密码设置状态
export const getPersonalTradingPwd = () => {
    return dispatch => {
        axios.post('user/selectFdPwdEnabled')
            .then(function (res) {
                if(res.data.status === 200) {
                    dispatch(receivePersonalTradingPwd(res.data.attachment.enabled))
                }
            })
    }
}


// 生成委托单 -> 限价买/卖
export const createTradingOrderLimit = (dispatch, info, el1, el2, coinCode,dealPassword) => {
    const token = localStorage.getItem('token')
    const uid = localStorage.getItem('uid')
    return dispatch => {
        axios.post('order/order', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if(res.data.status !== 200) {
                    return message.error(res.data.message)
                }
                el1.value = ''
                el2.value = ''
                dispatch(customerCoinAccount())
                socket.emit('personal_account_change', { token: token, uid: uid, coinCode: coinCode})
                if(!dealPassword) return
                dealPassword.value = ""
            })
    }
}

// 生成委托单 -> 市价买/卖
// export const createTradingOrderNotlimit = (dispatch, info, el, coinCode) => {
//     return dispatch => {
//         axios.post('order/order', qs.stringify({
//             ...info
//         }))
//             .then(function (res) {
//                 if(res.data.status !== 200) {
//                     return message.error(res.data.message)
//                 }
//                 message.success('下单成功')
//                 el.value = ''
//                 socket.emit('personal_account_change', { token: token, uid: uid, coinCode: coinCode})
//             })
//     }
// }


// 撤销委托单
export const cancelTradingOrder = (dispatch, info, el) => {
    return dispatch => {
        axios.post('order/cancel', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if(res.data.status !== 200) {
                    return message.error(res.data.message)
                }
                message.success('撤单成功')
                dispatch(customerCoinAccount())
                dispatch({type: 'CLOSE_DELEGATE_PWD_BOX'})
                if(!el) return
                el.value = ''
            })
    }
}



// -------------------委托单详情 delegate details------------------//

// 买
function receiveDelegateDetailsBuy (data) {
    return {
        type: 'DEALCENTER_DELEGATE_DETAILS_BUY',
        detailsBuy: data
    }
}

// 卖
function receiveDelegateDetailsSell (data) {
    return {
        type: 'DEALCENTER_DELEGATE_DETAILS_SELL',
        detailsSell: data
    }
}

// 委托信息 买入/卖出
export const dealCenterDelegateDetails = (dispatch, coin = '2') => {
    return dispatch => {
        socket.emit('quote_center_buysell', {type: 1,coinCode: coin})
        socket.emit('quote_center_buysell', {type: 2,coinCode: coin})

        socket.on(`quote_center_buysell_${coin}`, function (data) {
            data.type === 1 ? dispatch(receiveDelegateDetailsBuy(data)) : dispatch(receiveDelegateDetailsSell(data))
        })
    }
}


// 最新成交记录
function receiveLastestTrading (data) {
    return {
        type: 'LASTEST_TRANDING_DATA',
        tradingData: data
    }
}


export const dealCenterLastestTrading = (dispatch, coin = '2') => {
    return dispatch => {
        socket.emit('quote_center_trades', { coinCode: coin })

        socket.on(`quote_center_trades_${coin}`, function (data) {
            dispatch(receiveLastestTrading(data))
        })
    }
}
