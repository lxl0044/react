import React from 'react'
import Info from './CoinInfo'
import Chart from './CoinChart'

export default (props) => {
    return (
        <div className="introduce-coins-details">
            <Info { ...props.quote }/>
            <Chart realtime={props.realtime} />
        </div>
    )
}
