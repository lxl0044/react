import React from 'react';
import { submitJuniorAuth } from '../../Redux/Action/CertificationAction'
import '../../../css/certificationprimary'
import { message } from 'antd';
import CertificationPrimaryStatus from './CertificationPrimaryStatus'

export default class CertificationPrimary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validName: true,//验证姓名
            validIDCard: true//验证身份证号
        }
    }
        // 验证姓名
    checkName () {
        let name = this.refs.name.value.trim()
        if(/[\u4e00-\u9fa5]/gm.test(name)) {
            this.setState({
                validName: true
            })
        } else {
            this.setState({
                validName: false
            })
        }
    }
    // 验证身份证
    checkIDCard() {
        let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
        let value = this.refs.IDCard.value.trim()
        if (reg.test(value)) {
            this.setState({
                validIDCard: true
            })
        } else {
            this.setState({
                validIDCard: false
            })
        }
    }
    //点击提交按钮
    clkFunc () {
        const { dispatch } = this.props
        let name = this.refs.name.value.trim();//姓名
        let country = this.refs.country.value.trim();//获取国籍
        let DignityIdCard = this.refs.DignityIdCard.value.trim();//身份证类型
        let IDCard = this.refs.IDCard.value.trim();//身份证号
        let validIDCard = this.state.validIDCard//验证身份证号
        let validName = this.state.validName//姓名

        if(!validName) return message.error('姓名填写错误')
        if(!name) return message.error('请检查您的姓名')
        if(!IDCard) return message.error('请填写您的身份证号码')
        if(!validIDCard) return message.error('身份证号码填写错误')

        let info = {
            name: name,
            country: country,
            IDCard: IDCard
        }

        dispatch(submitJuniorAuth(dispatch, info))
    }
    // 在这里判断初级认证对应的相应地状态，显示什么
    render() {
        const { lose, gradeVal, isAuthPrimary } = this.props

        return (
            <div className="CertificationPrimary clearfix">
                <div className="input-area">
                    <span className="CertificationPrimaryName">初级认证(KYC1)</span>
                </div>
                <div className={gradeVal == 0 && isAuthPrimary == 0 ? "show" : "hide"}>
                    <div className="primary-left fl">
                        <div className="input-area">
                            <label htmlFor="">姓名</label>
                            <div className="input-box">
                                <input type="text" ref="name" maxLength="30" placeholder="请填写姓名"
                                    onBlur={this.checkName.bind(this)} 
                                    className={ this.state.validName ? '' : 'wrong' }
                                />
                                {this.state.validName ? ' ' : <span className="warn">*姓名填写错误</span>}
                            </div>
                        </div>
                         <div className="input-area">
                            <label htmlFor="">国籍</label>
                            <div className="input-box select-box">
                                <select name="" id="" ref="country">
                                    <option value="中国">中国</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="primary-right fl">
                         <div className="input-area">
                            <label htmlFor="">证件类型</label>
                            <div className="input-box select-box">
                                <select name="" id="" ref="DignityIdCard">
                                    <option value="身份证">身份证</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-area" style={{margin: '0'}}>
                            <label htmlFor="">证件号</label>
                            <div className="input-box">
                                <input type="text" ref="IDCard" placeholder="请填写身份证号"
                                       className={this.state.validIDCard ? '' : 'wrong'}
                                       onBlur={this.checkIDCard.bind(this)}
                                />
                                {this.state.validIDCard ? '' : <span className="warn">*身份证号码错误</span>}
                            </div>
                        </div>
                    </div>
                    <div className="CertificationPrimaryBtn fl">
                        <div className={lose ? "hide CertificationPrimaryLose" : "show CertificationPrimaryLose warn"}>*资料认证失败，请重新认证</div>
                        <button className="warn" onClick={this.clkFunc.bind(this)}>提交</button>
                    </div>
                </div>
                <CertificationPrimaryStatus { ...this.props }/>
            </div>
        )
    }
}