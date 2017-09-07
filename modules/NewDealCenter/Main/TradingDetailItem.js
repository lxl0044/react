import React from 'react'
import { formatNumber } from "../../../tools/utils"
import { getDealWaitingPrice } from '../../Redux/Action/DealCenterAction'


export default class DealCenterTradingItem extends React.Component {

    clickHandler (type,price) {
        let info = {
            type:type,
            price:price
        }
        const { dispatch } = this.props
        dispatch(getDealWaitingPrice(dispatch,info))
    }

    render () {
        const { number, current, index, type, pointPrice, pointNum } = this.props

        return (
            <dl onClick={this.clickHandler.bind(this,type,formatNumber(current, pointPrice))}>
                <dt style={{width: `${ number * current / 200 }%`}}></dt>
                <dd>
                    <ul className="clearfix">
                        <li className={ type == 1 ? 'green' : 'warn' }>{ type === 1 ? '买' : '卖' }{ `(${index + 1})` }</li>
                        <li>{ formatNumber(current, pointPrice) }</li>
                        <li>{ formatNumber(number, pointNum) }</li>
                    </ul>
                </dd>
            </dl>
        )
    }
}
