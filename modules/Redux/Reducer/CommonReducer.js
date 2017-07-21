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
    spread: true,
    errorInfo:'',
    announcementList: []
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
        case 'REAL_TIME_CATES':
            return {
                ...common,
                lists: action.cates
            }
        // ------- k线图右侧spread------//
        case 'CHANGE_CATES_SPREAD':
            return {
                ...common,
                spread: !common.spread
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
        default:
            return common
    }
}

export default homePage
