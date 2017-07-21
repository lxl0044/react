import React from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import Tips from '../Common/Tips/Tips'
import DelegationInfo from './DelegationInfo'
import { delegationCoinList, delegationDetails, getPersonalTradingPwd } from '../Redux/Action/DelegationAction'
import { getBeforeDate } from '../../tools/utils'
import './delegation.css'
import btc from '../../images/btc_logo.png'
import ltc from '../../images/ltc_logo.png'
import twct from '../../images/12ct-withdraw.png'
import etc from '../../images/etc_logo.png'
import { img } from './../host'


const TabPane = Tabs.TabPane

class Delegation extends React.Component {


	//以后列表多了在这在处理
    tabSwitch (key) {
		// console.log(key)
	}


	componentDidMount() {
        document.body.scrollTop = 0
		const { dispatch } = this.props

		dispatch(getPersonalTradingPwd())
		dispatch(delegationCoinList()) // 币种列表

		let info = {
            beginTime:getBeforeDate(1),
            endTime:getBeforeDate(),
			start:1,
            size:10,
            buyOrSell:0,//不限0买入1卖出2
            currencyId:2,//币种
            status:10,//10全部,0未成交,1部分成交,2全部成交,3委托失败,4全部撤单,5部分成交后撤单,
            type:1//限价1市价2
		}

		dispatch(delegationDetails(dispatch,info))
	}

	render () {
		const { coinList } = this.props
        let list = coinList.map((cur,index,arr) => {
            return <TabPane tab={<span><img src={img + cur.icoUrl} alt=""/>{cur.currencyNameEn}</span>} key={parseInt(index.toString() + 1)}>
			</TabPane>
        })
		return (
			<div className="delegation">
				<div className="delegation-box">
					<Tips />
				</div>
				<div className="delegation-cont">
					<div className="delegation-details">
						<Tabs defaultActiveKey="1" onChange={this.tabSwitch}>
							{list}
					    </Tabs>
						<DelegationInfo { ...this.props }/>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(state => {
	return {
		...state.delegation
	}
})(Delegation)
