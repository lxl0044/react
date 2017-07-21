import React from 'react'
import {Icon, Checkbox, Upload, message} from 'antd';
import {submitSeniorAuth} from '../../Redux/Action/CertificationAction'
import {UpLoadImgHost} from '../../host';

import positiveCard from './../../../images/against.png'
import against from './../../../images/positiveCard.png'
import handCard from './../../../images/handCard.png'


export default class CertificationHighField extends React.Component {

    state = {
        checked: true,
        positiveImage: '',
        positiveImageCode: '',
        oppositeImage: '',
        oppositeImageCode: '',
        handImage: '',
        handImageCode: '',
        sex: '',
        birthDay: true,
        profession: true,
        nation: true,
        address: true
    }

    //验证出生年月日
    birthDay() {
        let birthDay = this.refs.birthDay.value.trim()
        if (/^(16|17|18|19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/.test(birthDay)) {
            this.setState({
                birthDay: true
            })
        } else {
            this.setState({
                birthDay: false
            })
        }

    }

    //验证职业
    // profession () {
    //     let profession = this.refs.profession.value.trim() 
    //     if(/[\u4e00-\u9fa5]/gm.test(profession)) {
    //         this.setState({
    //             profession: true
    //         })
    //     } else {
    //         this.setState({
    //             profession:false
    //         })
    //     }
    // }
    // 验证民族
    nation() {
        let nation = this.refs.nation.value.trim()
        if (/[\u4e00-\u9fa5]/gm.test(nation)) {
            this.setState({
                nation: true
            })
        } else {
            this.setState({
                nation: false
            })
        }
    }

    // 验证地址
    // address () {
    //     let address = this.refs.address.value.trim()
    //     if(/[\u4e00-\u9fa5]/gm.test(address)) {
    //         this.setState({
    //             address: true
    //         })
    //     } else {
    //         this.setState({
    //             address:false
    //         })
    //     }
    // }


    // 复选框事件
    checkHandler(e) {
        let upload = this.refs.upload
        this.setState({
            checked: !this.state.checked
        })
        if (!e.target.checked) {
            upload.style.backgroundColor = '#ccc';
            upload.style.border = "1px solid #ccc"
            upload.setAttribute('disabled', 'disabled')
        } else {
            upload.style.backgroundColor = '#fff';
            upload.style.border = "1px solid #da161a"
            upload.removeAttribute('disabled', 'disabled')
        }
    }

    // 上传图片
    handleChange1 = (info) => {
        if (info.file.status === 'done') {
            this.setState({
                positiveImageCode: info.file.response.attachment
            })
            this.getBase64(info.file.originFileObj, positiveImage => this.setState({positiveImage}));
        }
    }
    // 上传图片
    handleChange2 = (info) => {
        if (info.file.status === 'done') {
            this.setState({
                oppositeImageCode: info.file.response.attachment
            })
            this.getBase64(info.file.originFileObj, oppositeImage => this.setState({oppositeImage}));
        }
    }
    // 上传图片
    handleChange3 = (info) => {
        if (info.file.status === 'done') {
            this.setState({
                handImageCode: info.file.response.attachment
            })
            this.getBase64(info.file.originFileObj, handImage => this.setState({handImage}));
        }
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
        //判断是否IE浏览器
        if (isIE) {
            let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            let fIEVersion = parseFloat(RegExp["$1"]);
            IE9 = fIEVersion == 9.0;
            if (IE9) {
                return true
            }
        }
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        if (!isJPG) {
            message.error('只能选择图片上传')
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小必须小于2M');
        }
        return isJPG && isLt2M;

    }

    // 上传资料
    uploadAuth() {
        let sex = this.state.sex//性别
        let address = this.refs.address.value.trim()//地址
        let birthday = this.refs.birthDay.value.trim()//出生日期
        let profession = this.refs.profession.value.trim()//职业
        let nation = this.refs.nation.value.trim()//民族
        let positiveImageCode = this.state.positiveImageCode
        let oppositeImageCode = this.state.oppositeImageCode
        let handImageCode = this.state.handImageCode
        // 判断那些input输入框再点击提交的时候，不正确就不让它跳转
        let ouTbirthDay = this.state.birthDay//出生年月日
        let professions = this.state.profession//职业
        let nations = this.state.nation//民族
        let addresss = this.state.address//地址


        if (!sex) return message.error('请选择性别')
        if (!nation) return message.error('请填写民族')
        if (!profession) return message.error('请填写职业')
        if (!birthday) return message.error('请填写出生日期')
        if (!address) return message.error('请填写地址')
        if (!ouTbirthDay) return message.error('出生日期填写错误')
        if (!professions) return message.error('职业填写错误')
        if (!addresss) return message.error('地址填写错误')
        if (!nations) return message.error('民族填写错误')
        if (!positiveImageCode) return message.error('请检查身份证正面照片')
        if (!oppositeImageCode) return message.error('请检查身份证反面照片')
        if (!handImageCode) return message.error('请检查手持身份证照片')

        let info = {
            gender: sex,
            birthday: birthday,
            occupation: profession,
            positiveImage: positiveImageCode,
            oppositeImage: oppositeImageCode,
            handImage: handImageCode,
            nation: nation,
            location: address
        }
        const {dispatch} = this.props
        dispatch(submitSeniorAuth(dispatch, info))
    }

    //获取性别
    handleChangeSex = (e) => {
        this.setState({
            sex: e.target.value
        })
    }

    render() {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        return (
            <div className="input-field">
                <div>
                    <div className="input-area show" style={{margin: '0'}}>
                        <label htmlFor="">性别</label>
                        <div className="input-sexBox">
                            <input className="checkbox-sex" type="radio" name="sex" value="1"
                                   onClick={this.handleChangeSex.bind(this)}/><span>男</span>
                            <input className="checkbox-sex" type="radio" name="sex" value="2"
                                   onClick={this.handleChangeSex.bind(this)}/><span>女</span>
                        </div>
                    </div>
                    <div className="high-left fl">
                        <div className="input-area">
                            <label htmlFor="">民族</label>

                            <div className="input-box">
                                <input type="text" ref="nation" maxLength="30" placeholder="请填写民族"
                                       onBlur={this.nation.bind(this)}
                                       className={this.state.nation ? '' : 'wrong'}
                                />
                                {this.state.nation ? ' ' : <span className="warn show">*民族填写错误</span>}
                            </div>
                        </div>

                        <div className="input-area">
                            <label htmlFor="">职业</label>
                            <div className="input-box">
                                <input type="text" ref="profession" maxLength="30" placeholder="请填写职业"

                                       className={this.state.profession ? '' : 'wrong'}
                                />
                                {this.state.profession ? ' ' : <span className="warn show">*职业填写错误</span>}
                            </div>
                        </div>
                    </div>
                    <div className="high-right fl">
                        <div className="input-area">
                            <label htmlFor="">出生日期</label>
                            <div className="input-box">
                                <input type="text" ref="birthDay" maxLength="30" placeholder="出生日期xxxx-xx-xx"
                                       onBlur={this.birthDay.bind(this)}
                                       className={this.state.birthDay ? '' : 'wrong'}
                                />
                                {this.state.birthDay ? ' ' : <span className="warn show">*出生日期格式xxxx-xx-xx</span>}
                            </div>
                        </div>
                        <div className="input-area">
                            <label htmlFor="">常用地址</label>
                            <div className="input-box">
                                <input type="text" ref="address" maxLength="30" placeholder="请填写地址"

                                       className={this.state.address ? '' : 'wrong'}
                                />
                                {this.state.address ? ' ' : <span className="warn show">*地址填写有误</span>}
                            </div>
                        </div>
                    </div>
                    <div className="high-text">
                        <p>照片要求：</p>
                        <p>1. 照片文件大小不能超过2M！文件格式须为jpg或者png、jpeg！</p>
                        <p>2. 请确保照片无水印，无污渍，身份信息清晰，头像完整，非文字反向照片！</p>
                    </div>
                    <div className="high-card clearfix">
                        <div className="input-area fl">
                            <label htmlFor="" className="label-img">身份证正面照片</label>
                            <div className="input-box IDcard-box">
                                <Upload
                                    className="IDcard"
                                    name="file"
                                    showUploadList={false}
                                    action={UpLoadImgHost + '?token=' + token + '&uid=' + uid}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange1}
                                >
                                    {
                                        this.state.positiveImage ?
                                            <img src={this.state.positiveImage} alt=""/> : <Icon type="plus-circle-o"/>
                                    }
                                </Upload>
                            </div>
                        </div>
                        <div className="input-area fl">
                            <label htmlFor="" className="label-img">身份证背面照片</label>
                            <div className="input-box IDcard-box">
                                <Upload
                                    className="IDcard"
                                    name="file"
                                    showUploadList={false}
                                    action={UpLoadImgHost + '?token=' + token + '&uid=' + uid}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange2}
                                >
                                    {
                                        this.state.oppositeImage ?
                                            <img src={this.state.oppositeImage} alt=""/> : <Icon type="plus-circle-o"/>
                                    }
                                </Upload>
                            </div>
                        </div>
                        <div className="input-area fl">
                            <label htmlFor="" className="label-img">手持身份证照片</label>
                            <div className="input-box IDcard-box">
                                <Upload
                                    className="IDcard"
                                    name="file"
                                    showUploadList={false}
                                    action={UpLoadImgHost + '?token=' + token + '&uid=' + uid}
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange3}
                                >
                                    {
                                        this.state.handImage ?
                                            <img src={this.state.handImage} alt=""/> : <Icon type="plus-circle-o"/>
                                    }
                                </Upload>
                            </div>
                        </div>
                    </div>
                    <div className="card-example-box">
                        <div className="clearfix">
                            <span className="fl text-center">
                                请确保证件上文字清晰可识别
                            </span>
                            <span className="fl text-center">
                                请确保证件上文字清晰可识别
                            </span>
                            <span className="fl">
                                <span>五官可见，证件全部信息清晰无遮拦 最佳拍摄位置：</span>
                                <span>手持身份证距手机摄像头50cm以内</span>
                            </span>
                        </div>
                        <div>
                            <img src={against} alt=""/>
                            <img src={positiveCard} alt=""/>
                            <img src={handCard} alt=""/>
                            <Icon type="check-circle" className="green"/>
                            <Icon type="check-circle" className="green"/>
                            <Icon type="check-circle" className="green"/>
                        </div>
                    </div>
                    <div className="input-area high-warning warn">
                        <p>*提交后无法修改，请确认以上信息准确！</p>
                    </div>
                    <div className="warn serve-time">
                        *人工审核时间为每天09:00-20:00，为了更好、更有效的帮您处理；请严格按照审核要求尽量在工作时间提交相关信息。
                    </div>
                    <div className="input-area no-margin">
                        <label htmlFor=""></label>
                        <div className="input-box no-border checkbox">
                            <Checkbox
                                onChange={this.checkHandler.bind(this)}
                                checked={this.state.checked}
                            >
                                我承诺所提供的资料为本人所有，不存在盗用别人资料的情况。
                            </Checkbox>
                        </div>
                    </div>
                    <div className="input-area no-margin">
                        <label htmlFor=""></label>
                        <div className="input-box no-border">
                            <button className="no-margin warn" ref="upload" onClick={this.uploadAuth.bind(this)}>提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}