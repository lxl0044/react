// CertificationContent 实名认证
import React from 'react';
import CertificationPrimary from './CertificationPrimary'
import CertificationHigh from './CertificationHigh'

export default class CertificationContent extends React.Component {

    ////这是第二层 在这里拿到用户等级，和等级对应的相应状态，传下去
    render() {
        return (
            <div className="certification-cont">
                <CertificationPrimary { ...this.props }/>
                <CertificationHigh { ...this.props }/>
            </div>
        )
    }
}