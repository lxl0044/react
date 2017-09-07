import React from 'react'
import TopTitle from '../../Common/TopTitle';
import '../../../css/instationtruncoin.css'
import {message, Icon} from 'antd';
import {connect} from 'react-redux'
import {
    InstationTrunCoinInfo,
    sureInstationTrunCoinInfo,
    sureInstationTrunCoinList,
    InstationTurnCoinCoinsList,
    resInstationTabKey
} from '../../Redux/Action/InstationTrunCoinAction'
import {getCaptcha} from '../../Redux/Action/CommonAction'
import {userInfoInSecurityCenter} from '../../Redux/Action/SecurityCenterAction'
import axios from 'axios'
import qs from 'qs'
import {formatNumber, getBeforeDate} from '../../../tools/utils'
import InstationTrunCoinTabs from './InstationTrunCoinTable/InstationTrunCoinTabs'
import {Link} from 'react-router'
import {img} from './../../host'

var md5 = require('./../../../tools/MD5.js')

const base = 'data:image/png;base64,'
let timer = null;
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";

class InstationTrunCoin extends React.Component {
    state = {
        captcha: '',
        codeUUID: '',
        sumCoin: 0,//转出手续费
        numCoin: 0,//实际到账
        turnCoin: '',//转出币的数量
        hintText: '',//提示信息
        more:true//更多
    }

    changeCoinFunc(currencyId) {
        let send = this.refs.send
        let uid = this.refs.uid
        let uname = this.refs.uname
        let dealCode = this.refs.dealCode
        let turnCoin = this.refs.turnCoin
        let imgCode = this.refs.imgCode
        let phoneCode = this.refs.phoneCode
        let more = this.refs.more
        const {dispatch} = this.props
        let info = {
            currencyId: currencyId,
            actionId: 7
        }
        let list = {
            createTimeBegin: getBeforeDate(1),
            createTimeEnd: getBeforeDate(),
            size: 10,
            start: 1,
            currencyId: currencyId
        }
        //清楚定时器
        clearInterval(timer)
        send.style.color = '#0397f7'
        send.removeAttribute('disabled', 'disabled')
        send.innerText = "获取验证码"
        //每次切换币种清空
        uid.value = '';
        uname.value = '';
        dealCode.value = '';
        imgCode.value = '';
        phoneCode.value = '';
        turnCoin.value = '';
        this.setState({
            turnCoin: '',
            sumCoin: 0,
            numCoin: 0,
            more:true
        })
        this.getCaptcha()
        dispatch(getCaptcha())
        dispatch(resInstationTabKey(1))
        dispatch(InstationTrunCoinInfo(dispatch, info))
        dispatch(sureInstationTrunCoinList(dispatch, list))
        dispatch(InstationTurnCoinCoinsList(dispatch,currencyId))
        //点击切换币种的时候
        more.style.height = "86px"
    }

    // 获取验证码
    getCaptcha() {
        axios.post('user/getimg')
            .then(function (res) {
                this.setState({
                    captcha: base + res.data.attachment.IMGCode,
                    codeUUID: res.data.attachment.codeUUID
                })
            }.bind(this))
    }

    //转出数量
    changeTurnCoin(e) {
        const {fee} = this.props.InstationTrunCoinInfo.attachment
        const {cashAmount} = this.props.InstationTrunCoinInfo
        const {amountLowLimit, amountHighLimit} = this.props.InstationTrunCoinInfo.attachment
        if (e.target.value > cashAmount) {
            this.setState({
                hintText: '超出账户余额'
            })
        } else if (e.target.value < 0) {
            this.setState({
                hintText: '输入数量不能小于0'
            })
        } else if (e.target.value < amountLowLimit) {
            this.setState({
                hintText: '不能小于' + amountLowLimit
            })
        } else if (e.target.value > amountHighLimit) {
            this.setState({
                hintText: '不能大于' + amountHighLimit
            })
        } else {
            this.setState({
                hintText: ''
            })
        }
        this.setState({
            turnCoin: e.target.value,
            sumCoin: e.target.value * fee,
            numCoin: e.target.value - e.target.value * fee
        })

    }

