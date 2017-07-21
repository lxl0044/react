import axios from 'axios'
import qs from 'qs'


function getPropertyDetailsMoney (allMoney) {
    return {
        type: 'GET_PROPERTY_DETAILS_MONEY',
        list:allMoney
    }
}
// 获取用户信息(个人中心)
export const getPropertyDetails = (dispatch) => {
    return dispatch => {
        axios.post('/coin/customerCoinAccount')
            .then(function (res) {
                if(res.data.status === 200) {
                    return dispatch(getPropertyDetailsMoney({
                        data: res.data.attachment.coinList,
                        allMoney: res.data.attachment.allMoney
                    }))
                }
            })
    }

}