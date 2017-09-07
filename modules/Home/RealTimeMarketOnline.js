// 实时行情
import React from 'react';
import HomeCharts from './HomeCharts'
import { Icon } from 'antd'
import { siblings, addClass, removeClass } from '../../tools/utils'
import { requestRealTimeDetails, emitMsgForCates,changeRealTimeMarketIcon, offMsgForCates, offRealTimeDetails } from '../Redux/Action/DealCenterAction'
import '../../css/realtimemarket.css';
import { img } from '../host'
let lists
export default class RealTimeMarketOnline extends React.Component {
    state = {
        spread: false,
    }
    clickHandler (e) {
        let el = e.target.nodeName === 'P' || e.target.nodeName === 'IMG' ? e.target.parentNode : e.target
        const { dispatch } = this.props
        let type = el.getAttribute('data-type')
        let sibs = siblings(el)
        sibs.forEach(function (sib) {
            removeClass(sib, 'selected')
        })
        addClass(el, 'selected')
        this.setState({
            spread: false
        })
        let info = {
            text:el.children[1].innerText,
            src:el.children[0].getAttribute('src'),
            currencyId: type
        }
        dispatch(changeRealTimeMarketIcon(dispatch, info))
        dispatch(requestRealTimeDetails(dispatch, type))
        // dispatch(emitMsgForCates(dispatch, type))
    }
    //
    addEvent () {
        lists = this.refs.lists
        lists.addEventListener('click', this.clickHandler.bind(this))
    }

    spreadHandler = () => {
        this.setState({
            spread: !this.state.spread
        })
    }
    //sendParent传给父级一个参数，RealTimeMarket.js是父级
    sendParent () {
        const { dispatch } = this.props

        //调用父级的方法，把0传过去
        this.props.receptionInfo(0)
        //当点击返回的时候,把class名为selected去除掉
        lists = this.refs.lists
        for (let i = 0; i < lists.children.length; i++) {
            removeClass(lists.children[i],"selected")
        }

        // 返回上一级，取消监听
        dispatch(offRealTimeDetails())
        // dispatch(offMsgForCates())

    }
    componentDidMount() {
        this.addEvent()
    }
    componentWillUnmount() {
        lists = this.refs.lists
        lists.removeEventListener('click', this.clickHandler)
    }

    render() {
        const { lists } = this.props
        const { spread } = this.state
        const { text,src,currencyId } = this.props.realTimeMartketIcon

        let items = lists.map((list, index) => {
            return <li key={`list${index}`} data-type={list.currencyId} className={list.currencyId === parseInt(currencyId) ? 'selected' : ''}>
                <img src={img + list.icoUrl} alt=""/>
                <p>{`${list.currencyName}/${list.currencyNameEn}`}</p>
            </li>
        })
        return (
            <div className="RealTimeMarketInfo">
                <div className="RealTimeMarketCharts">
                    <div className="RealTimeMarketIcon">
                        <div className="RealTimeMarketIcon-top clearfix">
                            <span className="fl" onClick={this.sendParent.bind(this)}><Icon type="left" /><span>返回</span></span>
                            <ul className="fl clearfix">
                                <li>
                                    <img src={src} alt=""/>
                                </li>
                                <li onClick={this.spreadHandler}>
                                    { text }
                                    <Icon type={spread ? "caret-up" : "caret-down"} />
                                </li>
                            </ul>
                        </div>
                        <div className={spread ? "RealTimeMarketIcon-cont spread" : "RealTimeMarketIcon-cont"}>
                            <ul ref="lists" className="clearfix">
                                { items }
                            </ul>
                        </div>
                    </div>
                    <HomeCharts { ...this.props }/>
                </div>
            </div>
        )
    }
}