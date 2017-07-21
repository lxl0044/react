import React from 'react';
import { connect } from 'react-redux'
import Tips from '../Common/Tips/Tips'
import '../../css/dealcenter'
import comming from '../../images/comming.png'
import { img } from '../host'
import klineHolder from '../../images/kline_holder.png'
import tradingHolder from '../../images/trading_holder.png'
import tradingDetailsHolder from '../../images/trading_details_holder.png'


class DealCenter extends React.Component {

	render () {
		return (
			<div className="dealcenter">
				<div className="dealcenter-wrapper">
					<img src={comming} alt=""/>
				</div>
				<Tips />
				<div className="dealcenter-online" style={{backgroundImage: `url(${img}charts_bg.png)`}}>
					<img src={klineHolder} alt="" style={{width: '1200px', margin: '0 auto', display: 'block'}}/>
				</div>
				<div className="trading" style={{padding: '20px 0'}}>
					<img src={tradingHolder} alt="" style={{width: '1200px', margin: '0 auto', display: 'block'}}/>
				</div>
				<div className="trading-details" style={{backgroundImage: `url(${img}trading_bg.png)`, padding: '20px 0'}}>
					<img src={tradingDetailsHolder} alt="" style={{width: '1200px', margin: '0 auto', display: 'block'}}/>
				</div>
			</div>
		)
	}
}

export default connect(state => {
	return {
		...state.dealCenter
	}
})(DealCenter)