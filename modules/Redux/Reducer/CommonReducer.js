const init = {
    IMGCode: '',
    codeUUID: '',
    value: '',
    uname: '',
    notice: '',
    coinAccount: {
        data: [{
            amount: '',
            cashAmount: '',
            currencyName: '',
            currencyNameEn: '',
            freezeAmount: 0,
        }],
        allMoney: ''
    },
    lists: [],
    total: 0,
    errorInfo:'',
    announcementList: [],
    CoinVoteList:{
        list:[],
        votedCount:0
    }
}


const homePage = (common = init, action) => {
    switch (action.type) {
        case 'GET_IMG_CAPTCHA':
            return {
                ...common,
                ...action.data
            }
        case 'HEADER_RECEIVE_USERINFO':
            return {
                ...common,
                ...action.userInfo
            }
        case 'FOOTER_RECEIVE_TOTALUSER':
            return {
                ...common,
                total: action.total
            }
        case 'CUSTOMER_COIN_ACCOUNT':
            return {
                ...common,
                coinAccount: action.coinAccount
            }
        //登陆的时候返回错误信息，不要弹框提示
        case 'LOGIN_ERROR_INFO':
            return {
                ...common,
                errorInfo: action.errorInfo
            }
        case 'SYSTEM_ANNOUNCEMENT':
            return {
                ...common,
                announcementList: action.announcementList
            }
        //币种投票
        case 'COIN_VOTE_LIST':
            return {
                ...common,
                CoinVoteList: action.CoinVoteList
            }
        default:
            return common
    }
}

export default homePage
