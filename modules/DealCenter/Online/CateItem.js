import React from 'react';
import { img } from '../../host'
import { emitMsgForCates, dealCenterDelegateDetails, dealCenterLastestTrading, lisntenPersonalTradingPrice } from '../../Redux/Action/DealCenterAction'

export default class CateItem extends React.Component {

    changeCoinInfo (coinCode) {
		const { dispatch } = this.props
		dispatch(emitMsgForCates(dispatch, coinCode))
		// dispatch(klineEmitMsgForRealtime(dispatch, 3, coinCode))
        dispatch(dealCenterDelegateDetails(dispatch, coinCode))
        dispatch(dealCenterLastestTrading(dispatch, coinCode))
		dispatch(lisntenPersonalTradingPrice(dispatch, coinCode))
	}

	render () {

		const { coinCode, changeRate, currencyName, icoUrl } = this.props

		return (
			<li className="cate-item" onClick={this.changeCoinInfo.bind(this,coinCode)}>
				<div className="cate-item-box">
					<div className="cate-item-box-title">
						<div className="border-line"></div>
						<dl>
							<dd><img src={img + icoUrl} /></dd>
							<dd>{currencyName}</dd>
							<dd className={ changeRate > 0 ? 'green' : 'warn'}>{changeRate}%</dd>
						</dl>
					</div>
				</div>
			</li>
		)
	}
}
