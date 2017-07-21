const init = {
    payCoinList:[]
}







const PayCoin = (state = init, action) => {
    switch(action.type) {
        case 'GET_PAY_COIN_LIST':
            return {
                ...state,
                payCoinList: action.coinList
            }
        default:
            return state
    }
}

export default PayCoin