import React from 'react';
import {message} from 'antd';
import '../../../css/certificationhigh'
import CertificationHighStatus from './CertificationHighStatus'
import CertificationHighField from './CertificationHighField'


export default class CertificationHigh extends React.Component {

    //当我点击高级认证的时候，外层有个遮罩层的时候
    handleHighFunc() {
        message.error("初级认证通过之后才能高级认证")
    }

    render() {
        const {showInfo} = this.props

        return (
            <div className="CertificationHigh">
                <div className="input-area">
                    <span className="CertificationHighName">高级认证(KYC2)</span>
                </div>
                {
                    showInfo ? <CertificationHighField {...this.props}/> :
                        <CertificationHighStatus {...this.props}/>
                }
                <div className={this.props.gradeVal > 0 ?
                    "hide CertificationHigh-tier" : "show CertificationHigh-tier"}
                     onClick={this.handleHighFunc.bind(this)}></div>
            </div>
        )
    }
}