    //确认转出数量
    sureTurnCoin() {
        const {currencyId} = this.props.InstationTrunCoinInfo.attachment
        let uid = localStorage.getItem("uid")
        let toCustomerUid = this.refs.uid.value.trim()
        let uname = this.refs.uname.value.trim()
        let dealCode = md5(this.refs.dealCode.value.trim() + dealSalt + uid)
        let phoneCode = this.refs.phoneCode.value.trim()
        let btn = this.refs.btn
        const {dispatch} = this.props
        if (!toCustomerUid) return message.error("请输入接收用户UID")
        if (!uname) return message.error("请输入接收用户昵称")
        if (!this.state.turnCoin) return message.error("请输入转出数量")
        if (!!this.state.hintText) return false
        if (!this.refs.dealCode.value.trim()) return message.error("请输入交易密码")
        if (!phoneCode) return message.error("请输入短信验证码")

        //确认转出
        let info = {
            actionId: 7,
            amount: this.state.turnCoin,
            currencyId: currencyId,
            smsMessage: phoneCode,
            toCustomerUid: toCustomerUid,
            tradePassword: dealCode,
            uname: uname
        }
        //发送请求的时候禁用按钮
        btn.setAttribute('disabled', 'disabled')
        dispatch(sureInstationTrunCoinInfo(dispatch, info, btn, this.refs.uid, this.refs.uname, this.refs.dealCode, this.refs.turnCoin, this.refs.imgCode, this.refs.phoneCode))
    }

    //发送验证码
    sendCode() {
        let uid = this.refs.uid.value.trim()
        let uname = this.refs.uname.value.trim()
        let dealCode = this.refs.dealCode.value.trim()
        let imgCode = this.refs.imgCode.value.trim()
        let codeUUID = this.state.codeUUID
        let send = this.refs.send
        let time = 60
        if (!uid) return message.error("请输入接收用户UID")
        if (!uname) return message.error("请输入接收用户昵称")
        if (!this.state.turnCoin) return message.error("请输入转出数量")
        if (!dealCode) return message.error("请输入交易密码")
        if (!imgCode) return message.error("请输入图片验证码")

        axios.post('/coin/sendSms', qs.stringify({
            vercode: imgCode,
            codeid: codeUUID
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    send.setAttribute('disabled', 'disabled')
                    send.style.color = '#ccc';
                    timer = setInterval(function () {
                        time--
                        if (time < 0) {
                            clearInterval(timer)
                            send.removeAttribute('disabled', 'disabled')
                            send.style.color = '#0397f7'
                            send.innerText = "获取验证码"
                        } else {
                            send.innerText = "重新发送（" + time + "s）"
                        }
                    }, 1000)
                }
                if (res.data.status === 412) {
                    send.style.color = '#0397f7'
                    clearInterval(timer)
                    send.removeAttribute('disabled', 'disabled')
                    send.innerText = "获取验证码"
                    message.error("图片验证码错误")
                }
            }.bind(this))

    }

    //点击图片更换验证码
    changeImgCode() {
        this.getCaptcha()
    }

    componentDidMount() {
        const {currencyId} = this.props.InstationTrunCoinInfo.attachment
        this.getCaptcha()
        const {dispatch} = this.props
        let info = {
            currencyId: currencyId,
            actionId: 7
        }
        let parmas = {
            createTimeBegin: getBeforeDate(1),
            createTimeEnd: getBeforeDate(),
            currencyId: currencyId,
            size: 10,
            start: 1,
            type: 1
        }
        dispatch(resInstationTabKey(1))
        dispatch(userInfoInSecurityCenter())
        dispatch(InstationTrunCoinInfo(dispatch, info))
        dispatch(sureInstationTrunCoinList(dispatch, parmas))
        dispatch(InstationTurnCoinCoinsList(dispatch))
    }

    //点击更多
    moreFunc() {
        let more = this.refs.more
        if (this.state.more) {
            more.style.height = "648px"
        } else{
            more.style.height = "86px"
        }
        this.setState({
            more:this.state.more === true ? false : true
        })
    }

