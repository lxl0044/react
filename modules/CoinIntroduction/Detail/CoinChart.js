import React from 'react'
import echarts from 'echarts'
import { introduceChart } from '../../../tools/chartsConfig'

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
export default class IntroduceChart extends React.Component {

    componentDidMount() {
        const { realtime } = this.props
        let charts = this.refs.chart
        myCharts = echarts.init(charts)

        // 初始化行情图
        myCharts.setOption(introduceChart(formatData(realtime)));
    }

    componentDidUpdate () {
        const { realtime } = this.props
        myCharts.setOption(introduceChart(formatData(realtime)));
    }


    render () {
        return (
            <div className="introduce-coin-chart" ref="chart">

            </div>
        )
    }
}
