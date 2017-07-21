import React from 'react';
import { Icon } from 'antd';
import { addCoinAddress } from '../../../Redux/Action/WithDrawAction'
var md5 = require('../../../../tools/MD5.js')
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";


export default class Withdraw12CTAlert extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			address:true,
			remark:true,
			pwd:true
        }
    }

	//点击关闭
	clickHandler () {
        let address = this.refs.address
        let remark = this.refs.remark
        let pwd = this.refs.pwd
        address.value = ''
        remark.value = ''
        pwd.value = ''
		//点击传送一个值给父级
		const { dispatch } = this.props
		dispatch({type: 'CLOSE_ADD_ADDRESS'})
		document.body.style.overflow = 'auto'
	}
	// 离焦的时候判断提币地址
	addressFunc () {
		let address = this.refs.address.value.trim()
		if (!address) {
			this.setState({
				address:false
			})
			return false
		} else {
			this.setState({
				address:true
			})
		}
	}
	// 离焦的时候判断地址备注
	remarkFunc () {
		let remark = this.refs.remark.value.trim()
		if (!remark) {
			this.setState({
				remark:false
			})
			return false
		} else {
			this.setState({
				remark:true
			})
		}
	}
	// 离焦的时候判断资金密码
	pwdFunc () {
		let pwd = this.refs.pwd.value.trim()
		if (!pwd) {
			this.setState({
				pwd:false
			})
			return false
		} else {
			this.setState({
				pwd:true
			})
		}
	}
	//确定添加
	sureFunc () {
		const uid = localStorage.getItem('uid')
		let address = this.refs.address.value.trim()
		let remark = this.refs.remark.value.trim()
        let pwd = md5(this.refs.pwd.value.trim() + dealSalt + uid)
		if (!address) {
			this.setState({
				address:false
			})
			return false
		}
		if (!remark) {
			this.setState({
				remark:false
			})
			return false
		}
		if (!pwd) {
			this.setState({
				pwd:false
			})
			return false
		}
		const { dispatch } = this.props
		let info = {
            address: address,
			note: remark,
			fdPwd: pwd,
			currencyId: 2
		}
		dispatch(addCoinAddress(dispatch,info))
	}
    render() {

        return (
            <div className={this.props.alert ? "hide Withdraw12CTAlert" : "show Withdraw12CTAlert"}>
                <div className="withdraw-address-alert">
					<div className="withdraw-address-alert-box">
						<div className="withdraw-address-alert-top"></div>
						<div className="withdraw-address-alert-icon clearfix">
                             <span className="fl warn">添加提币地址</span><span className="fr warn"><Icon type="close-circle-o" onClick={this.clickHandler.bind(this)} /></span>
                         </div>
                         <div className="withdraw-address-alert-address">
                         	<span>提币地址：</span><input placeholder="请填写提币地址" onBlur={this.addressFunc.bind(this)} ref="address" type="text"/>
                         	{this.state.address ? <span className="hide warn withdraw-address-alert-hint">*提币地址填写错误</span> : <span className="show warn withdraw-address-alert-hint">*提币地址填写错误</span>}
                         </div>
                         <div className="withdraw-address-alert-remark">
                         	<span>地址备注：</span><input placeholder="请填写地址备注" onBlur={this.remarkFunc.bind(this)} ref="remark" type="text" maxLength='6'/>
                         	{this.state.remark ? <span className="hide warn withdraw-address-alert-hint">*地址备注填写错误</span> : <span className="show warn withdraw-address-alert-hint">*地址备注填写错误</span>}
                         </div>
                         <div className="withdraw-address-alert-pwd">
                         	<span>交易密码：</span><input placeholder="请填写交易密码" onBlur={this.pwdFunc.bind(this)} ref="pwd" type="password"/>
                         	{this.state.pwd ? <span className="hide warn withdraw-address-alert-hint">*资金密码填写错误</span> : <span className="show warn withdraw-address-alert-hint">*资金密码填写错误</span>}
                         </div>
                         <div className="withdraw-address-alert-button">
                         	<button className="warn" onClick={this.sureFunc.bind(this)}>确定</button>
                         </div>
					</div>
                </div>
            </div>
        )
    }
}