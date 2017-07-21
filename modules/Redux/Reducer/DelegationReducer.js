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
    visible:false
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
                details: action.details
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
        default:
            return state
    }

}

export default  delegation

