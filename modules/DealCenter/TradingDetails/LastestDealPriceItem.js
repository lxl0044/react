import React from 'react'
import { formatNumber } from '../../../tools/utils'


function formatDate(time) {
    let h, m, s
    h = new Date(time).getHours()
    m = new Date(time).getMinutes()
    s = new Date(time).getSeconds()

    return `${h >= 10 ? h : '0' + h}:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s }`
}

function compareAmount(data) {
    if (!data.length) return data
    data.forEach(function (item, index, arr) {
        if (index === arr.length - 1 || !item.current) return
        if (item.current - arr[index + 1].current >= 0) {
            item.style = 'green'
        } else if (item.current - arr[index + 1].current < 0) {
            item.style = 'warn'
        }
    })
    return data
}

const LastestDealPriceItem = (props) => {
    const list = compareAmount(props.tradingData).map(function (item, index) {
        return <ul key={`trading${index}`}>
            <li>{formatDate(item.time)}</li>
            <li className={item.style}>{formatNumber(item.current, 2)}</li>
            <li>{formatNumber(item.amount, 4)}</li>
        </ul>
    })
    return (
        <div className="clearfix">
            {list}
        </div>
    )
}

export default LastestDealPriceItem