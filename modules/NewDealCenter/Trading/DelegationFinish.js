import React from 'react'
import { formatNumber } from '../../../tools/utils'

export default (props) => {

    const {tradeSuccess} = props.delegateRecord
    const { pointPrice, pointNum } = props.cates.current
    const {color, boxTopColor} = props.style

    const lists = tradeSuccess.map(function (item, index) {
        return <ul className="clearfix" key={`delegatefinish${index}`} style={index % 2 === 0 ? {backgroundColor: `${boxTopColor}`, color: `${color}`} : {backgroundColor: 'transparent', color: `${color}`}}>
            <li>{item.orderTime.split(' ')[1]}</li>
            <li className={item.buyOrSell === 1 ? 'green' : 'warn'}>{item.buyOrSell === 1 ? '买入' : '卖出'}</li>
            <li>{formatNumber(item.price,pointPrice)}</li>
            <li>{formatNumber(item.tradeAmount,2)}</li>
            <li>{formatNumber(item.num,pointNum)}</li>
        </ul>
    })


    return (
        <div className="new-delegation-finish">
            <div className="new-delegation-finish-head">
                <ul className="clearfix">
                    <li>时间</li>
                    <li>类型</li>
                    <li>价格</li>
                    <li>成交金额</li>
                    <li>数量</li>
                </ul>
            </div>
            <div className="new-delegation-finish-body">
                {lists}
            </div>
        </div>
    )
}

