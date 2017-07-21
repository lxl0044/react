import React from 'react';
import echarts from 'echarts'
import { Icon } from 'antd'
import { connect } from 'react-redux'
// import { klineEmitMsgForRealtime } from '../../Redux/Action/DealCenterAction'
import {KlineOptions} from '../../../tools/chartsConfig'
import {siblings, removeClass, addClass} from '../../../tools/utils'
import OnlineRightSide from './OnlineRightSide'
import { img } from '../../host'


/**
 * @param time 时间戳
 */
function formatDateForKline (time) {
    let M,d,h,m
    M = new Date(time).getMonth()
    d = new Date(time).getDate()
    h = new Date(time).getHours()
    m = new Date(time).getMinutes()

    if(!h && !m) return `${M + 1 >= 10 ? M + 1 : '0' + (M + 1)}月${d >= 10 ? d : '0' + d}日`
    return `${h >= 10 ? h: '0' + h}:${m >= 10 ? m : '0' + m}`
}


// 数组处理
function splitData(rawData) {
    let datas = [],times = [],vols = [],macds = [],ma7 = [],ma30 = [],avgs = [],amount = [],msg
    if(rawData[0].length === 5) {
        for (let i = 0; i < rawData.length; i++) {
            times.push(formatDateForKline(rawData[i][0]))
            datas.push(rawData[i][1])
            avgs.push(rawData[i][2])
            amount.push(rawData[i][3])
            vols.push(rawData[i][4])
        }

        msg = {
            times: times,
            datas: datas,
            avgs: avgs,
            amount: amount,
            vols:vols
        }
    } else {
        for (let i = 0; i < rawData.length; i++) {
            datas.push(rawData[i].slice(1,));
            times.push(formatDateForKline(rawData[i][0]));
            vols.push(rawData[i][5]);
            macds.push(rawData[i][6]);
            ma7.push(rawData[i][7]);
            ma30.push(rawData[i][8]);
            msg = {
                datas: datas,
                times: times,
                vols: vols,
                ma7: ma7,
                ma30: ma30,
                macds: macds
            }
        }
    }
    return msg
}


let myCharts
class DealCenterOnline extends React.Component {
    state = {
        iframe: ' <iframe src="https://www.12lian.com" frameBorder="0" width="854px" height="524px"></iframe>'
    }

    // -----------------k线图--------------------//

    // checkType(index,e) {
    //     const { dispatch } = this.props
    //     const { currencyId } = this.props
    //     siblings(e.target).forEach(function (el) {
    //         removeClass(el, 'selected')
    //     })
    //     addClass(e.target, 'selected')
    //     // dispatch(klineEmitMsgForRealtime(dispatch, index, currencyId))
    //     dispatch(klineEmitMsgForRealtime(dispatch, index, currencyId))
    //     dispatch({type: 'SHOW_DEALCENTER_LODING'})
    // }
    //
    // //  添加 checkType 事件
    // addEventForType = () => {
    //     let lists = this.refs.lists.children
    //     Array.prototype.forEach.call(lists, function (list, index) {
    //         list.addEventListener('click', this.checkType.bind(this, index))
    //     }.bind(this))
    // }
    // removeEventForType = () => {
    //     let lists = this.refs.lists.children
    //     Array.prototype.forEach.call(lists, function (list) {
    //         list.removeEventListener('click', this.checkType)
    //     }.bind(this))
    // }
    // componentDidMount() {
    //     const { klineOne } = this.props
    //     const { dispatch } = this.props
    //     const { currencyId } = this.props
    //
    //     // ----- 请求 kline 数据 ------//
    //     // dispatch(klineEmitMsgForRealtime(dispatch, 1, currencyId))
    //     dispatch(klineEmitMsgForRealtime(dispatch, 1, currencyId))
    //     // init echarts
    //     // let charts = this.refs.charts
    //     // myCharts = echarts.init(charts)
    //     // myCharts.setOption(KlineOptions(splitData(klineOne), 1))   // arg[2] 表示 kline 时间状态
    //
    //     // other event
    //     this.addEventForType()
    // }

    //
    // componentWillReceiveProps(nextProps) {
    //     switch (nextProps.index) {
    //         case 0:
    //             myCharts.setOption(KlineOptions(splitData(nextProps.klineRealTime), nextProps.index))
    //             break
    //         case 1:
    //             myCharts.setOption(KlineOptions(splitData(nextProps.klineOne), nextProps.index))
    //             break
    //         case 2:
    //             myCharts.setOption(KlineOptions(splitData(nextProps.klineFive), nextProps.index))
    //             break
    //         case 3:
    //             myCharts.setOption(KlineOptions(splitData(nextProps.klineTen), nextProps.index))
    //             break
    //         case 4:
    //             myCharts.setOption(KlineOptions(splitData(nextProps.klineThirty), nextProps.index))
    //             break
    //         case 5:
    //             myCharts.setOption(KlineOptions(splitData(nextProps.klineHours), nextProps.index))
    //             break
    //         case 6:
    //             myCharts.setOption(KlineOptions(splitData(nextProps.klineDay), nextProps.index))
    //             break
    //     }
    //
    // }
    // componentWillUnmount() {
    //     this.removeEventForType()
    // }

    render() {
        const { status } = this.props

        return (
			<div className="dealcenter-online" style={{backgroundImage: `url(${img}charts_bg.png)`}}>
				<div className="dealcenter-online-cont">
					{/*<div className="dealcenter-chart-cates">*/}
						{/*<ul className="clearfix" ref="lists">*/}
							{/*<li>分时</li>*/}
							{/*<li className="selected">1分</li>*/}
							{/*<li>5分</li>*/}
							{/*<li>10分</li>*/}
							{/*<li>30分</li>*/}
							{/*<li>60分</li>*/}
							{/*<li>日线</li>*/}
						{/*</ul>*/}
					{/*</div>*/}
					<div className="dealcenter-online-box clearfix">
                        {/*<div className={ status ? "dealcenter-online-wrapper hide" : "dealcenter-online-wrapper" }><Icon type="loading" /></div>*/}
						{/*<div className="dealcenter-online-chart" ref="charts"></div>*/}
                        {/*<iframe src="https://www.baidu.com" frameorder="0" width="854px" height="524px"></iframe>*/}
                        <div className="fl" dangerouslySetInnerHTML={{__html: this.state.iframe}}></div>
                        {/* online right side */}
						<OnlineRightSide />
					</div>
				</div>
			</div>
        )
    }
}

export default connect(state => {
    return {
        ...state.dealCenter,
        currencyId: state.dealcenterRealtime.cates.current.currencyId
    }
})(DealCenterOnline)
