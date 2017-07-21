import React from 'react'
import LastestDealWaitingItem from './LastestDealWaitingItem'

const LastestDealWaiting = (props) => {
	return (
		<div className="lastest-deal-waiting fl">
			<div className="lastest-deal-waiting-top">
				<span>最新成交价 </span><h3 className={props.cates.current.changeRate >=0 ? 'green' : 'warn'}>{props.cates.current.currentAmount}</h3>
			</div>
			<div className="lastest-deal-waiting-cont">
				<div className="waiting-cont-top clearfix">
					<div className="deal-waiting-title">
						<ul>
							<li className="green">买入</li>
							<li>价格(￥)</li>
							<li>委托数量</li>
							<li></li>
						</ul>
					</div>
					<div className="deal-waiting-title">
						<ul>
							<li className="warn">卖出</li>
							<li>价格(￥)</li>
							<li>委托数量</li>
							<li></li>
						</ul>
					</div>
				</div>

				<div className="lastest-deal-waiting-box clearfix">
					<div className="lastest-deal-waiting-cate fl">
						<div className="lastest-deal-waiting-item">
							{/*买入*/}
							<LastestDealWaitingItem { ...props.detailsBuy }/>
						</div>
					</div>
					<div className="lastest-deal-waiting-cate fr">
						<div className="lastest-deal-waiting-item">
							{/*卖出*/}
							<LastestDealWaitingItem { ...props.detailsSell }/>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default LastestDealWaiting