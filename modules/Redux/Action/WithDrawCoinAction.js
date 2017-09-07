import axios from 'axios'
import qs from 'qs'


function getWithDrawCoinList (list) {
    return {
        type: 'GET_WITHDRAW_COIN_LIST',
        coinList: list
    }
}

// 获取委托管理币种列表
export const WithDrawCoinList = (dispatch, id) => {
    return dispatch => {
        axios.post('/coin/coins')
            .then(function (res) {
                let data = res.data.attachment
                if (res.data.status === 200) {
                    for(var key in data) {
                        if(data[key].currencyId == id) {
                            data[key].selected = 1
                            dispatch({type: 'SELECTED_COIN_INFO', selectedCoin: { text: `${data[key].currencyName}/${data[key].currencyNameEn}`, icoUrl: data[key].icoUrl }})
                        }
                    }
                    return dispatch(getWithDrawCoinList(data))
                }
            })
    }
}


// 获取提币的各个input输入框的节点
export const WithDrawDOM = (dispatch,moneyCT,dealPassword,yzCode,phoneM) => {
    return dispatch => {
        moneyCT.value = ''
        dealPassword.value = ''
        yzCode.value = ''
        phoneM.value = ''
    }
}

