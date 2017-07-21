import React from 'react'
import echarts from 'echarts'
import { requestRealTimeDetails } from '../Redux/Action/DealCenterAction'
import { HomeChartsOptions } from '../../tools/chartsConfig'
import {formatNumber} from '../../tools/utils'



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
		const { dispatch } = this.props
        let { chart } = this.props.chart
        let charts = this.refs.charts
        myCharts = echarts.init(charts)

		dispatch(requestRealTimeDetails())

		// 初始化行情图
        myCharts.setOption(HomeChartsOptions(formatData(chart)));

	}

	componentWillReceiveProps (nextProps) {
        myCharts.setOption(HomeChartsOptions(formatData(nextProps.chart)));
	}

	render () {
		const { currentAmount, changeRate, highPrice, lowPrice, volume, amount } = this.props.info

		return (
			<div className="homecharts-data">
				<div className="homecharts-data-details">
					<ul className="clearfix">
						<li>最新价格: <span className={ changeRate >= 0 ? "green" : "warn"}>¥{formatNumber(currentAmount, 4)}</span></li>
						<li>今日涨跌幅: <span className={ changeRate >= 0 ? "green" : "warn"}>{formatNumber(changeRate, 2)}%</span></li>
						<li>最高境：¥{formatNumber(highPrice, 4)}</li>
						<li>最低价：¥{formatNumber(lowPrice, 4)}</li>
						<li>24H成交量：¥{formatNumber(volume, 4)}</li>
						<li>平均成交价：¥{ !!(amount / volume) ? `${amount / volume}`.slice(0,4) : '0.00' }</li>
					</ul>
				</div>
				<div className="homecharts-charts" ref="charts"></div>
			</div>
		)
	}

}


