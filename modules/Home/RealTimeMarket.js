// 实时行情
import React from 'react';
import {connect} from 'react-redux'
import '../../css/realtimemarket.css';
import {img} from '../host'
import {Icon,message} from 'antd'
import { push } from 'react-router-redux'
import {
    requestRealTimeDetails,
    changeRealTimeMarketIcon,
    getHomeRealTimeCharts,
    offHomeRealTimeCharts,
    offRealTimeDetails
} from '../Redux/Action/DealCenterAction'
import {realTimeMarketCates} from '../Redux/Action/DealCenterAction'
import {addMarketClass, removeClass, initNumber} from '../../tools/utils'
import Online from './RealTimeMarketOnline'
import Charts from './HomePriceTrendCharts'

const data = [{
    img:'https://source.12lian.com/btc.png',
    coinName:'比特币/BTC',
    countryIco:'country/比特币.png'
},{
    img:'https://source.12lian.com/eth.png',
    coinName:'以太坊/ETH',
    countryIco:'country/俄罗斯.png'
},{
    img:'https://source.12lian.com/ltc.png',
    coinName:'莱特币/LTC',
    countryIco:'country/美国.png'
}]


let timeOut = null
class RealTimeMarket extends React.Component {
    //点击三角形图标
    iconHandler(id) {
        // console.log(id)
        const {homeCharts} = this.props
        let marketMapList = this.refs.marketMapList
        homeCharts.map((list, index) => {
            if (index === id) {
                //获取class名
                let dataIndex = marketMapList.children[id].children[9].children[0].className
                //获取节点
                let dataDom = marketMapList.children[id].children[9].children[0]
                //判断点击的是哪一个
                if (dataIndex.trim() === "anticon anticon-caret-down") {
                    removeClass(dataDom, "anticon anticon-caret-down")
                    addMarketClass(dataDom, "anticon anticon-caret-up")
                } else {
                    removeClass(dataDom, "anticon anticon-caret-up")
                    addMarketClass(dataDom, "anticon anticon-caret-down")
                }
                //判断当前点击的状态是什么,取反
                marketMapList.children[id].children[10].style.display = marketMapList.children[id].children[10].style.display === "none" ? "block" : "none"
            }
        })
    }

    //点击行情显示图
    chartHandler(currencyId, text, src, nameEn) {
        const {dispatch} = this.props
        let info = {
            text: text,
            src: src,
            currencyId: currencyId
        }
        let mostWrap = this.refs.mostWrap
        mostWrap.style.marginLeft = "-1200px"
        mostWrap.style.transition = 'all .3s linear';

        sessionStorage.setItem('currencyId', currencyId)
        sessionStorage.setItem('currencyNameEn', nameEn)
        dispatch({type: 'CHANGE_IFRAME_HASH', hash: nameEn.toLowerCase()})

        //拿到币种id
        dispatch(changeRealTimeMarketIcon(dispatch, info))
        dispatch(requestRealTimeDetails(dispatch, currencyId))
    }

