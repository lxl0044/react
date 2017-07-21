import React from 'react';
import {Icon, message, Modal} from 'antd';
import axios from 'axios'
import qs from 'qs'

let token = localStorage.getItem("token")
let uid = localStorage.getItem("uid")
export default class SecurityCenterMainResEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            validEmail: true,
            emailCaptcha: true,

        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    // 获取邮箱验证码
    getEmailCaptcha() {
        let btn = this.refs.getEmailCapBtn
        let newEmail = this.refs.newEmail.value.trim()
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        let time = 60
        let timer = null
        if (reg.test(newEmail)) {
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
            axios.post('/user/bindEmail', qs.stringify({
                    // email: this.state.email,
                    uid: uid,
                    token: token,
                    email: newEmail
                })
            ).then(function (res) {
                if (res.data.status == 414) {
                    message.error("邮箱已被绑定")
                    clearInterval(timer)
                    btn.removeAttribute('disabled', 'disabled')
                    btn.style.backgroundColor = '#c40000'
                    btn.innerText = "获取验证码"
                }
            }.bind(this))
        } else {
            //如果邮箱输入为空提示不能为空
            if (newEmail == '') {
                message.error("邮箱输入不能为空")
                clearInterval(timer)
                btn.removeAttribute('disabled', 'disabled')
                btn.style.backgroundColor = '#c40000'
                btn.innerText = "获取验证码"
            } else {
                message.error("邮箱格式不对")
                clearInterval(timer)
                btn.removeAttribute('disabled', 'disabled')
                btn.style.backgroundColor = '#c40000'
                btn.innerText = "获取验证码"
            }
        }

    }

    // 重设邮箱
    resetEmail() {
        let newEmail = this.refs.newEmail.value.trim()
        let yxCode = this.refs.yxCode.value.trim()
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!newEmail || !yxCode || !reg.test(newEmail)) {
            message.error("请填写完整信息")

        } else {
            axios.post('/user/verifyMailCode', qs.stringify({
                    // email: this.state.email,
                    uid: uid,
                    token: token,
                    code: yxCode

                })
            ).then(function (res) {
                if (res.data.status == 200) {
                    message.success("邮箱修改成功")
                    window.location.reload()
                } else {
                    message.error(res.data.message)
                }

            }.bind(this))
        }


    }

    // 验证邮箱格式
    checkEmail() {
        let email = this.refs.newEmail.value.trim()
        if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)) {
            this.setState({
                validEmail: true
            })
        } else {
            this.setState({
                validEmail: false
            })
        }
    }

    render() {
        const {email} = this.props
        return (
            <li>
                <div className="SecurityCenterMainResEmail">
                    {email ? <Icon type="check-circle" className="success"/> :
                        <Icon type="exclamation-circle" className="warn"/>}
                    <span className="setting-title">邮箱绑定</span>
                    <span>用于密码修改和提现时确认：<span>{email}</span></span>
                    <div style={{display: 'inline'}}>
                        <a href="javascript:;" onClick={this.showModal}
                           className="fr resetPwd">{email ? "修改" : "设置"}</a>
                        <Modal title={"邮箱绑定"} visible={this.state.visible}
                               onCancel={this.handleCancel} footer={null}>
                            <div className="alert-cont">
                                <div className="input-area">
                                    <label htmlFor="">{email ? "设置新邮箱" : "设置邮箱"}</label>
                                    <div className="input-box thin-box">
                                        <input type="text" ref="newEmail"
                                               className={this.state.validEmail ? '' : 'wrong'}
                                               onBlur={this.checkEmail.bind(this)}
                                               placeholder="请输入邮箱地址"
                                        />
                                        {this.state.validEmail ? '' : <span>*邮箱格式错误</span>}
                                    </div>
                                    <div className="box-holder">
                                        <button ref="getEmailCapBtn" onClick={this.getEmailCaptcha.bind(this)}>
                                            获取验证码
                                        </button>
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="">验证码</label>
                                    <div className="input-box thin-box">
                                        <input type="text" ref="yxCode" placeholder="请输入验证码"
                                               className={this.state.emailCaptcha ? '' : 'wrong'}/>
                                        {this.state.emailCaptcha ? '' : <span>*邮箱验证码错误</span>}
                                    </div>
                                    <div className="box-holder"></div>
                                </div>
                                <div className="input-area">
                                    <button onClick={this.resetEmail.bind(this)}>确定</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </li>

        )
    }
}