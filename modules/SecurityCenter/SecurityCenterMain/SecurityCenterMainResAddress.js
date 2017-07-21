import React from 'react';
import { Icon,message,Cascader,Modal } from 'antd';
import axios from 'axios'
import qs from 'qs'
import areas from '../../../tools/areas'

let token = localStorage.getItem("token")
let uid = localStorage.getItem("uid")
const options = areas;
let province = '';
let city = '';
let county = '';
export default class SecurityCenterMainResAddress extends React.Component {
	constructor(props){
        super(props);
        this.state = {
        	blurName:true,
        	validRecPhone: true,
       		validPostCode: true,
       		visible: false

        }
    }


	onChange(value,obj) {
        province = obj[0].label;
        city = obj[1].label;
        county = obj[2].label;
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
     //这个方法是在常用地址姓名中离焦的时候判断
    blurFunc () {
        let uname = this.refs.uname.value.trim()
        if (!uname) {
            this.setState({
                blurName:false
            })
        } else {
            this.setState({
                blurName:true
            })
        }
    }
    // 验证常用地址手机号
    checkRecPhone() {
        let phone = this.refs.recPhone.value.trim()
        if (/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
            this.setState({
                validRecPhone: true
            })
        } else {
            this.setState({
                validRecPhone: false
            })
        }
    }
     // 检测邮编是否符合规范
    checkPostCode () {
        let postCode = this.refs.postcode.value.trim()
        if(!/\d{6}$/.test(postCode)) {
            this.setState({
                validPostCode: false
            })
        } else {
            this.setState({
                validPostCode: true
            })
        }
    }
	// 重设地址
    resetAddress() {

        let hasAddress =  this.props.hasAddress
        let uname = this.refs.uname.value.trim()
        let recPhone = this.refs.recPhone.value.trim()
        let postcode = this.refs.postcode.value.trim()
        let validPostCode = this.state.validPostCode
        let location = this.refs.location.value.trim()
        let { uaid } = this.props.address
        let reg = /^1(3|4|5|7|8)\d{9}$/
        //如果userInfo上有地址返回1，没有返回0
        if(!province && !city && !county) return message.error('请选择您的地址')
        if (hasAddress) {
            //如果判断有一个输入格式不对就提示，如果判断有常用地址，就在这里更新
            if (!uname || !recPhone || !postcode || !validPostCode || !location || !reg.test(recPhone)) {
                message.error("请检查您填写的信息")
            } else {
                //验证通过发送请求
                axios.post('/user/update/address', qs.stringify({
                    name:uname,
                    phone:recPhone,
                    postCode:postcode,
                    country:province,
                    city:city, 
                    town:county,
                    location:location,
                    uaid:uaid
                    })
                )
                .then(function (res) {
                    //如果状态等于200修改成功
                    if (res.data.status == 200) {
                        message.success("修改地址成功")
                        window.location.reload()
                    } 
                    }.bind(this))
                }
            } else {
                //如果没有设置地址就在这里设置
                if (!uname || !recPhone || !postcode || !location || !reg.test(recPhone)) {
                    message.error("请填写完整信息")
                } else {
                    //验证通过发送请求
                    axios.post('/user/address', qs.stringify({
                        name:uname,
                        phone:recPhone,
                        postCode:postcode,
                        country:province,
                        city:city,
                        town:county,
                        location:location
                        })
                    )
                    .then(function (res) {
                        //如果状态等于200修改成功
                        if (res.data.status == 200) {
                            message.success("修改地址成功")
                            window.location.reload()
                        } 
                        }.bind(this))
                    }
                }
        
    }

	render() {
        const { hasAddress } = this.props
        const { country, city, town } = this.props.address

		return (
            <li>
                <div className="SecurityCenterMainResAddress">
                {hasAddress ? <Icon type="check-circle" className="success"/> :
                    <Icon type="exclamation-circle" className="warn"/>}
                    <span className="setting-title">常用地址</span>
                    <span style={{marginRight: '20px'}}>用于接收赠品</span>
                    <span>常用地址为：
                        <span>{country}-</span>
                        <span>{city}-</span>
                        <span>{town}</span>
                    </span>
                    <div style={{display: 'inline'}}>
                        <a href="javascript:;" onClick={this.showModal} className="fr resetPwd">{this.props.hasAddress ? "修改" : "设置"}</a>
                        <Modal title={'设置常用地址'} visible={this.state.visible}
                                   onCancel={this.handleCancel} footer={null}>
                            <div className="alert-cont">
                                <div className="input-area">
                                    <label htmlFor="">姓名</label>
                                    <div className="input-box">
                                        <input type="text" className={this.state.blurName ? '' : 'wrong'} ref="uname" placeholder="请输入收货人姓名" onBlur={this.blurFunc.bind(this)}/>
                                        {this.state.blurName ? '' : <span className="warn">*姓名是必填项</span>}
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="">手机号码</label>
                                    <div className="input-box">
                                        <input type="text" ref="recPhone"
                                               className={this.state.validRecPhone ? '' : 'wrong'}
                                               placeholder="请输入手机号码"
                                               onBlur={this.checkRecPhone.bind(this)}
                                        />
                                        {this.state.validRecPhone ? '' : <span>*手机号码输入错误</span>}
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="">邮编</label>
                                    <div className="input-box">
                                        <input type="text" ref="postcode" 
                                            placeholder="请输入邮编或000000" 
                                            className={this.state.validPostCode ? '' : 'wrong'}
                                            onBlur={this.checkPostCode.bind(this)}
                                               maxLength="6"
                                        />
                                        {this.state.validPostCode ? '' : <span>*邮编号码错误</span>}
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="">地址</label>
                                    <div className="input-box">
                                        <Cascader options={options} onChange={this.onChange.bind(this)}
                                                  placeholder="请选择" style={{margin: 0}}/>
                                    </div>
                                </div>
                                <div className="input-area">
                                    <label htmlFor="">详细地址</label>
                                    <div className="input-box">
                                        <input type="text" ref="location" placeholder="请输入详细地址"/>
                                    </div>
                                </div>
                                <div className="input-area">
                                    <button onClick={this.resetAddress.bind(this)}>确定</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
            </div>
            </li>
			
		)
	}
}