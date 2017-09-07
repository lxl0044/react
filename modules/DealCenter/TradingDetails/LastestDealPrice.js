import React from 'react'
import LastestDealPriceItem from './LastestDealPriceItem'


const LastestDealPrice = (props) => {
	return (
		<div className="lastest-deal-price fr">
			<div className="lastest-deal-price-top">
				<span>最新成交</span>
			</div>
			<div className="lastest-deal-price-cont">
				<div className="price-cont-top clearfix">
					<ul>
						<li>时间</li>
						<li>成交价格(￥)</li>
						<li>数量</li>
					</ul>
				</div>
				<div className="lastest-deal-price-box">
					<LastestDealPriceItem { ...props }/>
				</div>
			</div>
		</div>
	)
}

export default LastestDealPrice