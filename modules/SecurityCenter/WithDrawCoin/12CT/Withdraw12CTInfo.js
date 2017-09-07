import React from 'react';
import { formatNumber } from '../../../../tools/utils'

export default class Withdraw12CTInfo extends React.Component {
    render() {
        const { amountLowLimit,fee,currencyId } = this.props
        return (
            <div className="PayInform1">
                <div className="PayInform1Title">
                    <span>提币须知</span>
                </div>
                <div className="withdraw-main withdrawCT-info">
                    <p><span>最小提币数量为：</span><span className="warn">{amountLowLimit}个</span></p>
                    <p><span>提币手续费：</span><span className="warn">{formatNumber(fee *100,2)}%</span><span className="warn">{currencyId === 5 ? "（小数部分视为1.0收取）" : ""}</span></p>
                    <p>到账时间：提交提币申请，待网络确认后，即可到账。</p>
                    <p>安全提示：<span>1.为了您的资金安全，在修改交易密码后24小时不允许提币。</span></p>
                    <p>2.根据国家反洗钱政策规定，为保障客户资金安全，平台将对系统检测出的异常账户进行安全认证。</p>
                </div>
            </div>
        )
    }
}
