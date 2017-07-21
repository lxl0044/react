import React from 'react'
import { Icon, Select, Radio } from 'antd'
import { toggleClass, addClass, removeClass } from '../../../tools/utils'
const Option = Select.Option
const RadioGroup = Radio.Group

import './aside.css'

import cleanw from '../../../images/clean_w.png'
import cleanr from '../../../images/clean_r.png'


export default class Aside extends React.Component {

	state = {
		active: false,
		value: 1,
	}
	

	// radio change
	radioChange = (e) => {
	    this.setState({
	      value: e.target.value,
	    });
	}

	// select handler
	selectHandler = () => {
		
	}

	changeToRed  = () => {
		this.setState({
			active: true
		})
	}

	changeToWhite = () => {
		this.setState({
			active: false
		})
	}
	
	// 切换侧边条显示隐藏
	toggleAside = () => {
		let wrapper = document.querySelector('#wrapper')
		let aside = this.refs.aside
		document.body.removeChild(wrapper)
		document.body.style.overflow = 'auto'
		toggleClass(aside, 'pull-left')
	}

	// 删除全部通知
	removeNotice = () => {
		let notice = this.refs.notice
		notice.innerHTML = ''
	}

	// 切换价格提醒
	togglePrice = () => {
		let price = this.refs.price
		let record = this.refs.record
		toggleClass(price, 'popup')
		removeClass(record, 'popup')
	}

	// 切换消息设置
	toggleRecord = () => {
		let record = this.refs.record
		let price = this.refs.price
		toggleClass(record, 'popup')
		removeClass(price, 'popup')
	}

	// 展开/收拢消息记录条目
	toggleRecordItem () {
		let items = this.refs.items.children
		Array.prototype.map.call(items, function (item) {
			item.onclick = function () {
				Array.prototype.map.call(items, function (el) {
					removeClass(el, 'spread')
				})
				addClass(this, 'spread')
			}
		})
	}

	componentDidMount() {
		this.toggleRecordItem()
	}

	render () {
		const { active } = this.state

		return (
			<div className="header-aside" id="aside" ref="aside">
				<div className="aside-top clearfix">
					<div className="toggle-aside fl" onClick={this.toggleAside}>
						<Icon type="right"/>
					</div>
					<div className="remove-notice fr">
						<a href="javascript:;" 
							onMouseEnter={this.changeToRed}
							onMouseLeave={this.changeToWhite}
							onClick={this.removeNotice}
						>
							<img src={active ? cleanr : cleanw} />
							全部清除
						</a>
					</div>
				</div>
				<div className="aside-notice" ref="notice">
					<div className="notice-item">
						<span className="warn">站内通知：</span>关于视频认真的通知,最多。 展示两行内容。
					</div>
					<div className="notice-item">
						<span className="warn">站内通知：</span>关于视频认真的通知,最多。 展示两行内容。
					</div>
					<div className="notice-item">
						<span className="warn">站内通知：</span>关于视频认真的通知,最多。 展示两行内容。
					</div>
					<div className="notice-item">
						<span className="warn">站内通知：</span>关于视频认真的通知,最多。 展示两行内容。
					</div>
				</div>
				<div className="price-settings">
					<button onClick={this.togglePrice}>价格提醒</button>
					<button onClick={this.toggleRecord}>设置记录(3)</button>
				</div>
				<div className="aside-remind">
					{/* 价格提醒 */}
					<div className="price-remind" ref="price">
						<div className="price-remind-top">
							<span className="warn">- </span>
							<span>价格提醒</span>
							<Icon type="down" onClick={this.togglePrice}/>
						</div>
						<div className="price-remind-cont">
							<div className="choose-coin">
								<label htmlFor="">选择币种：</label>
								<Select defaultValue="12CT" style={{ width: 160 }} onChange={this.selectHandler}>
							        <Option value="12CT">12CT</Option>
							        <Option value="TCL">TCL</Option>
							        <Option value="熵(ETP)">熵(ETP)</Option>
							        <Option value="LSK">LSK</Option>
							    </Select>
							</div>
							<div className="current-coin">
								<label htmlFor="">当前价格：</label>
								<span className="warn">¥20254.65CNY</span>
							</div>
							<div className="input-box clearfix">
								<input type="text" placeholder="最高价格" className="fl"/>
								<input type="text" placeholder="最低价格" className="fr"/>
							</div>
							<div className="remind-type">
								<span>附加提醒方式：</span>
								<RadioGroup onChange={this.radioChange} value={this.state.value} className="fr">
							        <Radio value={1}>短信</Radio>
							        <Radio value={2}>邮箱</Radio>
							    </RadioGroup>
							</div>
							<button>确定</button>
						</div>
					</div>
					{/* 设置记录 */}
					<div className="setting-record" ref="record">
						<div className="setting-record-top">
							<span className="warn">- </span>
							<span>设置记录</span>
							<Icon type="down" onClick={this.toggleRecord}/>
						</div>
						<div className="setting-record-cont" ref="items">
							<div className="setting-record-item spread">
								<div className="record-item-info">
									<span>比特币BTC</span>
									<span className="green">¥20280.00</span>
									<span className="warn">¥20210.00</span>
									<Icon type="delete" className="warn"/>
								</div>
								<div className="record-item-operate">
									<div className="input-box clearfix">
										<input type="text" placeholder="最高价格" className="fl green" />
										<input type="text" placeholder="最低价格" className="fr warn" />
									</div>
									<button>确认修改</button>
								</div>
							</div>
							<div className="setting-record-item">
								<div className="record-item-info">
									<span>比特币BTC</span>
									<span className="green">¥20280.00</span>
									<span className="warn">¥20210.00</span>
									<Icon type="delete" className="warn"/>
								</div>
								<div className="record-item-operate">
									<div className="input-box clearfix">
										<input type="text" placeholder="最高价格" className="fl green" />
										<input type="text" placeholder="最低价格" className="fr warn" />
									</div>
									<button>确认修改</button>
								</div>
							</div>
							<div className="setting-record-item">
								<div className="record-item-info">
									<span>比特币BTC</span>
									<span className="green">¥20280.00</span>
									<span className="warn">¥20210.00</span>
									<Icon type="delete" className="warn"/>
								</div>
								<div className="record-item-operate">
									<div className="input-box clearfix">
										<input type="text" placeholder="最高价格" className="fl green" />
										<input type="text" placeholder="最低价格" className="fr warn" />
									</div>
									<button>确认修改</button>
								</div>
							</div>
							<div className="setting-record-item">
								<div className="record-item-info">
									<span>比特币BTC</span>
									<span className="green">¥20280.00</span>
									<span className="warn">¥20210.00</span>
									<Icon type="delete" className="warn"/>
								</div>
								<div className="record-item-operate">
									<div className="input-box clearfix">
										<input type="text" placeholder="最高价格" className="fl green" />
										<input type="text" placeholder="最低价格" className="fr warn" />
									</div>
									<button>确认修改</button>
								</div>
							</div>
							<div className="setting-record-item">
								<div className="record-item-info">
									<span>比特币BTC</span>
									<span className="green">¥20280.00</span>
									<span className="warn">¥20210.00</span>
									<Icon type="delete" className="warn"/>
								</div>
								<div className="record-item-operate">
									<div className="input-box clearfix">
										<input type="text" placeholder="最高价格" className="fl green" />
										<input type="text" placeholder="最低价格" className="fr warn" />
									</div>
									<button>确认修改</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}