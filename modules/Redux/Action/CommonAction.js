import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import {push} from 'react-router-redux'

function receiveCaptcha(data) {
    return {
        type: 'GET_IMG_CAPTCHA',
        data
    }
}

// 获取图片验证码
export const getCaptcha = (dispatch) => {
    return dispatch => {
        return axios.post('/user/getimg')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(receiveCaptcha({...res.data.attachment}))
                }
            })
    }
}

// 用户登录
function userLoginErrorInfo(data) {
    return {
        type: 'LOGIN_ERROR_INFO',
        errorInfo:data
    }
}
export const userLogin = (dispatch, info) => {
    return dispatch => {
        return axios.post('/user/login', qs.stringify({
                uname: info.uname,
                pwd: info.pwd,
                vercode: info.captcha,
                source: 1,
                codeid: info.codeid
            })
        ).then(function (res) {
            let data = res.data.attachment;
            if (res.data.status === 200) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('uid', data.uid)
                dispatch(push('/home'))
                dispatch(requestUserInfo())
                dispatch(customerCoinAccount())
            } else {
                info.el.value = ''
                dispatch(getCaptcha())
                dispatch(userLoginErrorInfo("*" + res.data.message))
            }
        })
    }
}

function receiveUserInfo(data) {
    return {
        type: 'HEADER_RECEIVE_USERINFO',
        userInfo: data
    }
}

// 获取用户信息（header组件）
export const requestUserInfo = (dispatch) => {
    return dispatch => {
        return axios.post('/user/getScores')
            .then(res => {
                if (res.data.status === 200) {
                    return dispatch(receiveUserInfo({...res.data.attachment}))
                }
            })
    }
}

function receiveCoinAccount(info) {
    return {
        type: 'CUSTOMER_COIN_ACCOUNT',
        coinAccount: info
    }
}

// 获取用户资产详情
export const customerCoinAccount = (dispatch) => {
    return dispatch => {
        axios.post('/coin/customerCoinAccount')
            .then(function (res) {
                if (res.data.status === 200) {
                    let info = {
                        data: res.data.attachment.coinList,
                        allMoney: res.data.attachment.allMoney
                    }

                    dispatch(receiveCoinAccount(info))
                }
            })
    }
}

// 退出
export const userLogout = (dispatch) => {
    return dispatch => {
        return axios.post('/user/logout')
            .then(function () {
                localStorage.removeItem('token')
                localStorage.removeItem('uid')
                message.success("您已成功退出")
                dispatch(push('/home'))
            })
    }
}

function receiveTotalUser(data) {
    return {
        type: 'FOOTER_RECEIVE_TOTALUSER',
        total: data
    }
}

// 获取注册总人数
export const getTotalUser = (dispatch) => {
    return dispatch => {
        axios.post('/user/totalUsers')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(receiveTotalUser(res.data.attachment))
                }
            })
    }
}


function receiveRealTimeMarketCates(cates) {
    return {
        type: 'REAL_TIME_CATES',
        cates: cates
    }
}


// 获取首页行情图类别

export const realTimeMarketCates = (dispatch) => {
    return dispatch => {
        axios.post('/coin/coins')
            .then(function (res) {
                if (res.data.status === 200) {
                    return dispatch(receiveRealTimeMarketCates(res.data.attachment))
                }
            })
    }
}

function receiveAnnouncement (data) {
    return {
        type: 'SYSTEM_ANNOUNCEMENT',
        announcementList: data
    }
}

export const getAnnouncement = (num) => {
    return dispatch => {
        axios.post('/announce/list', qs.stringify({num: num}))
            .then(function (res) {
                if(res.data.status === 200) {
                    dispatch(receiveAnnouncement(res.data.attachment))
                }
            })
    }
}




