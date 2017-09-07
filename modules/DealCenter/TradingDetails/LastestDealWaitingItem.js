import React from 'react'
import ProcessBuy from './ProcessBuy'
import ProcessSell from './ProcessSell'
import { formatNumber } from '../../../tools/utils'
import { getDealWaitingPrice } from '../../Redux/Action/DealCenterAction'

export default class LastestDealWaitingItem extends React.Component {


    clickHandler (type,price) {
		let info = {
            type:type,
            price:price
		}
        const { dispatch } = this.props
        dispatch(getDealWaitingPrice(dispatch,info))
	}

    render () {
        const { type, records } = this.props
        const { pointPrice, pointNum } = this.props.current
        const list = records.map((record, index) => {
            return <ul className="clearfix" key={`delegate${index}`} onClick={this.clickHandler.bind(this,type,formatNumber(record.current, pointPrice))} style={{cursor:"pointer"}}>
				<li className={ type === 1 ? "green" : "warn"}>{ type === 1 ? "买" : "卖"}({index + 1})</li>
				<li>{formatNumber(record.current, pointPrice)}</li>
				<li>{formatNumber(record.number, pointNum)}</li>
				<li>
                    { type === 1 ? <ProcessBuy style={{width: `${record.number * record.current / 20000 * 100}%`}}/> :
						<ProcessSell style={{width: `${record.number * record.current / 20000 * 100}%`}}/>
                    }
				</li>
			</ul>
        })
        return (
			<div>
                { list }
			</div>
        )
    }
}
