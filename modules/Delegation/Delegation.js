import React from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
import Tips from '../Common/Tips/Tips'
import DelegationInfo from './DelegationInfo'
import { delegationCoinList, delegationDetails, getPersonalTradingPwd, switchCurrencyId } from '../Redux/Action/DelegationAction'
import { getBeforeDate } from '../../tools/utils'
import './delegation.css'
import { img } from './../host'


const TabPane = Tabs.TabPane

class Delegation extends React.Component {

    state = {
        current:1//分页每次切换的时候
    }

	//以后列表多了在这在处理
    tabSwitch (key) {
		const { dispatch } = this.props
        let info = {
            beginTime:getBeforeDate(1),
            endTime:getBeforeDate(),
            start:1,
            size:10,
            buyOrSell:0,//不限0买入1卖出2
            currencyId: parseInt(key),//币种
            status:10,//10全部,0未成交,1部分成交,2全部成交,3委托失败,4全部撤单,5部分成交后撤单,
            type:1//限价1市价2
        }
        this.setState({
            current:1
        })
        dispatch(switchCurrencyId(dispatch, key)) // 切换币种时，切换币种id
		dispatch(delegationDetails(dispatch, info))
        dispatch(delegationCoinList(dispatch, parseInt(key))) // 币种列表
	}


	componentDidMount() {
        document.body.scrollTop = 0
		const { dispatch } = this.props
        const { startTime, endTime, currencyId } = this.props

		dispatch(getPersonalTradingPwd())
		dispatch(delegationCoinList(dispatch, currencyId)) // 币种列表

		let info = {
            beginTime:startTime._i,
            endTime:endTime._i,
			start:1,
            size:10,
            buyOrSell:0,//不限0买入1卖出2
            currencyId:currencyId,//币种
            status:10,//10全部,0未成交,1部分成交,2全部成交,3委托失败,4全部撤单,5部分成交后撤单,
            type:1//限价1市价2
		}

		dispatch(delegationDetails(dispatch,info))
	}
    //接收子组件传过来的页数
    nextModules (page) {
        this.setState({
            current:page
        })
    }
	render () {
		const { coinList, currencyId } = this.props

        let list = coinList.map((cur,index,arr) => {
            return <TabPane tab={<span><img src={img + cur.icoUrl} alt=""/>{cur.currencyNameEn}</span>} key={`${cur.currencyId}`}>
			</TabPane>
        })
		return (
			<div className="delegation">
				<div className="delegation-box">
					{/*<Tips />*/}
				</div>
				<div className="delegation-cont">
					<div className="delegation-details">
						<Tabs defaultActiveKey={`${currencyId}`} onChange={this.tabSwitch.bind(this)}>
							{list}
					    </Tabs>
						<DelegationInfo nextModules={this.nextModules.bind(this)} current={this.state.current} { ...this.props }/>
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
