import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'
import { requestUserInfo } from './CommonAction'

function receiveUserInfoInSecurityCenter (data) {
	return {
		type: 'SECURITYCENTER_RECEIVE_USERINFO',
		data
	}
}
// 获取用户信息(个人中心)
export const userInfoInSecurityCenter = (dispatch) => {
	return dispatch => {
		axios.post('/user/personalInfo')
            .then(function (res) {
               if(res.data.status === 200) {
                   return dispatch(receiveUserInfoInSecurityCenter({ ...res.data.attachment }))
               }
            })
	}
	
}

// 修改用户名
export const resetUname = (dispatch, uname) => {
	return dispatch => {
		axios.post('/user/reName',qs.stringify({
                newName: uname
            }))
            .then(function (res) {
                if (res.data.status === 200) {
                    dispatch(userInfoInSecurityCenter())
                    dispatch(requestUserInfo())
                    dispatch({type: 'FINISH_RESET_UNAME'})
                } else {
                    dispatch({type: 'START_RESET_UNAME'})
                    message.error(res.data.message)
                }

            })
	}
}
//开关控制是否禁用输入交易密码
function closePwdEnabled(jyPwdEnabled) {
    return {
        type:'RES_JYCODE_BUTTON',
        jyPwdEnabled:jyPwdEnabled === "1" ? true :false
    }
}
export const isResPwdWord = (dispatch) => {
    return dispatch => {
        axios.post('/user/selectFdPwdEnabled')
            .then(function (res) {
                let open = res.data.attachment.enabled
                if (res.data.status === 200) {
                    return dispatch(closePwdEnabled(open))
                }
            }.bind(this))
    }
}

