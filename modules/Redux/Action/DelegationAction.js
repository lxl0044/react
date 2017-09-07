import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import moment from 'moment'
import {getBeforeDate} from '../../../tools/utils'

const dataFormat = 'YYYY-MM-DD'


function receiveCoinList(list) {
    return {
        type: 'DELEGATION_COIN_LIST',
        coinList: list
    }
}

function receivePrecision (precision) {
    return {
        type: 'RECEIVE_DELEGATION_PRECISION',
        precision
    }
}

// 获取委托管理币种列表
export const delegationCoinList = (dispatch, key) => {
    return dispatch => {
        axios.post('/coin/coins')
            .then(function (res) {
                if (res.data.status === 200) {
                    let lists = res.data.attachment
                    let precision
                    lists.forEach(function (item) {
                        if(parseInt(item.currencyId) === parseInt(key)) {
                            precision = {
                                pointPrice: item.pointPrice,
                                pointNum: item.pointNum
                            }
                            return
                        }
                    })
                    dispatch(receiveCoinList(lists))
                    dispatch(receivePrecision(precision))
                }
            })
    }
}


function receiveDelegationDetails(details) {
    return {
        type: 'DELEGATION_DETAILS',
        details: details
    }
}


// 委托管理 -> 委托单详细信息
let prev = 2
export const delegationDetails = (dispatch, info) => {
    let data = info
    return dispatch => {
        axios.post('/user/trOrderListByCustomer', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    let start, end
                    if(prev === data.currencyId) {
                        start = moment(data.beginTime, dataFormat)
                        end = moment(data.endTime, dataFormat)
                    } else {
                        prev = data.currencyId
                        start = moment(getBeforeDate(1), dataFormat)
                        end = moment(getBeforeDate(), dataFormat)
                    }
                    let info = {
                        details: {
                            isPage: res.data.attachment.list.length,
                            total: res.data.attachment.total,
                            data: res.data.attachment.list
                        },
                        startTime: start,
                        endTime: end
                    }

                    return dispatch(receiveDelegationDetails(info))
                }
            })
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

//委托管理的撤单
export const repealBillOne = (dispatch, info, nowDay3, nowDay4, page, currencyId, size, buyOrSell, status, type) => {
    return dispatch => {
        axios.post('/order/cancel', qs.stringify({
            ...info
        }))
            .then(function (res) {
                let num = {
                    beginTime: nowDay3,
                    endTime: nowDay4,
                    start: page,
                    size: size,
                    buyOrSell: buyOrSell,//不限0买入1卖出2
                    currencyId: currencyId,//币种
                    status: status,//10全部,0未成交,1部分成交,2全部成交,3委托失败,4全部撤单,5部分成交后撤单,
                    type: type//限价1市价2
                }
                if (res.data.status === 200) {
                    message.success("撤单成功")
                    dispatch(delegationDetails(dispatch, num))
                    dispatch({type: 'DELEGATION_CLOSE_MODAL'})
                } else {
                    message.error(res.data.message)
                }
            })
    }
}

export const switchCurrencyId = (dispatch, currencyId) => {
    return dispatch => {
        dispatch({type: 'SWITCH_CURRENT_COIN_ID', currencyId: parseInt(currencyId)})
    }
}







