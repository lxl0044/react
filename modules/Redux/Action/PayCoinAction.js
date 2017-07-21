import axios from 'axios'
import qs from 'qs'


function getCoinList (list) {
    return {
        type: 'GET_PAY_COIN_LIST',
        coinList: list
    }
}

// 获取委托管理币种列表
export const PayCoinList = (dispatch) => {
    return dispatch => {
        axios.post('/coin/coins')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(getCoinList(res.data.attachment))
                }
            })
    }
}