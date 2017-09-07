import io from 'socket.io-client'
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import {realTime} from '../../host'
import {customerCoinAccount} from './CommonAction'
import { formatNumber } from "../../../tools/utils"

let socket = io(realTime, {
    transports: ['websocket']
})

// 写死币种
// const {coinCode, changeRate, currencyName, currencyNameEn, currentAmount, pointPrice, selected, boxColor, color, icoUrl} = this.props
const tempCoin = [{
    coinCode: '111',
    changeRate: 0,
    currencyName: '比特币',
    currencyNameEn: 'BTC',
    icoUrl: 'btc.png',
    currentAmount: '敬请期待',
    pointPrice: 4
}, {
    coinCode: '112',
    changeRate: 0,
    currencyName: '以太坊',
    currencyNameEn: 'ETH',
    icoUrl: 'eth.png',
    currentAmount: '敬请期待',
    pointPrice: 4
}, {
    coinCode: '113',
    changeRate: 0,
    currencyName: '莱特币',
    currencyNameEn: 'LTC',
    icoUrl: 'ltc.png',
    currentAmount: '敬请期待',
    pointPrice: 4
}, {
    coinCode: '114',
    changeRate: 0,
    currencyName: '印链',
    currencyNameEn: 'INS',
    icoUrl: 'ins.png',
    currentAmount: '敬请期待',
    pointPrice: 4
}, {
    coinCode: '115',
    changeRate: 0,
    currencyName: '选举链',
    currencyNameEn: 'ELC',
    icoUrl: 'elc.png',
    currentAmount: '敬请期待',
    pointPrice: 4
}]

// ------------- 交易密码 -------------------//

function getDealPwd(status) {
    return {
        type: 'GET_PERSON_DEALPWD',
        status: status
    }
}


export const hasSettingDealPwd = () => {
    return dispatch => {
        axios.post('user/personalInfo')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(getDealPwd(res.data.attachment.isValidatePass === 1))
                }
            })
    }
}

// // 获取首页行情图类别
function receiveRealTimeMarketCates(cates) {
    return {
        type: 'REAL_TIME_CATES',
        lists: cates
    }
}

export const realTimeMarketCates = () => {
    return dispatch => {
        axios.post('/coin/coins')
            .then(function (res) {
                if (res.data.status === 200) {
                    let coins = res.data.attachment
                    return dispatch(receiveRealTimeMarketCates(coins))
                }
            })
    }
}


// ---------------右侧栏目---------------//

function dealCenterCates(info) {
    return {
        type: 'DEAL_CENTER_CATES',
        cates: info
    }
}

// 发送消息 --- 右侧栏目
let coin = '2'
export const emitMsgForCates = (dispatch, coinCode) => {
    if (coinCode && coin !== coinCode) {
        coin = coinCode
    }

    return dispatch => {
        socket.emit('quote_center_coins', {coinCode: coin, coinId: 2})
        socket.off('quote_center_coins')
        socket.on('quote_center_coins', function (data) {
            let title = document.querySelector('html head title')
            title.innerText = `${data.current.currencyNameEn}:￥${formatNumber(data.current.currentAmount, data.current.pointPrice)} -12 链-区块链数字资产交易服务提供商`

            let arr = data.others
            tempCoin.forEach(function (item) {
                let flag = true
                arr.forEach(function (list) {
                    if(item.currencyNameEn === list.currencyNameEn){
                        return flag = false
                    }
                })

                if(flag) {
                    arr.push(item)
                }
            })

            let newData = {
                coinCode: data.coinCode,
                current: data.current,
                others: arr
            }

            for (var key in newData.others) {
                if (newData.others[key].coinCode === `${coin}`) {
                    newData.others[key].selected = true
                }
            }
            dispatch(dealCenterCates(newData))
        })
    }
}

// 取消监听
export const offMsgForCates = () => {
    return dispatch => {
        socket.off('quote_center_coins')
        let title = document.querySelector('html head title')
        title.innerText = '12 链-区块链数字资产交易服务提供商'
    }
}

// ---------------首页行情图--------------- //

function receiveRealTimeMarketInfo(data) {
    return {
        type: 'REAL_TIME_DETAILS',
        info: data
    }
}

function receiveRealTimeMarketChart(data) {
    return {
        type: 'REAL_TIME_CHART_INFO',
        chart: data
    }
}

