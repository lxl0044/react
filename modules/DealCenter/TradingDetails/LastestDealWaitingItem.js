import React from 'react'
import ProcessBuy from './ProcessBuy'
import ProcessSell from './ProcessSell'
import { formatNumber } from '../../../tools/utils'


const LastestDealWaitingItem = (props) => {

        const { type, records } = props
        const list = records.map(function (record, index) {
            return <ul className="clearfix" key={`delegate${index}`}>
				<li className={ type === 1 ? "green" : "warn"}>{ type === 1 ? "买" : "卖"}({index + 1})</li>
				<li>{formatNumber(record.current, 2)}</li>
				<li>{formatNumber(record.number, 4)}</li>
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

export default LastestDealWaitingItem



