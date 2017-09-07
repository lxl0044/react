import React from 'react'
import {formatNumber} from "../../../tools/utils"

export default (props) => {
    return (
        <div className="introduce-coin-info">
            <div className="introduce-coin-name clearfix">
                <h1 className="fl">{props.currencyName}/{props.currencyNameEn}</h1>
                <div className={ props.changeRate >= 0 ? 'green fl' : 'warn fl' }>{ props.changeRate >= 0 ? `+${props.changeRate}%` : `${props.changeRate}%` }</div>
            </div>
            <div className="introduce-coin-data clearfix">
                <ul className="fl">
                    <li>最新价格：<span className={ props.changeRate >= 0 ? 'green' : 'warn' }>{ `￥${formatNumber(props.currentAmount, props.pointPrice)}` }</span></li>
                    <li>最高价：{ `￥${formatNumber(props.highPrice, props.pointPrice)}` }</li>
                    <li>最低价：{ `￥${formatNumber(props.lowPrice, props.pointPrice)}` }</li>
                    <li>24H成交量：{formatNumber(props.volume, props.pointNum)}</li>
                </ul>
                <ul className="fl">
                    <li>24H成交额：{ `￥${formatNumber(props.amount, props.pointPrice)}` }</li>
                    <li>持仓账号数：{props.positionCount}</li>
                    <li>人均持币数：{formatNumber(props.avgPosition, props.pointNum)}</li>
                    <li>持仓总币数：{formatNumber(props.positionSum, props.pointNum)}</li>
                </ul>
            </div>
        </div>
    )
}
