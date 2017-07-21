import React from 'react';
import { Icon } from 'antd'
import { img } from '../../host'
import {Link} from 'react-router'

export default class CateItem extends React.Component {

	clickHandler =  (e) => {
		e.stopPropagation();
		const { dispatch } = this.props
        dispatch({type: 'CHANGE_CATES_SPREAD'})
	}

	render () {
		let { spread } = this.props
		const { currentAmount, changeRate, highPrice, lowPrice, volume, currencyNameEn, icoUrl } = this.props.cates.current

		return (
			<li className="cate-item">
				<div className={spread ? "cate-item-box item-box-spread spread" : "cate-item-box item-box-open"}  ref="cont">
					<div className="cate-item-box-title">
						<div className="border-line"></div>
						<dl>
							<dd><img src={img + icoUrl} /></dd>
							<dd>{currencyNameEn}</dd>
							<dd className={ changeRate >= 0 ? "green" : "warn" }>{changeRate}%</dd>
						</dl>
					</div>
					<div className="cate-item-box-cont">
						<dl className="lastest-price">
							<dd>最新价格</dd>
							<dd>¥ <span className={ changeRate >= 0 ? "green" : "warn" }>{currentAmount}</span></dd>
							<dd>最高价／最低价</dd>
							<dd>{highPrice} / {lowPrice}</dd>
						</dl>
						<dl className="detail">
							<dd>24H成交量</dd>
							<dd>{currencyNameEn}：{volume}</dd>
							<Link to="/delegation" className="warn">成交记录</Link>
						</dl>
					</div>
				</div>
				<div className="toggle-arrow text-center" onClick={this.clickHandler}>
					<span>其他币种</span>
					{spread ? <Icon type="down" /> : <Icon type="up" />}
				</div>
			</li>
		)
	}
}
