import React from 'react';
import {Icon, Switch, Modal, message} from 'antd';
import axios from 'axios'
import qs from 'qs'
import { isResPwdWord }  from '../../Redux/Action/SecurityCenterAction'
var md5 = require('../../../tools/MD5.js')
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";

export default class SecurityCenterMainSetDealPwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openALert:false,//控制弹窗
            pwdText: true
        }
    }

    handleCancel() {
        this.setState({
            openALert: false
        })
    }

    //开关的改变
    onChange(checked) {
        const {isValidatePass} = this.props
        //isValidatePass,0未设置1已设置
        if (isValidatePass === 0) {
            message.error("请先设置交易密码")
            return false

        } else {
            this.setState({
                openALert:true
            })
        }

    }

    //点击确定
    clkFunc() {
        const { jyPwdEnabled,dispatch } = this.props
        const uid = localStorage.getItem("uid")
        let jyCode = md5(this.refs.jyCode.value.trim() + dealSalt + uid)
        let open = jyPwdEnabled ? "2" : "1"
        axios.post('/user/updateFdPwdEnabled', qs.stringify({
            fdPwd:jyCode,
            enabled:open
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    //清空input的值
                    this.refs.jyCode.value = ''
                    //成功的时候再次请求接口改变开关的状态
                    dispatch(isResPwdWord(dispatch))
                    this.setState({
                        openALert: false
                    })
                } else {
                    message.error(res.data.message)
                }
            }.bind(this))
    }


    componentDidMount() {

        const { dispatch } = this.props
        dispatch(isResPwdWord(dispatch))
        this.setState({
            //一开始根据后台返回的状态判断按钮是开还是关，但是弹框必须是关着
            //因为不可能一进来就让弹框出来openALert:false
            openALert:false
        })
    }

    render() {
        const { jyPwdEnabled } = this.props
        return (
            <li>
                <div className="SecurityCenterMainResDealPwd">
                    {jyPwdEnabled ? <Icon type="unlock" className="success DealPwdLock"/> :
                        <Icon type="lock" className="warn DealPwdLock"/>}
                    <span className="setting-title">交易时输入交易密码设置</span>
                    <Switch checkedChildren={'开'} unCheckedChildren={'关'} onChange={this.onChange.bind(this)}
                            checked={jyPwdEnabled}/>
                    <div style={{display: 'inline'}}>
                        <Modal title={"输入交易密码"} visible={this.state.openALert}
                               onCancel={this.handleCancel.bind(this)} footer={null}>
                            <div className="alert-cont">
                                <div className="input-area">
                                    <label htmlFor="">交易密码</label>
                                    <div className="input-box thin-box">
                                        <input type="password" ref="jyCode" placeholder="请输入交易密码"
                                               className={this.state.pwdText ? '' : 'wrong'}/>
                                        {this.state.pwdText ? '' : <span>*交易密码输入错误</span>}
                                    </div>
                                    <div className="box-holder"></div>
                                </div>
                                <div className="input-area">
                                    <button className="ResDealPwdButton" onClick={this.clkFunc.bind(this)}>确定</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </li>
        )
    }
}
