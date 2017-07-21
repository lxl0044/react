import React from 'react';
import { Icon,message,Modal } from 'antd';
import axios from 'axios'
import qs from 'qs'

let token = localStorage.getItem("token")
let uid = localStorage.getItem("uid")
const base = 'data:image/png;base64,'
export default class SecurityCenterMainResPhone extends React.Component {
	constructor(props){
        super(props);
        this.state = {
       		visible: false,
            yetPhone: true,
            validPhone: true,
            captcha: '',
            codeUUID: ''
        }
    }
	showModal = () => {
        //组件加载完渲染
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
    //当我在输入新手机号离焦的时候判断
    checkPhone = () => {
        let phone = this.refs.curPhone.value.trim()
        if (/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
            this.setState({
                validPhone:true
            })
        } else {
            this.setState({
                validPhone: false
            })
        }
    }
    // 获取手机验证码
    getPhoneCaptcha () {
        let btn = this.refs.getPhoneCapBtn
        let oldPhone = this.refs.priPhone.value.trim()
        let newPhone = this.refs.curPhone.value.trim()
        let imgCaptcha = this.refs.imgCaptcha.value.trim()
        let time = 60
        let timer = null
        let reg = /^1(3|4|5|7|8)\d{9}$/
        if (!newPhone) {
            message.error("新手机号输入不能为空") 
            return false
        }
        if (!reg.test(newPhone)) {
            message.error("新手机号格式不对")
            return false
        }
        if(!imgCaptcha) return message.error('请检查您的验证码')
        // 请求手机验证码
        axios.post('/user/verifyPhoneSendMsg', qs.stringify({
                token:token,
                uid:uid,
                oldPhone:oldPhone,
                newPhone:newPhone,
                vercode: imgCaptcha,
                codeid:this.state.codeUUID
            })
        ).then(function (res) {
            //根据后台请求的数据判断用户输入的值返回错误信息
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
            } else if (res.data.status == 422) {
                btn.style.backgroundColor = '#c40000'
                clearInterval(timer)
                btn.removeAttribute('disabled', 'disabled')
                btn.innerText = "获取验证码"
                message.error("原手机号输入错误")
            } else if (res.data.status == 421) {
                btn.style.backgroundColor = '#c40000'
                clearInterval(timer)
                btn.removeAttribute('disabled', 'disabled')
                btn.innerText = "获取验证码"
                message.error("新手机号已经被绑定")

            }  else if(res.data.status == 412) {
                message.error('验证码错误')
                this.getCaptcha()
            } else {
                btn.style.backgroundColor = '#c40000'
                clearInterval(timer)
                btn.removeAttribute('disabled', 'disabled')
                btn.innerText = "获取验证码"
                message.error("网络连接超时")
            }

        }.bind(this))
    }
    // 重设手机号码
    resetPhone() {
        let newPhone = this.refs.curPhone.value.trim()
        let oldPhone = this.refs.priPhone.value.trim()
        let resetYzCode = this.refs.resetYzCode.value.trim()
        let imgCaptcha = this.refs.imgCaptcha.value.trim()
        let former = this.state.phone
        let reg = /^1(3|4|5|7|8)\d{9}$/
        //如果输入为空就提示

        if(!oldPhone || !this.state.yetPhone) return message.error('请检查您的原手机号码')
        if(!newPhone || !this.state.validPhone) return message.error('请检查您的新手机号码')
        if(!imgCaptcha) return message.error('请检查您的图片验证码')
        if(!resetYzCode) return message.error('请检查您的手机验证码')
        // request
        axios.post('/user/verifyPhoneCode', qs.stringify({
            token: token,
            uid: uid,
            oldPhone:oldPhone,
            newPhone:newPhone,
            code:resetYzCode
            })
        )
        .then(function (res) {
            if (res.data.status == 200) {
                message.success("手机号修改成功")
                window.location.reload()
            } else {
                message.error(res.data.message)
            }
        })
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
        const { phone } = this.props

		return (
            <li>
                <div className="SecurityCenterMainResPhone">
                 {phone ? <Icon type="check-circle" className="success"/> :
                                    <Icon type="exclamation-circle" className="warn"/>}
                                <span className="setting-title">手机号绑定</span>
                                <span>提现、修改密码及安全设置时用以收取验证短信  手机号码为：<span
                                    className="setting-phone">{phone}</span></span>
                    <div style={{display: 'inline'}}>
                        <a href="javascript:;" onClick={this.showModal} className="fr resetPwd">{phone ? "修改" : "设置"}</a>
                        <Modal title={"手机号绑定"} visible={this.state.visible}
                                onCancel={this.handleCancel} footer={null}>
                                    <div className="alert-cont">
                                        <div className="input-area">
                                            <label htmlFor="">国家</label>
                                            <div className="input-box select-box">
                                                <select name="" id="" ref="country">
                                                    <option value="中国">中国</option>
                                                </select>
                                            </div>
                                            <div className="box-holder"></div>
                                        </div>
                                        <div className="input-area">
                                            <label htmlFor="">原手机号码</label>
                                            <div className="input-box thin-box">
                                                <input type="text" ref="priPhone" placeholder="请输入原手机号"
                                                       className={this.state.yetPhone ? '' : 'wrong'}/>
                                                {this.state.yetPhone ? '' : <span>*原手机号码格式错误</span>}
                                            </div>
                                            <div className="box-holder" style={{
                                                lineHeight: '40px',
                                                textAlign: 'left'
                                            }}>{phone}</div>
                                        </div>
                                        <div className="input-area">
                                            <label htmlFor="">新手机号码</label>
                                            <div className="input-box thin-box">
                                                <input type="text" ref="curPhone"
                                                       className={this.state.validPhone ? '' : 'wrong'}
                                                       placeholder="请输入新手机号"
                                                       onBlur={this.checkPhone.bind(this)}
                                                />
                                                {this.state.validPhone ? '' : <span>*手机号码输入错误</span>}
                                            </div>
                                            <div className="box-holder"></div>
                                        </div>
                                        <div className="input-area">
                                            <label htmlFor="">图片验证码</label>
                                            <div className="input-box thin-box" style={{verticalAlign: 'top'}}>
                                                <input type="text" ref="imgCaptcha" placeholder="请输入图片验证码"/>
                                            </div>
                                            <div className="box-holder" onClick={this.getCaptcha.bind(this)}>
                                                <img src={this.state.captcha} alt="" style={{width: '100%', display: 'block', height: '100%'}}/>
                                            </div>
                                        </div>
                                        <div className="input-area">
                                            <label htmlFor="">手机验证码</label>
                                            <div className="input-box thin-box" style={{verticalAlign: 'top'}}>
                                                <input type="text" ref="resetYzCode" placeholder="请输入新手机验证码"/>
                                            </div>
                                            <div className="box-holder">
                                                <button onClick={this.getPhoneCaptcha.bind(this)} ref="getPhoneCapBtn">
                                                    获取验证码
                                                </button>
                                            </div>
                                        </div>
                                        <div className="input-area">
                                            <button onClick={this.resetPhone.bind(this)}>确定</button>
                                        </div>
                                    </div>
                                </Modal>
                    </div>
            </div>
            </li>
			
		)
	}
}