let pre = '2', arr = ['2']
export const requestRealTimeDetails = (dispatch, coin = '2') => {
    return dispatch => {
        //socket 获取第一次数据
        socket.emit('quote', {coinCode: coin, coinId: 2})
        socket.emit("realtime", {coinCode: coin, coinId: 2})

        if (pre !== coin) {
            pre = coin
            if (arr.indexOf(coin) === -1) {
                arr.push(coin)
            }
            arr.forEach(function (coin) {
                socket.off(`quote_${coin}`)
                socket.off(`realtime_${coin}`)
            })
        }
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

// 组件卸载时，取消首页行情图数据监听事件
export const offRealTimeDetails = () => {
    return dispatch => {
        arr.forEach(function (coin) {
            socket.off(`quote_${coin}`)
            socket.off(`realtime_${coin}`)
        })
    }
}


//首页行情图请求charts数据
function getHomeRealTimeChartReturn(info) {
    return {
        type: 'HOME_REAL_TIME_CHARTS_RETURN',
        homeRealTimeCharts: info
    }
}

export const getHomeRealTimeCharts = () => {
    return dispatch => {
        //socket 获取第一次数据
        socket.emit('indexAllCoins', {type: 1})
        socket.on('indexAllCoins', function (data) {
            if(data.type === 1) {
                data.attachment.forEach((item) => {
                    item.update = false
                })
            }
            dispatch(getHomeRealTimeChartReturn(data))
        })
    }
}

export const offHomeRealTimeCharts = () => {
    return dispatch => {
        socket.off('indexAllCoins')
    }
}

// --------------------交易----------------------- //

function receiveDelegateRecord(data) {
    return {
        type: 'TRADING_DELEGATE_RECORD',
        delegateRecord: data
    }
}

// 获取用户委托信息
export const personalDelegateRecord = (dispatch) => {
    const currencyId = sessionStorage.getItem('currencyId') || '2'
    return dispatch => {
        axios.post('/user/showOrderList', qs.stringify({
            status: 0,
            currencyId: currencyId
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    dispatch(receiveDelegateRecord({...res.data.attachment}))
                }
            })
    }
}

function receivePersonalTradingPrice(data) {
    return {
        type: 'REALTIME_PERSONAL_ACCOUNT',
        personalAccount: data
    }
}

// 实时监听用户交易资产
export const lisntenPersonalTradingPrice = () => {
    const token = localStorage.getItem('token')
    const uid = localStorage.getItem('uid')
    const currencyId = sessionStorage.getItem('currencyId') || '2'
    if (!uid && !token) return;
    return dispatch => {
        socket.emit('personal_account_change', {token: token, uid: uid, coinCode: currencyId})
        socket.off(`personal_account_change_${uid}_${currencyId}`)
        socket.on(`personal_account_change_${uid}_${currencyId}`, function (data) {
            dispatch(receivePersonalTradingPrice(data))
        })
    }
}

// 取消监听
export const offPersonalTradingPrice = () => {
    const token = localStorage.getItem('token')
    const uid = localStorage.getItem('uid')
    const currencyId = sessionStorage.getItem('currencyId') || '2'
    return dispatch => {
        socket.off(`personal_account_change_${uid}_${currencyId}`)
    }
}

function receivePersonalTradingPwd(status) {
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
                if (res.data.status === 200) {
                    dispatch(receivePersonalTradingPwd(res.data.attachment.enabled))
                }
            })
    }
}


// 生成委托单 -> 限价买/卖
export const createTradingOrderLimit = (dispatch, info, el1, el2, coinCode, buyOrSellButton, dealPassword) => {
    const token = localStorage.getItem('token')
    const uid = localStorage.getItem('uid')
    return dispatch => {
        axios.post('order/order', qs.stringify({
            ...info
        }))
            .then(function (res) {
                //判断点击的是买还是卖1买2卖
                if (info.buyOrSell === 1) {
                    buyOrSellButton.removeAttribute("disabled", "disabled")
                } else {
                    buyOrSellButton.removeAttribute("disabled", "disabled")
                }
                if (res.data.status !== 200) {
                    return message.error(res.data.message)
                }
                el1.value = ''
                el2.value = ''
                dispatch(customerCoinAccount())
                dispatch(personalDelegateRecord())
                socket.emit('personal_account_change', {token: token, uid: uid, coinCode: coinCode})
                if (!dealPassword) return
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
                if (res.data.status !== 200) {
                    return message.error(res.data.message)
                }
                message.success('撤单成功')
                dispatch(customerCoinAccount())
                dispatch(personalDelegateRecord())
                dispatch({type: 'CLOSE_DELEGATE_PWD_BOX'})
                if (!el) return
                el.value = ''
            })
    }
}


