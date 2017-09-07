import React from 'react';
import BtcPay from './BtcPay'

export default class SecurityCenterPayCNY extends React.Component {
    render() {
        const {coinFee} = this.props.coinInfo
        const payCoinNum = sessionStorage.getItem('payCoinNum')
        return (
            <div className="SecurityCenterPayCNY">
                <BtcPay  {...this.props} currencyNameEn={this.props.currencyNameEn}/>
                <div className="btc_info">
                    <div className="btc_info_title">
                        <span>充币须知</span>
                    </div>
                    <div className="btc_info_mian">

                        { parseFloat(coinFee) ? <p className="warn">手续费：<span>{`${coinFee}个`} { this.props.currencyId === 4 ? <span>(充值数量小于0.1，可视为手续费全部扣除)</span> : null } </span></p>
                            :
                            <p>手续费：<span>无</span></p>
                        }
                        <p className="btc_info_mian_first">
                            到账时间：充值<span>{this.props.currencyNameEn}</span>到上述地址后，需要<span>{this.props.currencyNameEn}</span>网络节点的确认，在网络确认后即可到账。
                        </p>
                        <p className="warn">
                            重要提示：<span>1.禁止向<span>{this.props.currencyNameEn}</span>地址充值除<span>{this.props.currencyNameEn}</span>之外的资产，任何充入<span>{this.props.currencyNameEn}</span>地址的非<span>{this.props.currencyNameEn}</span>资产将不可找回。</span>
                        </p>
                        <p>2.您的<span>{this.props.currencyNameEn}</span>充值地址不会频繁改变，可以重复充值，如有更改，我们会通过网站公告或邮件通知您。</p>
                    </div>
                </div>

            </div>
        )
    }
}