import React from 'react';

export default class PayInform1 extends React.Component {
    render() {
        const { amountHighLimit, amountLowLimit ,fee} = this.props.authConfig.authConfig
        return (
            <div className="PayInform1">
                <div className="PayInform1Title">
                    <span>充值须知</span>
                </div>
                <div className="PayInformFee">
                    <p>手续费：<span className="warn">{fee * 100}%</span></p>
                </div>
                <div className="PayInform1Way">
                    <span>汇款方式：微信充值</span>
                </div>
                <div className="PayInformMoney">
                    <p>转账金额：单笔最低充值金额为<span>{amountLowLimit}元</span>，最高为<span>{amountHighLimit}元</span></p>
                </div>
                <div className="PayInform1Safety">
                    <p>安全须知：1.为了您的资产安全，请使用本人微信账号充值</p>
                    <p>2.如资金未能及时到账，请提供支付凭证联系客服查询</p>
                </div>
            </div>
        )
    }
}