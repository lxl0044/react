// 实名认证action
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

// 在 实名认证 中获取用户信息
function receiveUserInfoInCertification (data) {
    return {
        type: 'CERTIFICATION_RECEIVE_USERINFO',
        data
    }
}
// 在 实名认证 中获取用户信息
export const userInfoInCertification = (dispatch) => {

    return dispatch => {
        axios.post('/user/personalInfo')
            .then(function (res) {
               if(res.data.status === 200) {
                   return dispatch(receiveUserInfoInCertification({ ...res.data.attachment }))
               }
            })
    }
    
}

// 在 实名认证 中查询用户认证信息
function receiveCertificationInfo(data) {
	return {
		type: 'GET_USER_CERTIFICATION',
		data
	}
}

// 在 实名认证 中查询用户认证信息
export const requestCertificationInfo = (dispatch) => {
	return dispatch => {
		axios.post('/user/selectAuthLevel')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(receiveCertificationInfo({ ...res.data.attachment }))
                }
            })
	}
}
// 在 实名认证 中提交初级认证信息
function JuniorAuthStatus (data) {
    return {
        type: 'JUNIOR_AUTH_STATUS',
        data
    }
}
// 在 实名认证 中提交初级认证信息
export const submitJuniorAuth = (dispatch, info) => {
    return dispatch => {
            axios.post('/user/submitJuniorAuth',qs.stringify({
                country: info.country,
                idNumber: info.IDCard,
                name: info.name
            }))
            .then(function (res) {
                if (res.data.status === 4160) {
                    return message.error("您已连续多次认证失败，请联系客服认证")
                } else if(res.data.status === 416) {
                    return dispatch(JuniorAuthStatus({ lose: false }))
                } else if(res.data.status === 200) {
                    message.success("认证成功")
                    dispatch(requestCertificationInfo())
                    dispatch(userInfoInCertification())
                } else {
                    message.error(res.data.message)
                }
            })
    }
}

export const submitSeniorAuth = (dispatch, info) => {
    return dispatch => {
        axios.post('/user/submitSeniorAuth', qs.stringify({
                ...info
            }))
        .then(function (res) {
                if(res.data.status === 200) {
                    message.success('上传成功，请耐心等待审核')
                    dispatch(requestCertificationInfo())
                    dispatch(userInfoInCertification())
                } else if (res.data.status === 500) {
                    message.error('认证失败')
                } else if(res.data.status === 416){
                    message.error(res.data.message)
                } else {
                    message.error(res.data.message)
                }
            })
    }
}