// -------------------委托单详情 delegate details------------------//

// 买
function receiveDelegateDetailsBuy(data) {
    return {
        type: 'DEALCENTER_DELEGATE_DETAILS_BUY',
        detailsBuy: data
    }
}

// 卖
function receiveDelegateDetailsSell(data) {
    return {
        type: 'DEALCENTER_DELEGATE_DETAILS_SELL',
        detailsSell: data
    }
}

// 委托信息 买入/卖出
let delegate = '2', delegateArr = ['2']
export const dealCenterDelegateDetails = (dispatch, coin = '2') => {
    return dispatch => {
        socket.emit('quote_center_buysell', {type: 1, coinCode: coin})
        socket.emit('quote_center_buysell', {type: 2, coinCode: coin})

        if (delegate !== coin) {
            delegate = coin
            if (delegateArr.indexOf(coin) === -1) {
                delegateArr.push(coin)
            }
            delegateArr.forEach(function (coin) {
                socket.off(`quote_center_buysell_${coin}`)
            })
        }

        socket.on(`quote_center_buysell_${coin}`, function (data) {
            let newData = {
                type: data.type,
                records: data.records.slice(0, 20)
            }
            if (data.type === 1) {
                //    最新买入价格
                dispatch({
                    type: 'LASTEST_TRADING_SELL_PRICE',
                    sellPrice: newData.records[0] ? newData.records[0].current : 0
                })

                dispatch({type: 'BUY_DETAILS_FOR_OLD_DEALCENTER', oldBuyRocords: data})
                dispatch(receiveDelegateDetailsBuy(newData))
            } else {
                //    最新卖出价格
                dispatch({
                    type: 'LASTEST_TRADING_BUY_PRICE',
                    buyPrice: newData.records[0] ? newData.records[0].current : 0
                })
                dispatch({type: 'SELL_DETAILS_FOR_OLD_DEALCENTER', oldSellRocords: data})
                newData.records.reverse()
                dispatch(receiveDelegateDetailsSell(newData))
                dispatch({type: 'SELL_PRICE_INIT_FINISH'}) // 家初卖价始化完成
            }
        })
    }
}

// 取消监听
export const offDelegateDetails = () => {
    return dispatch => {
        delegateArr.forEach(function (coin) {
            socket.off(`quote_center_buysell_${coin}`)
        })
    }
}


// 最新成交记录
function receiveLastestTrading(data) {
    return {
        type: 'LASTEST_TRANDING_DATA',
        tradingData: data
    }
}


let trade = '2', tradeArr = ['2']
export const dealCenterLastestTrading = (dispatch, coin = '2') => {
    return dispatch => {
        socket.emit('quote_center_trades', {coinCode: coin})

        if (trade !== coin) {
            trade = coin
            if (tradeArr.indexOf(coin) === -1) {
                tradeArr.push(coin)
            }
            tradeArr.forEach(function (coin) {
                socket.off(`quote_center_trades_${coin}`)
            })
        }

        socket.on(`quote_center_trades_${coin}`, function (data) {
            let msg = {
                data: data,
                coinId: trade
            }
            dispatch(receiveLastestTrading(msg))
        })
    }
}

// 组件卸载的时候取消监听事件
export const dealCenterOffTrading = () => {
    return dispatch => {
        tradeArr.forEach(function (coin) {
            socket.off(`quote_center_trades_${coin}`)
        })
    }
}

//点击委托单的时候把价格带过去

function getDealWaitingBuyPriceInfo(info) {
    return {
        type: 'GET_DEAL_CENTER_ITEM_BUY_PRICE',
        dealBuyPrice: info
    }
}

function getDealWaitingSellPriceInfo(info) {
    return {
        type: 'GET_DEAL_CENTER_ITEM_SELL_PRICE',
        dealSellPrice: info
    }
}

export const getDealWaitingPrice = (dispatch, info) => {
    return dispatch => {
        //点击的买添加到卖，点击卖添加到买
        if (info.type === 1) {
            dispatch(getDealWaitingSellPriceInfo(info))
        } else {
            dispatch(getDealWaitingBuyPriceInfo(info))
        }

    }
}

/*------------------------首页实时行情币种跳转-----------------------*/
function changeRealTimeMartketBack(info) {
    return {
        type: 'CHANGE_REAL_TIME_MARKET_ICON',
        realTimeMartketIcon: info
    }
}

export const changeRealTimeMarketIcon = (dispatch, info) => {
    return dispatch => {
        dispatch(changeRealTimeMartketBack(info))
    }
}

