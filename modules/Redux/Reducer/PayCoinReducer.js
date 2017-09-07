import { getBeforeDate } from '../../../tools/utils'
const dateFormat = 'YYYY-MM-DD';
import moment from 'moment'

const init = {
    payCoinList:[],
    payCoinTableList:{
        data:[],
        isPage:0,
        total:0,
        startTime: moment(getBeforeDate(1), dateFormat),
        endTime: moment(getBeforeDate(), dateFormat),
        status:1
    },
    currencyId: 2,
    selectedCoin: {
        text: '蝶链币/DLC',
        icoUrl: "12ct_logo_small.png"
    }
}







const PayCoin = (state = init, action) => {
    switch(action.type) {
        case 'GET_PAY_COIN_LIST':
            return {
                ...state,
                payCoinList: action.coinList
            }
        case 'GET_PAY_COIN_DATA_LIST':
            return {
                ...state,
                payCoinTableList: action.payCoinTableList
            }
        case 'CHANGE_CURRENCYID_IN_PROPERTY':
            return {
                ...state,
                currencyId: action.currencyId
            }
        case 'SELECTED_COIN_INFO':
            return {
                ...state,
                selectedCoin: action.selectedCoin
            }
        default:
            return state
    }
}

export default PayCoin