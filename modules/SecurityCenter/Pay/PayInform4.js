import React from 'react';

export default class PayInform3 extends React.Component {
    render() {
        const { amountHighLimit, amountLowLimit,fee } = this.props.authConfig.authConfig
        return (
            <div className="PayInform3">
                <div className="PayInform3Title">
                    <span>充值须知</span>
                </div>
                <div className="PayInform3Way">
                    <span>汇款方式：代理充值</span>
                </div>
                <div className="PayInformMoneys">
                    <p>充值金额：单笔最低充值金额为<span className="warn">100元</span></p>
                </div>
                <div className="PayInformMoneys">
                    <p>充值记录：代理充值完成后系统将会生成充值成功订单，充值完成前请保留充值凭证</p>
                </div>
                <div className="PayInformMoneys">
                    <p>代充手续费：<span>无</span></p>
                </div>
                <div className="PayInformMoneys">
                    <p>代充时间：09:00-23:00</p>
                </div>
                <div className="PayInformMoneys">
                    <p>安全须知：<span>1.为了您的资产安全，请使用本人的支付宝账号充值</span></p>
                    <p>2.如资金未能及时到账，请提供支付凭证联系客服查询</p>
                </div>
                <div className="PayInform3Safety">
                    <p className="warn">
                        <span>风险提示：</span>
                        <span>数字货币价格波动较大，其交易存在较大风险（预挖、暴涨暴跌、庄家操控、团队解散、技术缺陷等），12链严格执行《关于</span>
                        <span className="show" style={{paddingLeft:"71px"}}>防范比特币风险的通知》等政策法规，依法为数字货币投资者提供自由交易平台，但对币的价值不做任何投资承诺，请您投资</span>
                        <span style={{paddingLeft:"71px"}}>前对数字货币充分认知，理性判断自己的投资能力，审慎做出投资决策！</span>
                    </p>
                </div>
            </div>
        )
    }
}