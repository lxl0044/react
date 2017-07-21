import React from 'react';
import BtcPay from './BtcPay'


export default class SecurityCenterPayCNY extends React.Component {
    render() {
        return (
            <div className="SecurityCenterPayCNY">
                <BtcPay  {...this.props}/>
                <div className="btc_info">
                    <div className="btc_info_title">
                        <span>充币须知</span>
                    </div>
                    <div className="btc_info_mian">
                        <p className="btc_info_mian_first">到账时间：充值12CT到上述地址后，需要12CT网络节点的确认，在网络确认后即可到账。</p>
                        <p className="warn">重要提示：<span>1.禁止向12CT地址充值除12CT之外的资产，任何充入12CT地址的非12CT资产将不可找回。</span></p>
                        <p>2.您的12CT充值地址不会频繁改变，可以重复充值，如有更改，我们会通过网站公告或邮件通知您。</p>
                    </div>
                </div>
                
            </div>
        )
    }
}