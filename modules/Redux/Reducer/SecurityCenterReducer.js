const initInfo = {
    address: {
        city: "",
        country: "",
        isDefault: "",
        location: "",
        name: "",
        phone: "",
        postCode: "",
        town: "",
        uaid: ""
    },
    change: true,
    jyPwdEnabled:false,
    score: 0,
    invite: {
        count: 0,
        inviteId: '',
        ratio: 0,
        baseImg:'',
        unameList:[]
    }
}

const userInfoDetails = (userInfo = initInfo, action) => {
    switch (action.type) {
        case 'SECURITYCENTER_RECEIVE_USERINFO':
            return {
                ...userInfo,
                ...action.data
            }
        case 'SECURITYCENTER_RESET_UNAME':
        	return {
                ...userInfo,
        	    ...action.data
        	}
        case 'START_RESET_UNAME':
            return { 
                ...userInfo,
                change: false 
            }
        case 'CLOSE_RESET_UNAME':
            return { 
                ...userInfo,
                change: true 
            }
        case 'FINISH_RESET_UNAME':
            return { 
                ...userInfo,
                change: true 
            }
        case 'RES_JYCODE_BUTTON':
            return {
                ...userInfo,
                jyPwdEnabled:action.jyPwdEnabled
            }
        case 'USER_INVITE_DETAILS':
            return {
                ...userInfo,
                invite: action.invite
            }
        default:
            return userInfo
    }
}

export default userInfoDetails