    render() {
        const {cashAmount} = this.props.InstationTrunCoinInfo
        const {currencyNameEn} = this.props.InstationTrunCoinInfo.currency
        const {amountLowLimit,feeType,fee,currencyId} = this.props.InstationTrunCoinInfo.attachment
        const {sureCoinCoinsList, isValidatePass} = this.props
        const { text,iconUrl } = this.props.selectTurnCoinCoinsList
        let item = sureCoinCoinsList.map((cur, index, arr) => {
            return <li key={index.toString()} className={cur.currencyId === currencyId ? "warn-border fl" : "fl"} onClick={this.changeCoinFunc.bind(this,cur.currencyId)}>
                <span className={cur.currencyId === currencyId ? "warn-square" : ""}></span>
                <img src={img + cur.icoUrl}/>
                <span>{cur.currencyName}/{cur.currencyNameEn}</span>
            </li>
        })
        return (
            <div className="instationTrunCoin fr">
                <div>
                    <TopTitle title="站内转币"/>
                    <div className="instationTrunCoin-box-selectCoin">
                        <div className="clearfix instationTrunCoin-show">
                            <span className="fl">当前选中项：</span>
                            <div className="fl">
                                <img src={img + iconUrl}/><span className="warn">{text}</span>
                            </div>
                        </div>
                        <div className="clearfix instationTrunCoin-list" ref="more">
                            <ul className="clearfix fl" ref="lists">
                                {item}
                            </ul>
                            <button className="fr" onClick={this.moreFunc.bind(this)}>
                                <span>更多</span><Icon type={this.state.more ? "down" : "up"}/>
                            </button>
                        </div>
                    </div>
                    <div className="instationTrunCoin-box">
                        <div className="instationTrunCoin-box-balance">
                            <p><span>账户余额：</span><span
                                className="warn">{cashAmount}</span><span>{`(${currencyNameEn})`}</span></p>
                        </div>
                        <div className="clearfix instationTrunCoin-box-uid">
                            <p className="fl"><span className="warn">*</span><span>接收用户UID：</span>
                            </p>
                            <input type="text" className="fl" ref='uid'/>
                        </div>
                        <div className="clearfix instationTrunCoin-box-uname">
                            <p className="fl"><span className="warn">*</span><span>接收用户昵称：</span>
                            </p>
                            <input type="text" className="fl" ref='uname'/>
                        </div>
                        <div className="clearfix instationTrunCoin-box-num">
                            <p className="fl"><span>转出数量：</span></p>
                            <div className="fl">
                                <input type="number" min="0" onInput={this.changeTurnCoin.bind(this)}
                                       ref='turnCoin'/><span>{`转出数额不能小于${amountLowLimit}个`}</span>
                            </div>
                        </div>
                        <div className="instationTrunCoin-box-hint warn">
                            {this.state.hintText}
                        </div>
                        <div className="instationTrunCoin-box-text clearfix">
                            <p className="fl">
                                <span>{feeType === 2 ? `手续费（${formatNumber(fee * 100, 2)}%）：` : `手续费（${fee}个）：`}</span><span>{formatNumber(this.state.sumCoin, 4)}</span>
                            </p>
                            <p className="fl"><span>实际到账：</span><span>{formatNumber(this.state.numCoin, 4)}</span></p>
                        </div>
                        <div className="instationTrunCoin-box-dealCoin">
                            <span>交易密码：</span>
                            <input type="password" ref='dealCode'/>
                            <span style={{marginLeft: "30px"}}><Link to='/personal/settings'
                                                                     className="blue">{isValidatePass === 0 ? "设置" : "修改"}</Link></span>
                        </div>
                        <div className="clearfix instationTrunCoin-box-imgCoin">
                            <span className="fl">图片验证码：</span>
                            <input type="text" className="fl" ref='imgCode'/>
                            <div className="fl">
                                <img src={this.state.captcha} onClick={this.changeImgCode.bind(this)}/>
                            </div>
                        </div>
                        <div className="instationTrunCoin-box-phoneCoin">
                            <span>短信验证码：</span>
                            <input type="text" ref='phoneCode'/>
                            <button onClick={this.sendCode.bind(this)} ref='send'>获取验证码</button>
                        </div>
                        <div className="instationTrunCoin-box-turn">
                            <button ref='btn' onClick={this.sureTurnCoin.bind(this)}>确认转出</button>
                        </div>
                    </div>
                </div>
                <InstationTrunCoinTabs {...this.props}/>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.InstationTrunCoinInfo,
        isValidatePass: state.userInfoDetails.isValidatePass
    }
})(InstationTrunCoin)