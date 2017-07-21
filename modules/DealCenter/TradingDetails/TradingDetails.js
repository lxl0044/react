import React from 'react';
import { connect } from 'react-redux'
import LastestDealWaiting from './LastestDealWaiting'
import LastestDealPrice from './LastestDealPrice'
import { dealCenterDelegateDetails, dealCenterLastestTrading } from '../../Redux/Action/DealCenterAction'
import { img } from '../../host'

class TradingDetails extends React.Component {

	componentDidMount () {
		const { dispatch } = this.props

		dispatch(dealCenterDelegateDetails(dispatch, '2'))
		dispatch(dealCenterLastestTrading(dispatch, '2'))
	}


	render () {
		return (
			<div className="trading-details">
				<div className="trading-details-box clearfix">
					<LastestDealWaiting { ...this.props }/>
					<LastestDealPrice { ...this.props }/>
				</div>
			</div>
		)
	}
}
export default connect(state => {
	return {
		...state.dealcenterRealtime
	}
})(TradingDetails)
