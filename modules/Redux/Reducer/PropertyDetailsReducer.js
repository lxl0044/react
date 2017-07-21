
const init = {
    allMoney:{
        data:[],
        allMoney:''
    }
}







const PropertyDetails = (state = init, action) => {
    switch(action.type) {
        case 'GET_PROPERTY_DETAILS_MONEY':
            return {
                ...state,
                allMoney: action.list
            }
        default:
            return state
    }
}

export default PropertyDetails