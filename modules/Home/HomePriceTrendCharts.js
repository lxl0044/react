import React from 'react'
import echarts from 'echarts'
import { HomePriceTrendChartOptions } from '../../tools/chartsConfig'


let myCharts
export default class HomePriceTrendCharts extends React.Component {

    componentDidMount() {
        const { data } = this.props
        let charts = this.refs.charts
        myCharts = echarts.init(charts)
        // 初始化价格趋势图
        myCharts.setOption(HomePriceTrendChartOptions(data));
    }

    componentDidUpdate() {
        const { data } = this.props
        myCharts.setOption(HomePriceTrendChartOptions(data));
    }

    render () {

        return (
                <p ref="charts">

                </p>
        )
    }

}


