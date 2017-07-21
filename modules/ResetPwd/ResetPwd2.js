// ResetPwd2
import React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Steps, Icon, message} from 'antd';
import TopTitle from '../Common/TopTitle'
import '../../css/resetPwd'
import axios from 'axios';
import qs from 'qs';
const Step = Steps.Step;

let phone = sessionStorage.getItem('phone')
let mail = sessionStorage.getItem('mail')
let uid = sessionStorage.getItem('uid')
const salt = 'dig?F*ckDang5PaSsWOrd&%(12lian0160630).'
const base = 'data:image/png;base64,'
class ResetPwd2 extends React.Component {
    state = {
        href: "javascript:;",//默认点击提交的时候是不能跳转的
        display: "none",//默认情况下验证码输入错误的提示信息，隐藏
        phone: '',
        mail: '',
        picCode:'none',
        captcha:'',
        codeUUID:''
    }

    //邮箱验证
    mailBoxFunc = () => {
        let btn = this.refs.mailCaptcha
        let mailBox = this.refs.mailBox.innerHTML;
        let time = 60
        btn.setAttribute('disabled', 'disabled')
        btn.style.backgroundColor = '#ccc';
        let timer = setInterval(function () {
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
        btn.setAttribute('disabled', 'disabled')
        btn.style.backgroundColor = '#ccc';
        axios.post('/user/sendMail', qs.stringify({
            email: mailBox,
            uid: uid
        })).then(function (res) {

        })
    }
    //手机验证
    phoneNum = () => {
        let btn = this.refs.phoneCaptcha
        let picCode = this.refs.picCode.value.trim()
        let phoneNum = this.refs.phoneNum.innerHTML;
        let time = 60
        if (!picCode) return message.error("图片验证码不能为空")
        btn.setAttribute('disabled', 'disabled')
        btn.style.backgroundColor = '#ccc';
        let timer = setInterval(function () {
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
        axios.post('/user/sendMsgWithUid', qs.stringify({
            uid: uid,
            type: "02",
            vercode: picCode,
            codeid:this.state.codeUUID
        })).then(function (res) {
            if(res.data.status == 412) {
                message.error("图片验证码错误")
                clearInterval(timer)
                btn.removeAttribute('disabled', 'disabled')
                btn.style.backgroundColor = '#c40000'
                btn.innerText = "立即验证"
                return false
            }
        })
    }
    //点击提交的时候，判断是手机验证还是邮箱验证，进入不同的接口
    clkSubmit = () => {
        const { dispatch } = this.props
        let yzcode = this.refs.yzcode.value.trim(),
            phone = this.state.phone,
            picCode = this.refs.picCode.value.trim(),
            reg1 = /^\d{4}$/,//验证验证码是4位数 邮箱
            reg2 = /^\d{6}$/;//验证验证码是6位数 手机
            //验证验证码输入的长度4位或6位
            if (reg1.test(yzcode)) {
                axios.post('/user/verifyMailCodePwd', qs.stringify({
                    mailCode: yzcode,
                    uid: uid,
                    email:this.state.mail
                })).then(function (res) {
                    if(res.data.status == 200){
                        sessionStorage.setItem('yzCode',yzcode)
                        dispatch(push('/ResetPwd3'))
                        window.location.reload()
                    }
                    if (res.data.status == 403) {
                        message.error("邮箱验证码错误")
                        this.setState({
                            display:"block"
                        })
                    }
                }.bind(this))
            } else if (reg2.test(yzcode)) {
                axios.post('/user/verifySmsCode', qs.stringify({
                    uid:uid,
                    smsCode: yzcode,
                })).then(function (res) {
                    if(res.data.status == 200){
                        sessionStorage.setItem('yzCode',yzcode)
                        dispatch(push('/ResetPwd3'))
                        window.location.reload()
                        return false
                    }
                    if (res.data.status == 403) {
                        message.error("手机验证码错误")
                        this.setState({
                            display:"block"
                        })
                        return false
                    }
                    if (res.data.status == 412) {
                        message.error("图片验证码错误")
                        this.setState({
                            display:"block"
                        })
                        return false
                    }
                }.bind(this))
            } else{
                message.error("验证码输入有误")
            }

    }
    getPicCaptcha = () => {
        axios.post('user/getimg')
            .then(function (res) {
                this.setState({
                    captcha: base + res.data.attachment.IMGCode,
                    codeUUID: res.data.attachment.codeUUID
                })
            }.bind(this))
    }
    componentDidMount() {
        //组件加载完调用图片验证码
        this.getPicCaptcha()
        this.setState({
            phone: phone,
            mail: mail
        })
    }

    keySubmit (e) {
        if(e.keyCode === 13) {
            this.clkSubmit()
        }
    }

    render() {
        return (
            <div className="reset-pwd">
                <TopTitle title="重置登录密码"/>
                <div className="reset-box">
                    <Steps>
                        <Step status="finish" title="确认账户" icon={<Icon type="user" className="action"/>}/>
                        <Step status="finish" title="安全认证" icon={<Icon type="safety"/>}/>
                        <Step status="wait" title="重置密码" icon={<Icon type="lock"/>}/>
                        <Step status="wait" title="完成" icon={<Icon type="smile-o"/>}/>
                    </Steps>
                    <div className="form-box">
                        <div className="verify-box">
                            <dl className="verify fl">
                                <dt>通过邮箱验证</dt>
                                <dd ref="mailBox">{this.state.mail ? this.state.mail : <span style={{fontSize: '12px'}}>您还未设置邮箱</span>}</dd>
                            </dl>
                            {this.state.mail ? 
                                <button className="fr" onClick={this.mailBoxFunc.bind(this)} ref='mailCaptcha'>立即验证</button> : 
                                <button className="fr" style={{backgroundColor: 'rgb(202, 201, 201)'}} onClick={this.mailBoxFunc.bind(this)} disabled="disabled">立即验证</button>}
                            
                        </div>
                        <div className="verify-box" style={{height: 'auto'}}>
                            <div>
                                <div className="input-box yzcode-input">
                                    <input type="text" ref="picCode"/>
                                </div>
                                <div className="yzcode">
                                    <img src={this.state.captcha} onClick={this.getPicCaptcha.bind(this)} alt=""/>
                                </div>
                            </div>
                            <div className="underline"></div>
                            <div className="clearfix">
                                <dl className="verify fl">
                                    <dt>通过手机号验证</dt>
                                    <dd ref="phoneNum">{this.state.phone}</dd>
                                </dl>
                                <button className="fr" onClick={this.phoneNum.bind(this)} ref='phoneCaptcha'>立即验证</button>
                            </div>
                        </div>
                        <div className="input-body">
                            <label htmlFor="">验证码</label>
                            <div className="input-box yzcode-input">
                                <input type="text" ref="yzcode" onKeyDown={this.keySubmit.bind(this)}/>
                            </div>
                            <span className="yzCodeInfo fr" style={{display: this.state.display}}>验证码输入错误!</span>
                        </div>

                        <div className="input-body text-center">
                            <a href={this.state.href} onClick={this.clkSubmit.bind(this)}>提交</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(ResetPwd2)