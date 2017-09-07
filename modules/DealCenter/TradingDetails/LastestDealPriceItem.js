import React from 'react'
import { formatNumber } from '../../../tools/utils'


function formatDate(time) {
    let h, m, s
    h = new Date(time).getHours()
    m = new Date(time).getMinutes()
    s = new Date(time).getSeconds()

    return `${h >= 10 ? h : '0' + h}:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s }`
}

const LastestDealPriceItem = (props) => {
    const { pointPrice, pointNum } = props.cates.current
    const list = props.tradingData.map(function (item, index) {
        return <ul key={`trading${index}`} className="clearfix">
            <li>{formatDate(item.time)}</li>
            <li className={item.buyOrSell === 1 ? 'green' : 'warn'}>{formatNumber(item.current, pointPrice)}</li>
            <li>{formatNumber(item.amount, pointNum)}</li>
        </ul>
    })
    return (
        <div className="clearfix">
            {list}
        </div>
    )
}

export default LastestDealPriceItem