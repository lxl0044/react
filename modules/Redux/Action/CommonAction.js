import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
import {push} from 'react-router-redux'

import voteList0 from '../../../images/voteCoin1.png'
import voteList1 from '../../../images/voteCoin2.png'
import voteList2 from '../../../images/voteCoin3.png'
import voteList3 from '../../../images/voteCoin4.png'
import voteList4 from '../../../images/voteCoin5.png'
import voteList5 from '../../../images/voteCoin6.png'
import voteList6 from '../../../images/voteCoin7.png'
import voteList7 from '../../../images/voteCoin8.png'
import voteList8 from '../../../images/voteCoin9.png'
import voteList9 from '../../../images/voteCoin10.png'


/*---------------------------*/
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
                history.back()
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
//----------------------首页投票列表----------------------
const voteList = [{
    url:voteList9,
},{
    url:voteList8,
},{
    url:voteList7,
},{
    url:voteList6,
},{
    url:voteList5,
},{
    url:voteList4,
},{
    url:voteList3,
},{
    url:voteList2,
},{
    url:voteList1,
},{
    url:voteList0,
}]

function CoinVoteLists (data) {
    return {
        type: 'COIN_VOTE_LIST',
        CoinVoteList: data
    }
}

export const CoinVoteList = (dispatch) => {
    return dispatch => {
        axios.post('/vote/list')
            .then(function (res) {
                if(res.data.status === 200) {
                    let data = res.data.attachment
                    data.list.forEach(function (item,index) {
                        item.url = voteList[index].url
                    })
                    dispatch(CoinVoteLists(data))
                }
            })
    }
}
//----------------------首页投票----------------------

export const SupportCoinVote = (dispatch,info,btn) => {
    return dispatch => {
        axios.post('/vote/vote',qs.stringify({
            ...info
        }))
            .then(function (res) {
                if(res.data.status === 200) {
                    btn.style.backgroundColor = "#ccc"
                    btn.setAttribute('disabled', 'disabled')
                    dispatch(CoinVoteList(dispatch))
                }else{
                    message.error(res.data.message)
                }
            })
    }
}




