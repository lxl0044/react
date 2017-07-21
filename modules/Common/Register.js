import React from 'react';
import {message, Checkbox} from 'antd';
import axios from 'axios';
import {Link} from 'react-router'
import qs from 'qs';
import src from '../../images/logo_1.png';
import '../../css/form.css';


const salt = 'dig?F*ckDang5PaSsWOrd&%(12lian0160630).'
const base = 'data:image/png;base64,'
export default class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.context.router;
    }

    /**
     * validName 合法的昵称
     * validPwd 合法的密码
     * twicePwd 两次输入密码是否匹配
     * validTel 合法的手机号
     * validCaptcha 验证码匹配
     * hasUname 用户名已存在
     */

    state = {
        validName: true,
        validPwd: true,
        twicePwd: true,
        validTel: true,
        validCaptcha: true,
        hasChecked: true,
        hasUname: false,
        hasPhone: false,
        captcha:'',
        PicCaptcha:true,
        codeUUID:''
    }

    // 匹配密码
    checkPassword() {
        let pwd = this.refs.pwd.value.trim()
        if (/(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/.test(pwd) || pwd.length === 0) {
            this.setState({
                validPwd: true
            })
        } else {
            this.setState({
                validPwd: false
            })
        }
    }

    // 检查用户名是否合法
    checkUnique() {
        let uname = this.refs.uname.value.trim()
        let reg = /[.~!@#$%\\^\\+\\*&\\\\\\/\\?\\|:\\.{}()\';="]|^\d+$/g
        this.setState({
          hasUname: false
        })

        if(reg.test(uname) || uname.length < 2) {
          this.setState({
            validName: false
          })
        } else {
          this.setState({
            validName: true
          })
        }
    }

    // 检查用户名是否被占用
    // 200 表示可以用
    hasUname() {
        let uname = this.refs.uname.value.trim()
        if (!uname.length) return message.error('用户名不能为空')
        axios.post('user/verifyBeforeRegister', qs.stringify({
            uname: uname
        }))
            .then(function (res) {
                if (res.data.status !== 200) {
                    message.error("用户名已存在")
                }
            }.bind(this))
    }


    // 检测两次密码输入
    checkTwicePwd() {
        let pwd = this.refs.pwd.value.trim()
        let twicePwd = this.refs.twicePwd.value.trim()
        if (pwd !== twicePwd) {
            this.setState({
                twicePwd: false
            })
        } else {
            this.setState({
                twicePwd: true
            })
        }
    }

    // 匹配手机号
    checkPhone() {
        let phone = this.refs.phone.value.trim()
        if (/^1[3|4|5|7|8]\d{9}$/.test(phone) || phone.length === 0) {
            this.setState({
                validTel: true
            })
        } else {
            this.setState({
                validTel: false
            })
        }
    }

    //检查手机号是否占用
    hasPhone  () {
        let phone = this.refs.phone.value.trim()
        axios.post('/user/queryPhone', qs.stringify({
            phone: phone
        }))
        .then(function (res) {
            if(res.data.status != 200 && phone.length == 11) {
                this.setState({
                    hasPhone: true
                })
            } else {
                this.setState({
                    hasPhone: false
                })
            }
        }.bind(this))
    }

    // 复选框
    checkHandler(e) {
        this.setState({
            hasChecked: e.target.checked
        })
    }


    // 获取验证码
    getCaptcha() {
        let uname = this.refs.uname.value.trim(),
            picCode = this.refs.picCode.value.trim(),
            pwd = this.refs.pwd.value.trim(),
            phone = this.refs.phone.value.trim(),
            validName = this.state.validName,
            validPwd = this.state.validPwd,
            twicePwd = this.state.twicePwd,
            validTel = this.state.validTel,
            btn = this.refs.captcha
        if (!uname || !validName) return message.error("请确认用户名是否正确")
        if (!picCode) return message.error("请输入图片验证码")
        if (!pwd || !validPwd || !twicePwd) return message.error("请确认密码是否正确")
        if (!phone || !validTel) return message.error("请填写正确的手机号码")
        if(this.state.hasPhone) return message.error("手机号已被占用")
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

        axios.post('/user/sendMsg', qs.stringify({
            phone: phone,
            type: '01',
            vercode: picCode,
            codeid:this.state.codeUUID
        })).then(function (res) {
            if (res.data.status == 200) {
                 this.setState({
                    PicCaptcha:true
                })
                return false
            }
            if(res.data.status == 412) {
                message.error("图片验证码错误")
                this.setState({
                    PicCaptcha:false
                })
                clearInterval(timer)
                btn.removeAttribute('disabled', 'disabled')
                btn.style.backgroundColor = '#c40000'
                btn.innerText = "获取验证码"
                return false
            }
            
        }.bind(this));
    }

    //监听多选框的true和false的值
    checkboxBtn() {
        let checkboxBtn = this.refs.checkboxBtn;
        let signIn = this.refs.signIn;
        if (checkboxBtn.checked == true) {
            signIn.removeAttribute('disabled', 'disabled')
            signIn.style.backgroundColor = '#c40000'
        } else {
            signIn.setAttribute('disabled', 'disabled')
            signIn.style.backgroundColor = '#ccc'
        }
    }
    //离焦输入手机验证码的时候
    blurPhone () {
        let validCaptcha = this.state.validCaptcha;
        if (!validCaptcha) {
            this.setState({
                validCaptcha: true
            })
        }
    }
    // 提交注册信息
    submitHandler() {
        let uname = this.refs.uname.value.trim(),
            pwd = this.refs.pwd.value.trim(),
            phone = this.refs.phone.value.trim(),
            picCode = this.refs.picCode.value.trim(),
            vercode = this.refs.vercode.value.trim(),
            validName = this.state.validName,
            validPwd = this.state.validPwd,
            twicePwd = this.state.twicePwd,
            validTel = this.state.validTel,
            validCaptcha = this.state.validCaptcha
        if (validName && validPwd && twicePwd && validTel && validCaptcha && picCode) {
            if (!uname) return message.error("请确认用户名是否正确")
            if (!pwd) return message.error("请确认密码是否正确")
            if (!phone) return message.error("请确认手机号码是否正确")
            if (!picCode) return message.error("图片验证码不能为空")
            if (!vercode) return message.error("手机验证码不能为空")
            axios.post('/user/register', qs.stringify({
                uname: uname,
                pwd: pwd,
                phone: phone,
                vercode: vercode
            })).then(function (res) {
                switch (res.data.status) {
                    case 200:
                        message.success("恭喜您注册成功，即将为您转跳到登录页")
                        this.context.router.push('/Login')
                        location.reload()
                        break;
                    case 403:
                        this.setState({
                            validCaptcha: false
                        })
                        break;
                    default:
                        message.error(res.data.message)
                        break;
                }

            }.bind(this))
        } else {
            message.error("请填写正确的用户信息")
        }

    }
    //获取图片验证码
    getPicCaptcha() {
        axios.post('user/getimg')
            .then(function (res) {
                this.setState({
                    captcha: base + res.data.attachment.IMGCode,
                    codeUUID: res.data.attachment.codeUUID
                })
            }.bind(this))
        
    }
    //组件加载完的时候注册按钮不能点击
    componentDidMount() {
        let signIn = this.refs.signIn;
        signIn.setAttribute('disabled', 'disabled')
        signIn.style.backgroundColor = '#ccc'
        //组件加载完调用图片验证码
        this.getPicCaptcha()
    }

    // enter键提交注册
    keySubmit(e) {
        if (e.keyCode === 13) {
            this.submitHandler()
        }
    }

    render() {
        return (
            <div>
                <div className="register-box">
                    <div className="register-body">
                        <div className="register-logo">
                            <div><img src={src}/></div>
                        </div>
                        <div className="register-cont">
                            <div className="form-box">
                                <div className="input-box">
                                    <label htmlFor="">昵称</label>
                                    <div className="input-cont">
                                        <input type="text" ref="uname"
                                               className={this.state.validName && !this.state.hasUname ? '' : 'wrong'}
                                               placeholder="请输入您的昵称" maxLength="30"
                                               onBlur={this.hasUname.bind(this)}
                                               onInput={this.checkUnique.bind(this)}
                                        />
                                        {this.state.validName ? "" :
                                            <span className="warn">*昵称为2~30位汉字、数字和字母的组合</span>}

                                    </div>
                                </div>
                            </div>
                            <div className="form-box">
                                <div className="input-box">
                                    <label htmlFor="">创建密码</label>
                                    <div className="input-cont">
                                        <input type="password" ref="pwd"
                                               className={this.state.validPwd ? '' : 'wrong'}
                                               placeholder="请设置您的密码" maxLength="16"
                                               onInput={this.checkPassword.bind(this)}
                                               onBlur={this.checkTwicePwd.bind(this)}
                                        />
                                        {this.state.validPwd ? '' : <span className="warn">*密码由6-18数字、字母和特殊字符组成</span> }
                                    </div>
                                </div>
                            </div>
                            <div className="form-box">
                                <div className="input-box">
                                    <label htmlFor="">确认密码</label>
                                    <div className="input-cont">
                                        <input type="password" ref="twicePwd"
                                               className={this.state.twicePwd ? '' : 'wrong'}
                                               placeholder="请确认您的密码" maxLength="16"
                                               onInput={this.checkTwicePwd.bind(this)}
                                               onBlur={this.checkTwicePwd.bind(this)}
                                        />
                                        {this.state.twicePwd ? '' : <span className="warn">*两次密码输入不一致</span> }
                                    </div>
                                </div>
                            </div>
                            <div className="form-box">
                                <div className="input-box">
                                    <label htmlFor="">手机号</label>
                                    <div className="input-cont">
                                        <input type="text" ref="phone"
                                               className={this.state.validTel && !this.state.hasPhone ? '' : 'wrong'}
                                               placeholder="请输入您的手机号码" maxLength="11"
                                               onInput={this.checkPhone.bind(this)}
                                               onBlur={this.hasPhone.bind(this)}
                                        />
                                        {this.state.validTel ? '' : <span className="warn">*手机号码输入错误</span> }
                                        { this.state.hasPhone ? <span className="warn">*手机号码已被使用</span> : '' }
                                    </div>
                                </div>
                            </div>























                             <div className="form-box" style={{marginBottom: '10px'}}>
                                <div className="input-box">
                                    <label htmlFor="">图片验证码</label>
                                    <div className="input-cont yz-box">
                                        <input type="text" ref="picCode" placeholder="请输入验证码"
                                               className={this.state.PicCaptcha ? '' : 'wrong'}
                                        />
                                        {this.state.PicCaptcha ? '' : <span className="warn">*验证码输入错误</span> }
                                    </div>
                                    <div className="yzcode" style={{width: '120px'}}>
                                        <img src={this.state.captcha} onClick={this.getPicCaptcha.bind(this)} alt=""/>
                                    </div>
                                </div>
                            </div>































                            <div className="form-box" style={{marginBottom: '10px'}}>
                                <div className="input-box">
                                    <label htmlFor="">手机验证码</label>
                                    <div className="input-cont yz-box">
                                        <input type="text" ref="vercode" placeholder="请输入验证码"
                                               className={this.state.validCaptcha ? '' : 'wrong'}
                                               onKeyDown={this.keySubmit.bind(this)}
                                               onBlur={this.blurPhone.bind(this)}
                                        />
                                        {this.state.validCaptcha ? '' : <span className="warn">*验证码输入错误</span> }
                                    </div>
                                    <div className="yzcode" style={{width: '120px'}}>
                                        <button onClick={this.getCaptcha.bind(this)} ref="captcha">验证码</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-box" style={{margin: '10px 0'}}>
                                <div className="input-box">
                                    <label htmlFor=""></label>
                                    <div className="input-cont  user-protocol">
                                        <input onChange={this.checkboxBtn.bind(this)} ref="checkboxBtn"
                                               type="checkbox"/>我已经阅读并同意
                                        <Link to="/agreement">《12链网站用户协议》</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="form-box no-margin">
                                <div className="input-box">
                                    <label htmlFor=""></label>
                                    <div className="input-cont">
                                        <button ref="signIn" onClick={this.submitHandler.bind(this)}>注册</button>
                                    </div>
                                </div>
                            </div>
                            <div className="go-login">
                                已有账号？去
                                <Link to="/login" className="warn">登录</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


Register.contextTypes = {
    router: React.PropTypes.object
}

