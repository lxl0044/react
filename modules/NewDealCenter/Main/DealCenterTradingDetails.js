import React from 'react'
import Item from './TradingDetailItem'
import {
    dealCenterDelegateDetails,
    dealCenterLastestTrading,
    dealCenterOffTrading,
    offDelegateDetails
} from '../../Redux/Action/DealCenterAction'
import {formatNumber} from "../../../tools/utils"


function formatDate(time) {
    let h, m, s
    h = new Date(time).getHours()
    m = new Date(time).getMinutes()
    s = new Date(time).getSeconds()

    return `${h >= 10 ? h : '0' + h}:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s }`
}

export default class DealCenterTradingDetails extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props
        const currencyId = sessionStorage.getItem('currencyId') || '2'

        dispatch(dealCenterDelegateDetails(dispatch, currencyId))
        dispatch(dealCenterLastestTrading(dispatch, currencyId))
    }

    componentDidUpdate() {
        let sell = this.refs.sell
        let buy = this.refs.buy
        let length = sell.children.length
        let stack = this.refs.stack
        let stackHeight = getComputedStyle(stack, null).height

        if(length * 20 <= parseInt(stackHeight)) {
            sell.style.height = `${length * 20}px`
        } else {
            sell.style.height = '100%'
        }

        const {sellFinish} = this.props
        if (sellFinish) return // 如果卖队列已经初始化完成了，就不再往后执行

        sell.scrollTop = sell.scrollHeight
        buy.scrollTop = 0
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(dealCenterOffTrading())
        dispatch(offDelegateDetails())
        dispatch({type: 'INIT_TRADING_DATA'})// 重置最新成交列表
        dispatch({type: 'RESET_TRADING_STACK'})// 重置卖队列滚动条位置
    }


    render() {
        const buyStack = this.props.detailsBuy
        const sellStack = this.props.detailsSell
        const {pointNum, pointPrice, currentAmount, changeRate} = this.props.cates.current
        const {boxColor, boxTopColor, color} = this.props.style
        const {tradingData} = this.props

        const buys = buyStack.records.map((item, index) => {
            return <Item {...item} index={index} type={buyStack.type} pointNum={pointNum} pointPrice={pointPrice}
                         dispatch={this.props.dispatch}/>
        })

        const sells = sellStack.records.map((item, index) => {
            return <Item {...item} index={sellStack.records.length - index - 1} type={sellStack.type}
                         pointNum={pointNum} pointPrice={pointPrice} dispatch={this.props.dispatch}/>
        })

        const records = tradingData.map(item => {
            return <ul className="clearfix">
                <li>{formatDate(item.time)}</li>
                <li className={item.buyOrSell === 1 ? 'green' : 'warn'}>{formatNumber(item.current, pointPrice)}</li>
                <li>{formatNumber(item.amount, pointNum)}</li>
            </ul>
        })

        return (
            <div className="new-dealcenter-trading-details fl clearfix" style={{backgroundColor: `${boxColor}`}}>
                <div className="trading-waiting-lists fl">
                    <div className="trading-buy-stack" style={{color: `${color}`}} ref="stack">
                        <div className="buy-stack-cont" ref="sell">
                            {sells}
                        </div>
                    </div>
                    <div className={ changeRate >= 0 ? "vertical text-center green" : "vertical text-center warn" } style={{backgroundColor: `${boxTopColor}`}}>
                        <p>{formatNumber(currentAmount, pointPrice)}</p>
                    </div>
                    <div className="trading-sell-stack" style={{color: `${color}`}} ref="buy">
                        {buys}
                    </div>
                </div>
                <div className="trading-success-records fl" style={{color: `${color}`}}>
                    <ul className="clearfix" style={{backgroundColor: `${boxTopColor}`}}>
                        <li>时间</li>
                        <li>价格</li>
                        <li>数量</li>
                    </ul>
                    <div className="success-records-cont">
                        {records}
                    </div>
                </div>
            </div>
        )
    }
}