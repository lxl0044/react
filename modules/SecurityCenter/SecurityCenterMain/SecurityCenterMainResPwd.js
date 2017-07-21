import React from 'react';
import { Icon,message,Modal } from 'antd';
import axios from 'axios'
import qs from 'qs'


var md5 = require('../../../tools/MD5.js')
const base = 'data:image/png;base64,'
const salt = 'dig?F*ckDang5PaSsWOrd&%(12lian0160630).'
export default class SecurityCenterMainResPwd extends React.Component {
	constructor(props){
        super(props);
        this.state = {
       		visible: false,
            recentTime: '',
            recentIP: '',
            yetPwd: true,
            validPwd: true,
            repPwd: true,
            picCode: true,
            phoneCaptcha: true,
            captcha: '',
            codeUUID:'',
            time: '',
            host: ''
        }
    }
	showModal = () => {
        //组件加载完渲染
        this.getPicCaptcha()
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    //登陆密码里面的手机验证码
    getCellPhoneCaptcha(){
        let phone = this.state.phone
        let btn = this.refs.getPhoneCapBtn
        let picCaptcha = this.refs.picCaptcha.value.trim()
        let time = 60
        let timer = null
        let priPwd = this.refs.priPwd.value.trim()
        let newPwd = this.refs.curPwd.value.trim()
        let repPwd = this.refs.repPwd.value.trim()
        let reg = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/;
        if (!priPwd) {
            message.error("原密码不能输入为空")
            return false
        }
        if (!newPwd) {
            message.error("新密码不能输入为空")
            return false
        }
        if (!repPwd) {
            message.error("确认新密码不能输入为空")
            return false
        }
        if (newPwd != repPwd) {
            message.error("两次密码输入不一致")
            return false
        }
        if (!reg.test(newPwd)) {
            message.error("新密码格式不符")
            return false
        }
        if (!picCaptcha) {
            message.error("图片验证码不能为空")
            this.setState({
                picCode:false
            })
            return false
        }
        // btn.setAttribute('disabled', 'disabled')
        // btn.style.backgroundColor = '#ccc';
        // timer = setInterval(function () {
        //     time--
        //     if (time < 0) {
        //         clearInterval(timer)
        //         btn.removeAttribute('disabled', 'disabled')
        //         btn.style.backgroundColor = '#c40000'
        //         btn.innerText = "获取验证码"
        //     } else {
        //         btn.innerText = "重新发送（" + time + "s）"
        //     }
        // }, 1000)
        axios.post('/user/sendMsgWithUid', qs.stringify({
                    type:"03",
                    vercode: picCaptcha,
                    codeid:this.state.codeUUID
                })
            )
            .then(function (res) {
                if (res.data.status === 200) {
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
                    this.setState({
                        picCode:true
                    })
                }
                if(res.data.status === 412){
                    this.getPicCaptcha()
                    clearInterval(timer)
                    btn.removeAttribute('disabled', 'disabled')
                    btn.style.backgroundColor = '#c40000'
                    btn.innerText = "获取验证码"
                    this.setState({
                        picCode:false
                    })
                    return false
                }
            }.bind(this))
    }
    // 重设密码
    resetPwd() {
        let priPwd = md5(this.refs.priPwd.value.trim() + salt),
            newPwd = this.refs.curPwd.value.trim(),
            repPwd = this.refs.repPwd.value.trim(),
            captcha = this.refs.resetPwdCaptcha.value.trim(),
            reg = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/;
        
        if(!priPwd) return message.error('请填写原密码')
        if(!newPwd) return message.error('请填写新密码')
        if(!repPwd) return message.error('请填写确认密码')
        if(!captcha) return message.error('请填写验证码')
        if (newPwd != repPwd) return message.error("两次密码输入不一致")
        axios.post('/user/rePwdWithLogin', qs.stringify({
                pwd:priPwd,
                newPwd:newPwd,
                smsCode:captcha
            })
        )
        .then(function (res) {
            if (res.data.status === 200) {
                message.success("密码修改成功")
                this.context.router.push('/login')
                localStorage.removeItem("token")
                localStorage.removeItem("uid")
            } else if (res.data.status === 403) {
                this.setState({
                    phoneCaptcha:false
                })
            } else {
                message.error(res.data.message)
            }
        }.bind(this))
      
    }

    //当我在原密码离焦的时候
    pwdChangeFunc = () => {
        let priPwd = md5(this.refs.priPwd.value.trim() + salt)
        axios.post('/user/checkOldPwd', qs.stringify({
            pwd:priPwd
            })
        ).then(function(res){
            if (res.data.status == 200) {
                this.setState({
                    yetPwd:true
                })
                return false
            }
            if (res.data.status == 555) {
                this.setState({
                    yetPwd:false
                })
                return false
            } 
        }.bind(this))
    }
    // 检查密码格式
    checkPwd() {
        let pwd = this.refs.curPwd.value.trim()
        if (/(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/.test(pwd) || pwd.length == 0) {
            this.setState({
                validPwd: true
            })
        } else {
            this.setState({
                validPwd: false
            })
        }
    }

    // 验证两次密码输入是否正确
    checkTwoPwd() {
        let newPwd = this.refs.curPwd.value.trim()
        let repPwd = this.refs.repPwd.value.trim()
        if (repPwd != newPwd) {
            this.setState({
                repPwd: false
            })
        } else {
            this.setState({
                repPwd: true
            })
        }
    }
    //点击图片验证码
    getPicCaptcha = () => {
        axios.post('user/getimg')
            .then(function (res) {
                this.setState({
                    captcha: base + res.data.attachment.IMGCode,
                    codeUUID: res.data.attachment.codeUUID
                })
            }.bind(this))
    }

    componentDidMount () {
        axios.post('/user/myLogins', qs.stringify({
            type: 2,
            start: 0,
            size: 10
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    this.setState({
                        time: res.data.attachment[0].time,
                        host: res.data.attachment[0].host
                    })
                }
            }.bind(this))
    }

	render() {
        const { time, host } = this.state
		return (
            <li>
                <div className="SecurityCenterMainResPwd">
                 <Icon type="check-circle" className="success"/>
                        <span className="setting-title">登录密码</span>
                        <span>上次登录时间为：
                            <span className="login-time"
                                  style={{marginRight: '10px'}}>{time}</span>
                            IP地址为：<span className="login-ip">{host}</span>
                        </span>
                    <div style={{display: 'inline'}}>
                        <a href="javascript:;" onClick={this.showModal} className="fr resetPwd">{"修改"}</a>
                        <Modal title={"修改登录密码"} visible={this.state.visible}
                                onCancel={this.handleCancel} footer={null}>
                                    <div className="alert-cont">
                                        <div className="input-area">
                                            <label htmlFor="">原密码</label>
                                            <div className="input-box">
                                                <input type="password" ref="priPwd" onBlur={this.pwdChangeFunc.bind(this)} placeholder="请输入原密码"
                                                       className={this.state.yetPwd ? '' : 'wrong'}/>
                                                {this.state.yetPwd ? '' : <span>*原密码输入错误</span>}
                                            </div>
                                        </div>
                                        <div className="input-area">
                                            <label htmlFor="">设置新密码</label>
                                            <div className="input-box">
                                                <input type="password" ref="curPwd" onBlur={this.checkPwd.bind(this)}
                                                       placeholder="请输入新密码"
                                                       className={this.state.validPwd ? '' : 'wrong'}/>
                                                {this.state.validPwd ? '' : <span>*密码由6-18数字、字母和特殊字符组成</span>}
                                            </div>
                                        </div>
                                        <div className="input-area">
                                            <label htmlFor="">确认新密码</label>
                                            <div className="input-box">
                                                <input type="password" ref="repPwd" onBlur={this.checkTwoPwd.bind(this)}
                                                       placeholder="请输入新密码"
                                                       className={this.state.repPwd ? '' : 'wrong'}/>
                                                {this.state.repPwd ? '' : <span>*两次密码输入不一致</span>}
                                            </div>
                                        </div>
                                        <div className="input-area">
                                            <label htmlFor="">图片验证码</label>
                                            <div className="input-box thin-box">
                                                <input type="text" ref="picCaptcha" placeholder="请输入验证码"
                                                       className={this.state.picCode ? '' : 'wrong'}/>
                                                {this.state.picCode ? '' : <span>*图片验证码错误</span>}
                                            </div>
                                            <div className="yzcode box-holder">
                                                <img src={this.state.captcha} onClick={this.getPicCaptcha.bind(this)} alt=""/>
                                            </div>
                                        </div>
                                        <div className="input-area">
                                            <label htmlFor="">手机验证码</label>
                                            <div className="input-box thin-box">
                                                <input type="text" ref="resetPwdCaptcha" placeholder="请输入验证码"
                                                       className={this.state.phoneCaptcha ? '' : 'wrong'}/>
                                                {this.state.phoneCaptcha ? '' : <span>*手机验证码错误</span>}
                                            </div>
                                            <div className="yzcode box-holder">
                                                <button onClick={this.getCellPhoneCaptcha.bind(this)} ref="getPhoneCapBtn">
                                                    获取验证码
                                                </button>
                                            </div>
                                        </div>
                                        <div className="input-area">
                                            <button onClick={this.resetPwd.bind(this)}>确定</button>
                                        </div>
                                    </div>
                                </Modal>
                    </div>
            </div>
            </li>
			
		)
	}
}
SecurityCenterMainResPwd.contextTypes = {
    router: React.PropTypes.object
}
