import React from 'react';

export default class PayInform3 extends React.Component {
    render() {
        const { amountHighLimit, amountLowLimit } = this.props.authConfig.authConfig
        return (
            <div className="PayInform3">
                <div className="PayInform3Title">
                    <span>充值须知</span>
                </div>
                <div className="PayInform3Way">
                    <span>汇款方式：在线支付充值</span><span className="warn">（暂不支持支付宝及其他三方支付，否则将导致无法入账）</span>
                </div>
                <div className="PayInformMoneys">
                    <p>充值金额：单笔最低充值金额为<span className="warn">{amountLowLimit}元</span></p>
                </div>
                <div className="PayInform3Safety">
                    <p><span>到账时间：</span>1.<span className="warn">在22点前汇款成功后会在40分钟内到账，22点之后将在第二天到账。</span> 如资金未能及时到账，请提供支付凭证联系客服查询。</p>
                    <p >2. <span className="warn"> 请严格按照页面提示的金额及银行卡信息汇款，金额包括小数点后两位，若金额不匹配，可能会导致资金延迟到账。</span>
                    </p>
                    <p>3. 请使用您在平台绑定的本人银行卡汇款。使用非本人的银行卡账号汇款资金将无法入账。</p>
                    <p>4. 农业银行和交通银行，因银行原因到账时间会有一定延迟。</p>
                    <p>到账延迟处理时间：客服将在48小时内完成处理。</p>
                </div>
            </div>
        )
    }
}