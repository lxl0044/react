// 右侧个人委托信息
import React from 'react';
import { Link } from 'react-router'
import { Tabs, Modal, message } from 'antd'
import { cancelTradingOrder } from '../../Redux/Action/DealCenterAction'
const TabPane = Tabs.TabPane
import DelegateFinish from './DelegateFinish'
import { formatNumber } from '../../../tools/utils'
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";
var md5 = require('../../../tools/MD5.js')

let orderNo
export default class Delegate extends React.Component {

	state = {
        visible: false
	}

    // 展示输入交易密码
    handleCancel = (e) => {
		const { dispatch } = this.props
		dispatch({type: 'CLOSE_DELEGATE_PWD_BOX'})
    }

	// 点击撤单
	delHandler (index) {
		const { pwdStatus, dispatch } = this.props
		const { currencyId } = this.props.cates.current

		let info = {
            currencyId: currencyId,
            orderNo: index,
            fdPassword: '',
            source: 1
		}

		if(pwdStatus === "2") { // 无需交易密码
            return dispatch(cancelTradingOrder(dispatch, info))
		}
		orderNo = index
        dispatch({type: 'OPEN_DELEGATE_PWD_BOX'})
	}

	// 输入密码，确定撤单
    submitHandler = () => {
		const uid = localStorage.getItem('uid')
		let dealpwd = md5(this.refs.dealpwd.value.trim() + dealSalt + uid)
		if(!this.refs.dealpwd.value) return message.error('请输入交易密码')

		const { dispatch } = this.props
        const { currencyId } = this.props.cates.current
		let info = {
            currencyId: currencyId,
            orderNo: orderNo,
            fdPassword: dealpwd,
            source: 1
		}
		dispatch(cancelTradingOrder(dispatch, info, this.refs.dealpwd))
	}

    goDelegation = () => {
        const { dispatch } = this.props
        const { currencyId } = this.props.cates.current
        dispatch({type: 'CHOOSE_ACTIVE_TAB', id: currencyId})
    }

	render () {
		const { tradeFail } = this.props.delegateRecord
		const { visible } = this.props
        const { pointPrice, pointNum } = this.props.cates.current

		const items = tradeFail.map((item, index) => {
			return <ul key={`delegate${index}`}>
				<li className={item.buyOrSell === 1 ? 'green' : 'warn'}>{item.buyOrSell === 1 ? '买入' : '卖出'}</li>
				<li>{formatNumber(item.price, pointPrice)}</li>
				<li>{formatNumber(item.num, pointNum)}</li>
				<li>{item.status === 2 ?
					<span>已完成</span> : item.status === 1 ?
						<span>部分成交</span> : <span>未成交</span>
                }</li>
				<li><a href="javascript:;" onClick={this.delHandler.bind(this, item.orderNo)}>撤销</a></li>
			</ul>
		})

		return (
			<Tabs tabBarExtraContent={<Link to="/delegation" onClick={this.goDelegation}>更多</Link>}>
			    <TabPane tab="未成交委托" key="1">
			    	<div className="delegate-items-will">
						<div className="delegate-items-will-title">
							<ul className="clearfix">
								<li>类型</li>
								<li>委托价格</li>
								<li>剩余数量</li>
								<li>状态</li>
								<li>操作</li>
							</ul>
						</div>
						<div className="delegate-items-will-cont">
							{ items }
						</div>
			    	</div>
					<Modal title={'确认交易密码'}
						   visible={visible}
						   onCancel={this.handleCancel}
						   footer={null}>
						<div className="alert-cont">
							<div className="input-area">
								<label htmlFor="">交易密码</label>
								<div className="input-box" style={{width: '200px'}}>
									<input type="password" ref="dealpwd" placeholder="设置交易密码"/>
								</div>
							</div>
							<div className="input-area">
								<button style={{width: '200px', marginLeft: '110px'}}
										onClick={this.submitHandler}
								>确定</button>
							</div>
						</div>
					</Modal>
			    </TabPane>
			    <TabPane tab="当日成交记录" key="2">
					<DelegateFinish { ...this.props }/>
			    </TabPane>
		  	</Tabs>

		)
	}
	
}

