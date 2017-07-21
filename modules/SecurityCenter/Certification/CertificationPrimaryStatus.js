// CertificationStatus 实名认证状态
import React from 'react';
import { userInfoInCertification } from '../../Redux/Action/CertificationAction'
import '../../../css/certificationstatus'

export default class CertificationPrimaryStatus extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(userInfoInCertification())
    }
    //这里判断只要是等级认证不等于0同时状态也必须满足不等于0，就显示这个组件
    render() {
        const { gradeVal, isAuthPrimary, name, country, idNumber  } = this.props

        return (
            <div className={gradeVal == 0 && isAuthPrimary == 0 ? "hide certification-cont status-main" : "show certification-cont status-main"}>
                <div className="certification-info status-box">
                    <div className="info-type country">国籍：</div>
                    <div className="info-msg">{country}</div>
                </div>
                <div className="certification-info">
                    <div className="info-type name">姓名：</div>
                    <div className="info-msg">{name}</div>
                </div>
                <div className="certification-info">
                    <div className="info-type card">身份证号：</div>
                    <div className="info-msg">{idNumber}</div>
                </div>
                <div className="info-status">
                    <button className={isAuthPrimary == 2  ? 'success' : ''}>{isAuthPrimary == 2 ? '已认证' : ''}</button>
                </div>
            </div>
        )
    }
}