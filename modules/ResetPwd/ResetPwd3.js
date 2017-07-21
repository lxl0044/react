// ResetPwd1
import React from 'react';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import TopTitle from '../Common/TopTitle'
import {Steps, Icon, message} from 'antd';
import '../../css/resetPwd'
import axios from 'axios';
import qs from 'qs';

const Step = Steps.Step;

const yzCode = sessionStorage.getItem('yzCode');
const uid = sessionStorage.getItem('uid');
let reg = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/;//验证密码数字字母
class ResetPwd3 extends React.Component {
    state = {
        href: "javascript:;",//默认点击提交的时候是不能跳转的
        focusTextInfo: 'none',//当我聚焦新密码的时候
        blurSureInfo: 'none'//当我在确认密码离焦的时候
    }

    clkSubmit = () => {
        const {dispatch} = this.props
        let newPwd = this.refs.newPwd.value.trim(),
            surePwd = this.refs.surePwd.value.trim();
        if (!newPwd && !reg.test(newPwd)) {
            this.setState({
                display: "block"
            })
            return message.error("新密码格式不正确")
        }
        if (surePwd != newPwd) {
            this.setState({
                display: "block"
            })
            return message.error("两次密码输入不一致")
        }
        axios.post('/user/resetPwd', qs.stringify({
            pwd: newPwd,
            uid: uid,
            vercode: yzCode
        })).then(function (res) {
            if (res.data.status == 200) {
                dispatch(push('/ResetPwd4'))
            }else{
                return message.error(res.data.message)
            }
        }.bind(this))

    }

    //确认新密码的时候聚焦
    focusFunc() {
        this.setState({
            focusTextInfo: "block"
        })
    }

    blurFunc() {
        let newPwd = this.refs.newPwd.value.trim()
        if (reg.test(newPwd)) {
            this.setState({
                focusTextInfo: "none"
            })
        }
    }

    //确认输入密码
    blurSureFunc() {
        let newPwd = this.refs.newPwd.value.trim(),
            surePwd = this.refs.surePwd.value.trim();
        if (newPwd != surePwd) {
            this.setState({
                blurSureInfo: "block"
            })
        } else {
            this.setState({
                blurSureInfo: "none"
            })
        }
    }

    keySubmit(e) {
        if (e.keyCode === 13) {
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
                        <Step status="finish" title="重置密码" icon={<Icon type="lock"/>}/>
                        <Step status="wait" title="完成" icon={<Icon type="smile-o"/>}/>
                    </Steps>
                    <div className="form-box">
                        <div className="input-body">
                            <label htmlFor="">设置新密码</label>
                            <div className="input-box">
                                <input type="password" ref="newPwd" onFocus={this.focusFunc.bind(this)}
                                       onBlur={this.blurFunc.bind(this)}/>
                            </div>
                            <span className="focusTextInfo warn"
                                  style={{display: this.state.focusTextInfo, fontSize: '14px', marginLeft: '80px'}}>*密码由6-18数字、字母和特殊字符组成</span>
                        </div>
                        <div className="input-body">
                            <label htmlFor="">确认新密码</label>
                            <div className="input-box">
                                <input type="password" ref="surePwd" onKeyDown={this.keySubmit.bind(this)}
                                       onBlur={this.blurSureFunc.bind(this)}/>
                            </div>
                            <span className="blurSureFunc warn"
                                  style={{display: this.state.blurSureInfo, fontSize: '14px', marginLeft: '80px'}}>*两次密码输入不正确</span>
                        </div>
                        <div className="input-body text-right">
                            <a href={this.state.href} onClick={this.clkSubmit.bind(this)}>提交</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(ResetPwd3)