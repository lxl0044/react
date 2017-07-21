import axios from 'axios'
import qs from 'qs'


function getWithDrawCoinList (list) {
    return {
        type: 'GET_WITHDRAW_COIN_LIST',
        coinList: list
    }
}

// 获取委托管理币种列表
export const WithDrawCoinList = (dispatch) => {
    return dispatch => {
        axios.post('/coin/coins')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(getWithDrawCoinList(res.data.attachment))
                }
            })
    }
}