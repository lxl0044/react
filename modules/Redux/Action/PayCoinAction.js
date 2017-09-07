import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
const dateFormat = 'YYYY-MM-DD';
import { getBeforeDate } from '../../../tools/utils'

function getCoinList (list) {
    return {
        type: 'GET_PAY_COIN_LIST',
        coinList: list
    }
}

// 获取委托管理币种列表
export const PayCoinList = (dispatch, id) => {
    return dispatch => {
        axios.post('/coin/coins')
            .then(function (res) {
                let data = res.data.attachment
                if (res.data.status === 200) {
                    for(var key in data) {
                        if(data[key].currencyId === parseInt(id)) {
                            data[key].selected = 1
                            dispatch({type: 'SELECTED_COIN_INFO', selectedCoin: { text: `${data[key].currencyName}/${data[key].currencyNameEn}`, icoUrl: data[key].icoUrl }})
                        }
                    }
                    return dispatch(getCoinList(data))
                }
            })
    }
}
//--------------------提币记录---------------------//
function PayCoinTableList(CNYRecordTable) {
    return {
        type: 'GET_PAY_COIN_DATA_LIST',
        payCoinTableList: CNYRecordTable
    }
}
let prev = 2
export const PayCoinTable = (dispatch, info) => {
    return dispatch => {
        axios.post('/coin/selectListByUuid', qs.stringify({
            ...info
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                        let startTime,endTime
                        if (prev === info.currencyId) {
                            startTime = moment(info.beginTime, dateFormat)
                            endTime = moment(info.endTime, dateFormat)
                        } else {
                            prev = info.currencyId
                            startTime = moment(getBeforeDate(1), dateFormat)
                            endTime = moment(getBeforeDate(), dateFormat)
                        }
                        //判断返回的数据的条数
                        return dispatch(PayCoinTableList({
                            isPage: res.data.attachment.points.length,
                            total:res.data.attachment.total,
                            data: res.data.attachment.points,
                            startTime:startTime,
                            endTime:endTime,
                            status:info.status
                        }))
                }
            })
    }
}