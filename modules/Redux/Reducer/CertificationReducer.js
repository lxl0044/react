// 实名认证\
let init = {
    lose: true,
    showInfo: true,
    authFailReason: ''
}

const CertificationInfo = (state = init, action) => {
    switch (action.type) {
        case 'CERTIFICATION_RECEIVE_USERINFO':
            return {
                ...state,
                ...action.data
            }
        case 'GET_USER_CERTIFICATION':
            let status = !action.data.isAuthSenior ? true : false
            return {
            	...state, 
            	...action.data,
                showInfo: status
            }
        case 'JUNIOR_AUTH_STATUS':
            return {
            	...state,
            	...action.data
            }
        case 'CHANGE_CERTIFICATION_SHOWINFO':
            return {
                ...state, 
                ...action.data,
                showInfo: true
            }
        default:
            return state
    }
}

export default CertificationInfo