    goBack(info) {
        let mostWrap = this.refs.mostWrap
        mostWrap.style.marginLeft = info
        mostWrap.style.transition = 'all .3s linear';
    }
    //跳转到交易中心
    jumpDealCenter (currencyId,currencyNameEn) {
        const {dispatch} = this.props
        dispatch(push('/dealcenter'))
        sessionStorage.setItem('currencyId', parseInt(currencyId))
        sessionStorage.setItem('currencyNameEn', currencyNameEn)
        dispatch({type: 'CHANGE_IFRAME_HASH', hash: currencyNameEn.toLowerCase()})
    }
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(realTimeMarketCates())
        dispatch(getHomeRealTimeCharts())
    }

    componentDidUpdate () {
        let arrows = document.querySelectorAll('.current-price span.blink')
        timeOut = setTimeout(function () {
            Array.prototype.forEach.call(arrows, (item) => {
                item.className = ''
            })
        }, 2000)
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        dispatch(offHomeRealTimeCharts())
        dispatch(offRealTimeDetails())
        clearTimeout(timeOut)
    }
    //点击临时的币种敬请期待
    onClickHandler () {
        message.info('敬请期待')
    }

    render() {
        const {homeCharts} = this.props
        let temporary = data.map((cur,index) => {
            return <ul onClick={this.onClickHandler.bind(this)}>
                <li key={`cur${index}`}>
                    <p>
                        <img src={cur.img}/>
                        <span>{cur.coinName}</span>
                    </p>
                </li>
                <li>
                    <img src={img + cur.countryIco}/>
                </li>
                <li>
                    <span>--</span>
                </li>
                <li>--</li>
                <li>--</li>
                <li>--</li>
                <li>--</li>
                <li>--</li>
                <li>
                    <p style={{lineHeight:"37px"}}>敬请期待</p>
                </li>
                <li>
                    <Icon type="area-chart"/>
                </li>
            </ul>
        })
        let items = homeCharts.map((list, index) => {
            return <ul>
                <li key={`list${index}`} onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)}>
                    <p>
                        <img src={list.icoUrl ? img + list.icoUrl : `${img}img_holder.png`} alt=""/>
                        <span>{`${list.currencyName}/${list.currencyNameEn}`}</span>
                    </p>
                </li>
                <li>
                    <img src={img + list.countryIco} onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)}/>
                </li>
                <li onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)} className="current-price">
                    <span className={list.currentAmount >= list.previousPrice ? "green" : "warn"}>{`￥${initNumber(list.currentAmount, list.pointPrice)}`}</span>
                    <span className={list.update ? `blink ${Math.random()}` : null}>
                        <Icon className={list.currentAmount >= list.previousPrice ? "green" : "warn"} type={list.currentAmount > list.previousPrice ? "arrow-up" : list.currentAmount < list.previousPrice ? "arrow-down" : list.currentAmount === list.previousPrice ? "" : ""}/>
                    </span>
                </li>
                <li onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)}>{`￥${initNumber(list.highPrice, list.pointPrice)}`}</li>
                <li onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)}>{`￥${initNumber(list.lowPrice, list.pointPrice)}`}</li>
                <li onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)} className={list.sevenChangeRate >= 0 ? "green" : "warn"}>{list.sevenChangeRate >= 0 ? `+${initNumber(list.sevenChangeRate, 2)}%` : `${initNumber(list.sevenChangeRate, 2)}%`}</li>
                <li onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)} className={list.changeRate >= 0 ? "green" : "warn"}>{list.changeRate >= 0 ? `+${initNumber(list.changeRate, 2)}%` : `${initNumber(list.changeRate, 2)}%`}</li>
                <li onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)}>{list.volume ? initNumber(list.volume, list.pointNum) : 0}</li>
                <li onClick={this.jumpDealCenter.bind(this,list.coinCode,list.currencyNameEn)}>
                    <Charts data={list.hours24TrendList}/>
                </li>
                <li>
                    <Icon type="area-chart" data-type={index}
                        onClick={this.chartHandler.bind(this, list.coinCode, `${list.currencyName}/${list.currencyNameEn}`, img + list.icoUrl, list.currencyNameEn)}/>
                </li>
            </ul>
        })
        return (
            <div>
                <div style={{width: "100%", height: "100px"}}>
                    <p style={{
                        width: '1200px',
                        margin: '24px auto 0',
                        backgroundColor: '#fffaf4',
                        border: "1px solid #fde4a1",
                        borderRadius: "4px",
                        padding: "16px"
                    }}><span style={{fontWeight: '600', color: 'red'}}>风险提示:</span>数字货币价格波动较大，其交易存在较大风险（预挖、暴涨暴跌、庄家操控、团队解散、技术缺陷等），12链严格执行《关于防范比特币风险的通知》等政策法规，依法为数字货
                        <span className="show" style={{textIndent: "60px"}}>币投资者提供自由交易平台，但对币的价值不做任何投资承诺，请您投资前对数字货币充分认知，理性判断自己的投资能力，审慎做出投资决策！</span>
                    </p>
                    <p className="text-center warn">12链官方服务群，群号码：574722697
                        {/*<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=574722697" className="warn"></a>*/}
                    </p>
                </div>
                <div className="RealTimeMarket" style={{backgroundImage: `url(${img}realtime_bg.png)`}}>
                    <div className="top-title text-center">
                        <h1>实时行情</h1>
                        <p>Real-Time Market</p>
                    </div>
                    <div className="RealTimeMarket-wrap">
                        <div className="RealTimeMarket-wrap-box" ref="mostWrap">
                            <div className="RealTimeMarket-map" ref="marketMap">
                                <div className="RealTimeMarket-map-title">
                                    <ul className="clearfix">
                                        <li></li>
                                        <li></li>
                                        <li>最新价格</li>
                                        <li>最高价</li>
                                        <li>最低价</li>
                                        <li>7日涨跌幅</li>
                                        <li>今日涨跌幅</li>
                                        <li>24H成交量</li>
                                        <li>24H价格趋势</li>
                                        <li></li>
                                    </ul>
                                </div>
                                <div className="RealTimeMarket-map-center" ref="marketMapList">
                                    {items}
                                    {temporary}
                                </div>
                            </div>
                            <div>
                                <Online {...this.props} receptionInfo={this.goBack.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.dealcenterRealtime
    }
})(RealTimeMarket)