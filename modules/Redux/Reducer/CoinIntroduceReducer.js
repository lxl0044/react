const init = {
    details: {
        current: {
            quote: {

            },
            realtime: []
        },
        others: []
    },
    info: {

    }
}

export default (state = init, action) => {
    switch (action.type) {
        case 'COIN_INTRODUCE_INFO':
            return {
                ...state,
                details: action.details
            }
        case 'QUERY_COIN_INFO':
            return {
                ...state,
                info: action.info
            }
        default :
            return state
    }
}