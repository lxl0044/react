import React from 'react';

export default class PayInform1 extends React.Component {
    render() {
        return (
            <div className="PayInform1 WithdrawCNYInfo-PayInform1">
                <div className="PayInform1Title">
                    <span>提现须知</span>
                </div>
                <div className="WithdrawCNYMain WithdrawCNYInfo">
                    <p>
                        <span>最低提现金额为：</span>
                        <span className="warn">{this.props.amountLowLimit}元。</span>
                        {/*<span>当前每日最高可提现</span>*/}
                        {/*<span className="warn">{this.props.amountHighLimit}元</span>*/}
                    </p>
                    <p> 提现手续费为：<span className="warn"> {this.props.fee * 100}%</span></p>
                    <p>到账时间：<span>1. 工作日：09:00-17:00申请的提现会在24小时内到账，具体到账时间会因收款银行略有不同。</span></p>
                    <p>2. 周末或节假日的提现申请会在下一个工作日处理。</p>
                    <p>安全提示：<span>1. 提现请使用本人银行卡账号收款。</span></p>
                    <p>
                        2.为了您的资金安全，在修改交易密码后24小时不允许提现。
                    </p>
                    <p>
                        3.根据国家反洗钱政策规定，为保障客户资金安全，平台将对系统检测出的异常账户进行安全认证。
                    </p>
                    <p className="warn">
                        特别提示：为了充分保障您的账户及资金安全，12链平台（Beta版）近期将提现时间调整为每工作日16:00之前，其他时间提交的申请将顺延至下个工作日受理。请合理安排提现时间，感谢您的支持与配合。
                    </p>
                </div>
            </div>
        )
    }
}