const init = {
    withDrawCoinList:[]
}







const WithDrawCoin = (state = init, action) => {
    switch(action.type) {
        case 'GET_WITHDRAW_COIN_LIST':
            return {
                ...state,
                withDrawCoinList: action.coinList
            }
        default:
            return state
    }
}

export default WithDrawCoin