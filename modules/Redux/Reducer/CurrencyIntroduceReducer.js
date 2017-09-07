const init = {
    coinIntroduce:0
}


const CurrencyIntroduce = (common = init, action) => {
    switch (action.type) {
        case 'CHANGE_COIN_INFO_INTRODUCE':
            return {
                ...common,
                coinIntroduce:action.coinIntroduce
            }
        default:
            return common
    }
}

export default CurrencyIntroduce
