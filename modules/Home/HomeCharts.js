import React from 'react'
import echarts from 'echarts'
import { HomeChartsOptions } from '../../tools/chartsConfig'
import {initNumber} from '../../tools/utils'



function formatData (data = []) {
	let time = [],current= []
	for (var i = 0; i < data.length; i++) {
        time.push(data[i].time.slice(11,16))
        current.push(data[i].current)
	}
	return {
        time: time,
        current: current
	}
}
let myCharts
export default class HomeCharts extends React.Component {
	
	componentDidMount() {
        let { chart } = this.props.chart
        let charts = this.refs.charts
        myCharts = echarts.init(charts)

		// 初始化行情图
        myCharts.setOption(HomeChartsOptions(formatData(chart)));
	}

	componentDidUpdate () {
		const { chart } = this.props
        myCharts.setOption(HomeChartsOptions(formatData(chart)));
	}


	render () {
		const { currentAmount, changeRate, highPrice, lowPrice, volume, amount,positionCount,positionSum,avgPosition, pointPrice, pointNum } = this.props.info

		return (
			<div className="homecharts-data">
				<div className="homecharts-data-details">
					<ul className="clearfix">
						<li>最新价格: <span className={ changeRate >= 0 ? "green" : "warn"}>¥{initNumber(currentAmount, pointPrice)}</span></li>
						<li>今日涨跌幅: <span className={ changeRate >= 0 ? "green" : "warn"}>{changeRate >= 0 ? `+${initNumber(changeRate, 2)}` : `${initNumber(changeRate, 2)}`}%</span></li>
						<li>最高价：¥{initNumber(highPrice, pointPrice)}</li>
						<li>最低价：¥{initNumber(lowPrice, pointPrice)}</li>
						<li>平均成交价：¥{ !!(amount / volume) && parseInt(volume) !== 0 ? `${initNumber(amount / volume, pointPrice)}` : '0.00' }</li>
						<li>24H成交量：{initNumber(volume, pointNum)}</li>
						<li>{`24H成交金额：￥${initNumber(amount, pointPrice)}`}</li>
						<li>{`持仓账号数：${positionCount}`}</li>
						<li>{`人均持币数：${initNumber(avgPosition, pointNum)}`}</li>
						<li>{`持仓总币数：${initNumber(positionSum, pointNum)}`}</li>
					</ul>
				</div>
				<div className="homecharts-charts" ref="charts"></div>
			</div>
		)
	}

}


