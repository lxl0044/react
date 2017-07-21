
const init = {
    userInfo: {
        uname: '',
        name: '',
        phone: ''
    },
    coinInfo: {
        resp: {
            addressList: [{
                address: ''
            }],
            cashAmount: '',
            fee: 0
        },
        detail: {
            amountLowLimit: 0
        }
    },
    alert: true,
    sum: 0,
    cnyBalance:0,
    CNYRecordTable:{
        data:[],
        isPage:0,
        total:0
    },
    CTRecordTable:{
        data:[],
        isPage:0,
        total:0
    },
    money:0
}


const WithDraw = (state = init, action) => {
    switch (action.type) {
        case 'USERINFO_IN_WithDraw':
            return {
                ...state,
                userInfo: action.userInfo
            }
        case 'WITHDRAW_GET_COIN_INFO':
            return {
                ...state,
                coinInfo: action.coinInfo
            }
        case 'ADD_COIN_STATUS':
            return {
                ...state,
                ...action.status
            }
        case 'OPEN_ADD_ADDRESS':
            return {
                ...state,
                alert: false
            }
        case 'CLOSE_ADD_ADDRESS':
            return {
                ...state,
                alert: true
            }
        case 'RES_STATE_CNY_SUM':
            return {
                ...state,
                sum: action.sum
            }
        case 'GET_CNY_BALANCE':
            return {
                ...state,
                cnyBalance: action.cnyBalance
            }
        case 'GET_CNY_RECORD':
            return {
                ...state,
                CNYRecordTable: action.CNYRecordTable
            }
        case 'GET_CT_RECORD':
            return {
                ...state,
                CTRecordTable: action.CTRecordTable
            }
        case 'RES_STATE_CT_MONEY':
            return {
                ...state,
                money: action.money
            }
        default:
            return state
    }
}

export default WithDraw