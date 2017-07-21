import React from 'react';
import { Icon,message,Modal } from 'antd';
import axios from 'axios'
import qs from 'qs'

let token = localStorage.getItem("token")
let uid = localStorage.getItem("uid")
const base = 'data:image/png;base64,'
export default class SecurityCenterMainResDealPwd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Dealpwd:true,
            SureDealPwd: true,
            validPostCode: true,
            visible: false,
            captcha:'',
            codeUUID: ''

        }
    }
    showModal = () => {
        this.getCaptcha()
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
     //这个方法是在常设置交易密码离焦的时候判断
    blurFunc () {
        let Dealpwd = this.refs.Dealpwd.value.trim()
        let reg = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/
        if (!reg.test(Dealpwd)) {
            message.error("设置交易密码格式错误")
            this.setState({
                Dealpwd:false
            })
            return false
        } else {
            this.setState({
                Dealpwd:true
            })
        }
    }
    // 在确认交易密码离焦的时候
    checkRecDeal = () => {
        let SureDealPwd = this.refs.SureDealPwd.value.trim()
        let Dealpwd = this.refs.Dealpwd.value.trim()
        if (Dealpwd != SureDealPwd) {
            message.error("两次密码输入不一致")
            this.setState({
                SureDealPwd: false
            })
        } else {
            this.setState({
                SureDealPwd: true
            })
        }
    }
     // 检测邮编是否符合规范
    checkPostCode () {
        let postCode = this.refs.postcode.value.trim()
        if(!/\d{6}$/.test(postCode)) {
            this.setState({
                validPostCode: false
            })
        } else {
            this.setState({
                validPostCode: true
            })
        }
    }
    //重设交易密码
    resetDealPwd() {
        let imgCaptcha = this.refs.imgCaptcha.value.trim()
        let SureDealPwd = this.refs.SureDealPwd.value.trim()
        let Dealpwd = this.refs.Dealpwd.value.trim()
        let resetDealCode = this.refs.resetDealCode.value.trim()
        if (!Dealpwd) return message.error("设置交易密码不能为空")
        if (!SureDealPwd) return message.error("确认交易密码不能为空")
        if (!imgCaptcha) return message.error("图片验证码输入不能为空")
        if (!resetDealCode) return message.error("手机验证码不能为空") 
        if (Dealpwd != SureDealPwd) return message.error("两次密码输入不一致")
    
        //验证通过发送请求
        axios.post('/user/bindFdpwd', qs.stringify({
                uid: uid,
                token:token,
                type:"04",
                fdPassword:SureDealPwd,
                smsCode:resetDealCode

            })
        ).then(function (res) {
            if (res.data.status == 200) {
                message.success("资金密码设置成功")
                window.location.reload()
            }
            if (res.data.status === 423 ) {
                message.error("手机验证码错误")
            }
            if (res.data.status == 477) {
                message.error("交易密码不能与登录密码相同")
            }
            if (res.data.status == 456) {
                message.error(res.data.message)
            }

           
        }.bind(this))

    }
    //点击获取验证码的时候
    getDealCapBtn = () => {
        let btn = this.refs.getDealCapBtn
        let imgCaptcha = this.refs.imgCaptcha.value.trim()
        let SureDealPwd = this.refs.SureDealPwd.value.trim()
        let Dealpwd = this.refs.Dealpwd.value.trim()
        let codeUUID = this.state.codeUUID
        let time = 60
        let timer = null
        if (!Dealpwd) return message.error("设置交易密码不能为空")
        if (!SureDealPwd) return message.error("确认交易密码不能为空")
        if (!imgCaptcha) return message.error("图片验证码输入不能为空")
        if (Dealpwd != SureDealPwd) return message.error("两次密码输入不一致")
        //验证通过发送请求
        axios.post('/user/sendMsgWithUid', qs.stringify({
                uid: uid,
                token:token,
                type:"04",
                vercode:imgCaptcha,
                codeid:codeUUID
            })
        ).then(function (res) {
            if (res.data.status == 200) {
                btn.setAttribute('disabled', 'disabled')
                btn.style.backgroundColor = '#ccc';
                timer = setInterval(function () {
                    time--
                    if (time < 0) {
                        clearInterval(timer)
                        btn.removeAttribute('disabled', 'disabled')
                        btn.style.backgroundColor = '#c40000'
                        btn.innerText = "获取验证码"
                    } else {
                        btn.innerText = "重新发送（" + time + "s）"
                    }
                }, 1000)
                return false
            }
            if(res.data.status == 412) {
                message.error("图片验证码错误")
                btn.style.backgroundColor = '#c40000'
                clearInterval(timer)
                btn.removeAttribute('disabled', 'disabled')
                btn.innerText = "获取验证码"
                return false

            }
        }.bind(this))
        
    }
    //点击图片验证码更换图片验证码
    changeCaptcha () {
        this.getCaptcha()
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
    render() {
        const { isValidatePass } = this.props

        return (
            <li>
                <div className="SecurityCenterMainResDealPwd">
                {isValidatePass ? <Icon type="check-circle" className="success"/> :
                    <Icon type="exclamation-circle" className="warn"/>}
                    <span className="setting-title">交易密码</span>
                    <span style={{marginRight: '20px'}}>交易、提现、修改安全设置时输入</span>
                    <div style={{display: 'inline'}}>
                        <a href="javascript:;" onClick={this.showModal} className="fr resetPwd">{isValidatePass ? "修改" : "设置"}</a>
                        <Modal title={'交易密码重置'} visible={this.state.visible}
                                   onCancel={this.handleCancel} footer={null}>
                            <p className="text-center warn">*为了您的资产安全，交易密码修改后24小时以内不允许提现</p>
                            <div className="alert-cont">
                                <div className="input-area">
                                    <label htmlFor="">交易密码</label>
                                    <div className="input-box">
                                        <input type="password" className={this.state.Dealpwd ? '' : 'wrong'} ref="Dealpwd" placeholder="设置交易密码" onBlur={this.blurFunc.bind(this)}/>
                                        {this.state.Dealpwd ? '' : <span>*密码由数字和字母组成6-16位</span>}
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="">确认密码</label>
                                    <div className="input-box">
                                        <input type="password" ref="SureDealPwd"
                                               className={this.state.SureDealPwd ? '' : 'wrong'}
                                               placeholder="确认交易密码"
                                               onBlur={this.checkRecDeal.bind(this)}
                                        />
                                        {this.state.SureDealPwd ? '' : <span>*两次密码输入不一致</span>}
                                    </div>
                                </div>
                                 <div className="input-area">
                                    <label htmlFor="">图片验证码</label>
                                    <div className="input-box thin-box" style={{verticalAlign: 'top'}}>
                                        <input type="text" ref="imgCaptcha" placeholder="请输入图片验证码"/>
                                    </div>
                                    <div className="box-holder">
                                        <img src={this.state.captcha} onClick={this.changeCaptcha.bind(this)} alt="" style={{width: '100%', display: 'block', height: '100%'}}/>
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="">手机验证码</label>
                                    <div className="input-box thin-box" style={{verticalAlign: 'top'}}>
                                        <input type="text" ref="resetDealCode" placeholder="请输入新手机验证码"/>
                                    </div>
                                    <div className="box-holder">
                                        <button ref="getDealCapBtn" onClick={this.getDealCapBtn.bind(this)}>
                                            获取验证码
                                        </button>
                                    </div>
                                </div>
                                <div className="input-area">
                                    <button ref="btn" onClick={this.resetDealPwd.bind(this)}>确定</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
            </div>
            </li>
            
        )
    }
}