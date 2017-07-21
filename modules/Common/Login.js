import React from 'react';
import {Icon, message} from 'antd'
import { connect } from 'react-redux'
import { getCaptcha, userLogin } from '../Redux/Action/CommonAction'
import '../../css/form'
import '../../css/header'
import {Link}  from 'react-router';
var md5 = require('../../tools/MD5.js')

const salt = 'dig?F*ckDang5PaSsWOrd&%(12lian0160630).'
const base = 'data:image/png;base64,'

class Login extends React.Component {
    state = {
        loginText:''//填写完整信息的时候提示
    }
    // 登录
    loginHandler() {
        const { dispatch } = this.props
        let uname = this.refs.uname.value.trim()
        let pwd = md5(this.refs.pwd.value.trim() + salt)
        let el = this.refs.captcha
        let captcha = el.value.trim()
        let info = {
            uname: uname,
            pwd: pwd,
            captcha: captcha,
            codeid: this.props.codeUUID,
            el: el
        }
		
		if(uname && pwd && captcha) {
            dispatch(userLogin(dispatch,info))
            this.setState({
                loginText:""
            })
        }else {
            this.setState({
                loginText:"*请填写完整用户信息"
            })
        }
    }
    
    // 获取验证码
    getCaptcha() {
        const { dispatch } = this.props
        dispatch(getCaptcha())
        
    }
    

    componentDidMount() {
        document.body.scrollTop = 0
        this.getCaptcha()
    }
    
    // enter登录
    keyLogin (e) {
		if(e.keyCode === 13) {
			this.loginHandler()
		}
    }

    render() {
        let { IMGCode,errorInfo } = this.props
        return (
            <div>
                <div className="login-box-wrap">
                    <div className="login-box">
                        <div className="top-title text-center" style={{padding: 0}}>账户登录</div>
                        <div className="login-cont">
                            <div className="input-body">
                                <div className="login-input">
                                    <Icon type="user"/>
                                    <input type="text" ref="uname"  placeholder="会员昵称/手机号" autofocus maxLength="30"/>
                                </div>
                            </div>
                            <div className="input-body">
                                <div className="login-input">
                                    <Icon type="lock"/>
                                    <input type="password"  ref="pwd" placeholder="密码"/>
                                </div>
                            </div>
                            <div className="input-body clearfix">
                                <div className="login-input yz-box fl">
                                    <Icon type="safety"/>
                                    <input type="text" placeholder="验证码" ref="captcha" onKeyDown={this.keyLogin.bind(this)}/>
                                </div>
                                <div className="yzcode fr">
                                    <img src={base + IMGCode} onClick={this.getCaptcha.bind(this)} alt=""/>
                                </div>
                            </div>
                            <div className="warn">
                                {!this.state.loginText ? errorInfo : this.state.loginText}
                            </div>
                            <div className="input-body no-margin">
                                <div className="login-input">
                                    <button onClick={this.loginHandler.bind(this)}>登录</button>
                                </div>
                            </div>
                            <div className="pwd-control">
                                <div className="fl">
                                    <Link to="/register" className="warn">立即注册</Link>
                                </div>
                                <div className="fr">
                                    <Link to="/resetPwd1">忘记密码</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.homePage
    }
})(Login)

