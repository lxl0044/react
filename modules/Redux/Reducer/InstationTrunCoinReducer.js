import moment from 'moment'
import { getBeforeDate } from '../../../tools/utils'
const dateFormat = 'YYYY-MM-DD'

const init = {
    InstationTrunCoinInfo:{
        attachment:{
            feeType:0,
            currencyId:2
        },
        cashAmount:0,
        currency:{}
    },
    InstationTrunCoinList:{
        data:[],
        isPage:0,
        total:0,
        startTime: moment(getBeforeDate(1), dateFormat),
        endTime: moment(getBeforeDate(), dateFormat)
    },
    sureCoinCoinsList:[],
    defaultKey:1,
    selectTurnCoinCoinsList : {
        text: '蝶链币/DLC',
        iconUrl: "12ct_logo_small.png"
    }
}

const InstationTrunCoin = (state = init, action) => {
    switch (action.type) {
        case 'RETURN_STATION_COIN_INFO':
            return {
                ...state,
                InstationTrunCoinInfo: action.InstationTrunCoinInfo
            }
        case 'IN_STATION_TRUN_COIN_LIST':
            return {
                ...state,
                InstationTrunCoinList: action.InstationTrunCoinList
            }
        case 'TURN_COIN_COINS_LIST':
            return {
                ...state,
                sureCoinCoinsList: action.coinList
            }
        case 'RES_TAB_DEFAULT_KEY':
            return {
                ...state,
                defaultKey: action.defaultActiveKey
            }
        case 'SELECTED_TURN_COIN_INFO':
            return {
                ...state,
                selectTurnCoinCoinsList: action.selectedCoin
            }
        default:
            return state
    }

}

export default  InstationTrunCoin

