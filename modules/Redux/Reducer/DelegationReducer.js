import moment from 'moment'
import { getBeforeDate } from '../../../tools/utils'
const dataFormat = 'YYYY-MM-DD'

const init = {
    coinList: [],
    details: {
        data:[],
        isPage:0,
        total:0
    },
    startTime: moment(getBeforeDate(1), dataFormat),
    endTime: moment(getBeforeDate(), dataFormat),
    pwdStatus:'1',
    visible:false,
    currencyId: 2,
    pointPrice: 2,
    pointNum: 4
}

const delegation = (state = init, action) => {
    switch (action.type) {
        case 'DELEGATION_COIN_LIST':
            return {
                ...state,
                coinList: action.coinList
            }
        case 'DELEGATION_DETAILS':
            return {
                ...state,
                ...action.details
            }
        case 'DELEGATION_SHOW_MODAL':
            return {
                ...state,
                visible: true
            }
        case 'DELEGATION_CLOSE_MODAL':
            return {
                ...state,
                visible: false
            }
        case 'PERSONAL_TRADING_PWD_STATUS':
            return {
                ...state,
                pwdStatus: action.pwdStatus
            }
        case 'CHOOSE_ACTIVE_TAB':
            return {
                ...state,
                currencyId: action.id
            }
        case 'SWITCH_CURRENT_COIN_ID':
            return {
                ...state,
                currencyId: action.currencyId
            }
        case 'CHANGE_DELEGATION_STARTTIME':
            return {
                ...state,
                startTime: action.startTime
            }
        case 'CHANGE_DELEGATION_ENDTIME':
            return {
                ...state,
                endTime: action.endTime
            }
        case 'RECEIVE_DELEGATION_PRECISION':
            return {
                ...state,
                ...action.precision
            }

        default:
            return state
    }

}

export default  delegation

