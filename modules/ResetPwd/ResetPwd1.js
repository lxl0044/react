// ResetPwd1
import React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Steps, Icon, message} from 'antd';
import TopTitle from '../Common/TopTitle'
import '../../css/resetPwd';
import axios from 'axios';
import qs from 'qs';
const base = 'data:image/png;base64,'
const Step = Steps.Step;

class ResetPwd1 extends React.Component {
    state = {
        captcha: '',//保存验证码
        codeUUID: '',//保存codeUUID的值
        href: "javascript:;",//默认点击提交的时候是不能跳转的
        display: "none"//默认情况下输入错误的提示信息，隐藏
    }

    // 点击提交的按钮
    clkSubmit = () => {
        const { dispatch } = this.props
        let href = "",//保存路由跳转的下一个页面
            uname = this.refs.uname.value.trim(),
            captcha = this.refs.captcha.value.trim(),
            reg1 = /^1(3|4|5|7|8)\d{9}$/,//手机号
            reg2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//验证邮箱
        if(!uname) return message.error("请输入您的账号")
        if(!captcha) return message.error("请输入验证码")
        axios.post('/user/verUname', qs.stringify({
            uname: uname,
            vercode: captcha,
            codeid: this.state.codeUUID
        })).then(function (res) {
            if (res.data.status == 200) {
                sessionStorage.setItem('mail', res.data.attachment.mail)
                sessionStorage.setItem('phone', res.data.attachment.phone)
                sessionStorage.setItem('uid', res.data.attachment.uid)
                sessionStorage.setItem('username', res.data.attachment.username)
                //判断状态对了，就跳转到下一个页面
                dispatch(push('/ResetPwd2'))
                window.location.reload()
            } else {
                message.error(res.data.message)
                this.setState({
                    display: "block"
                })
                this.refs.captcha.value = ''
                this.getCaptcha()
            }
        }.bind(this));
        this.setState({
            href: this.state.href
        })

    }
    //点击验证码的时候跟换验证码
    getCaptcha() {
        axios.post('/user/getimg')
            .then(function (res) {
                this.setState({
                    captcha: base + res.data.attachment.IMGCode,
                    codeUUID: res.data.attachment.codeUUID
                })
            }.bind(this))
    }

    //组件渲染之后调用
    componentDidMount() {
        this.getCaptcha()
    }

    keySubmit(e) {
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
                        <Step status="wait" title="安全认证" icon={<Icon type="safety"/>}/>
                        <Step status="wait" title="重置密码" icon={<Icon type="lock"/>}/>
                        <Step status="wait" title="完成" icon={<Icon type="smile-o"/>}/>
                    </Steps>
                    <div className="form-box">
                        <div className="input-body">
                            <label htmlFor="">账号</label>
                            <div className="input-box">
                                <input type="text" ref="uname"/>
                            </div>
                        </div>
                        <div className="input-body">
                            <label htmlFor="">验证码</label>
                            <div className="input-box yzcode-input">
                                <input type="text" ref="captcha" onKeyDown={this.keySubmit.bind(this)}/>
                            </div>
                            <div className="yzcode">
                                <img src={this.state.captcha} onClick={this.getCaptcha.bind(this)} alt=""/>
                            </div>
                        </div>
                        <div className="resetPwdInfoBox text-center" style={{display: this.state.display}}><span
                            className="resetPwdInfo">账号或验证码错误!</span></div>
                        <div className="input-body text-right">
                            <a href={this.state.href} onClick={this.clkSubmit.bind(this)}>提交</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(ResetPwd1)