import axios from 'axios'
import qs from 'qs'
import {message} from 'antd';
import moment from 'moment'
const dateFormat = 'YYYY-MM-DD';
import {getBeforeDate} from '../../../tools/utils'


// 站内转币的币种信息---------------------------------
function InstationTrunCoinReturn (info) {
    return {
        type: 'RETURN_STATION_COIN_INFO',
        InstationTrunCoinInfo: info
    }
}


export const InstationTrunCoinInfo = (dispatch,info) => {
    return dispatch => {
        axios.post('/authConfig', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(InstationTrunCoinReturn({...res.data}))
                }
            })
    }
}

//确认转出币种 -------------------------------------
export const sureInstationTrunCoinInfo = (dispatch,info,btn,uid,uname,dealCode,imgCode,phoneCode,turnCoin) => {
    return dispatch => {
        axios.post('/transferCoin', qs.stringify({
            ...info
        }))
            .then(function (res) {
                btn.removeAttribute('disabled', 'disabled')
                let parmas = {
                    currencyId: info.currencyId,
                    actionId:7
                }
                let list = {
                    createTimeBegin:getBeforeDate(1),
                    createTimeEnd:getBeforeDate(),
                    size:10,
                    start:1,
                    currencyId:info.currencyId,
                    type:1
                }
                // return false
                if (res.data.status === 200) {
                    message.success("转出成功")
                    //成功转币清空
                    uid.value = '';
                    uname.value = '';
                    dealCode.value = '';
                    imgCode.value = '';
                    phoneCode.value = '';
                    turnCoin.value = '';
                    //设置默认标签分页的默认值
                    dispatch(InstationTabKey(1))
                    //200重新调取币种信息
                    dispatch(InstationTrunCoinInfo(dispatch,parmas))
                    //200重新调取币种列表
                    dispatch(sureInstationTrunCoinList(dispatch,list))
                } else {
                    message.error(res.data.message)
                }
            })
    }
}
//确认转出币种列表 -------------------------------------

function InstationTrunCoinList(info) {
    return {
        type: 'IN_STATION_TRUN_COIN_LIST',
        InstationTrunCoinList: info
    }
}
let prev = 2
export const sureInstationTrunCoinList = (dispatch,info) => {
    return dispatch => {
        axios.post('/transferCoinList', qs.stringify({
            ...info
        }))
            .then(function (res) {
                let startTime,endTime
                if (prev === info.currentyId) {
                    startTime = moment(info.createTimeBegin, dateFormat)
                    endTime = moment(info.createTimeEnd, dateFormat)
                } else {
                    prev = info.currentyId
                    startTime = moment(getBeforeDate(1), dateFormat)
                    endTime = moment(getBeforeDate(), dateFormat)
                }
                if (res.data.status === 200) {
                    //判断返回的数据的条数
                    return dispatch(InstationTrunCoinList({
                        isPage: res.data.attachment.list.length,
                        total:res.data.attachment.total,
                        data: res.data.attachment.list,
                        startTime:startTime,
                        endTime:endTime
                    }))
                } else {
                    message.error(res.data.message)
                }
            })
    }
}
//coinCoins列表
function turnCoinCoinsList (list) {
    return {
        type: 'TURN_COIN_COINS_LIST',
        coinList: list
    }
}
export const InstationTurnCoinCoinsList = (dispatch,id) => {
    return dispatch => {
        axios.post('/coin/coins')
            .then(function (res) {
                let data = res.data.attachment
                    for(var key in data) {
                        if(data[key].currencyId == id) {
                            dispatch({type:'SELECTED_TURN_COIN_INFO', selectedCoin: { text: `${data[key].currencyName}/${data[key].currencyNameEn}`, iconUrl: data[key].icoUrl }})
                        }
                    }
                    return dispatch(turnCoinCoinsList(data))
            })
    }
}
//设置默认标签分页的默认值
function InstationTabKey (key) {
    return {
        type: 'RES_TAB_DEFAULT_KEY',
        defaultActiveKey: key
    }
}
export const resInstationTabKey = (key) => {
    return dispatch => {
        return dispatch(InstationTabKey(key))
    }
}
//站内转币的默认地址







