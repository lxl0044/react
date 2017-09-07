import axios from 'axios'
import qs from 'qs'

let coin = '2'
export const getIntroCoin = (dispatch, coinCode) => {
    if (coinCode && coinCode !== coin) {
        coin = coinCode
    }

    return dispatch => {
        axios.post('/quote/coinIntro', qs.stringify({
                coinCode: coin
            })
        )
            .then((res) => {
                if (res.data.status === 200) {
                    let data = res.data.attachment
                    dispatch({type: 'COIN_INTRODUCE_INFO', details: data})
                }
            })
    }
}

let  queryId = 2
export const queryCoinInfo = (dispatch, coinCode) => {
    if(coinCode && parseInt(coinCode) !== queryId) {
        queryId = coinCode
    }

    return dispatch => {
        axios.post('/presentation/detail', qs.stringify({
            idType: 'currency',
            id: queryId
        }))
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({type: 'QUERY_COIN_INFO', info: res.data.attachment})
                }
            })
    }
}