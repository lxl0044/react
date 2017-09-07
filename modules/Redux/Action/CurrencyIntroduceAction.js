
/*
*
*
* footer币种信息,介绍
* */


function changeCoinInfoIntroduceReturn (num) {
    return {
        type: 'CHANGE_COIN_INFO_INTRODUCE',
        coinIntroduce: num
    }
}

export const changeCoinInfoIntroduce = (dispatch, number) => {
    return dispatch => {
        dispatch(changeCoinInfoIntroduceReturn(number))
    }
}