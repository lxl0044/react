// CertificationStatus 实名认证状态
import React from 'react';
import '../../../css/certificationhighstatus'

export default class CertificationHighStatus extends React.Component {
    //点击重新认证的时候
    resFunc () {
        const { dispatch } = this.props
        dispatch({type: 'CHANGE_CERTIFICATION_SHOWINFO'})
    }

    render () {
        const { authFailReason } = this.props

        return (
            <div className={ this.props.gradeVal == 1 && this.props.isAuthSenior == 0 ? 
                "certification-cont high-status-box" : "show certification-cont high-status-box"}
            >
                <div className="certification-info high-status-sex">
                    <div className="info-type">性别：</div>
                    <div className="info-msg">{this.props.gender == 1 ? "男" : this.props.gender == 2 ? "女" : ''}</div>
                </div>
                <div className="certification-info high-status-nation">
                    <div className="info-type">民族：</div>
                    <div className="info-msg">{this.props.nation}</div>
                </div>
                <div className="certification-info high-status-type">
                    <div className="info-type">职业：</div>
                    <div className="info-msg">{this.props.profession}</div>
                </div>
                <div className="certification-info high-status-birth">
                    <div className="info-type">出生日期：</div>
                    <div className="info-msg">{this.props.birthday}</div>
                </div>
                <div className="certification-info high-status-address">
                    <div className="info-type">常用地址：</div>
                    <div className="info-msg">{this.props.usualAddress}</div>
                </div>
                <div className="info-status high-status-status">
                    <button className={this.props.isAuthSenior == 2  ? 'success' : 'warn'}>
                    {   this.props.isAuthSenior == 1 ? '审核中...' : 
                        this.props.isAuthSenior == -1 ? '认证失败' : 
                        this.props.isAuthSenior == 2 ? '已认证' : ''
                    }
                    </button>
                </div>
                <div className={this.props.isAuthSenior == -1 ? " show status-lose text-left" : "hide status-lose text-left"}>
                    {/*<p className="warn">认证失败</p>*/}
                    <p className="warn">*{authFailReason}</p>
                </div>

                <div className={this.props.isAuthSenior == -1 ? "show high-status-btn" : "hide high-status-btn"}>
                    <button className="warn" onClick={this.resFunc.bind(this)}>重新认证</button> 
                </div>
            </div>
        )
    }
}




