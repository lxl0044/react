// 实时行情
import React from 'react';
import { connect } from 'react-redux'
import HomeCharts from './HomeCharts'
import { Icon } from 'antd'
import { siblings, addClass, removeClass } from '../../tools/utils'
import { realTimeMarketCates } from '../Redux/Action/CommonAction'
import { requestRealTimeDetails } from '../Redux/Action/DealCenterAction'
import '../../css/realtimemarket.css';
import { img } from '../host'
import bg from '../../images/real_bg.png'

let lists
class RealTimeMarket extends React.Component {

    state = {
        spread: false,
        text: '蝶恋币/12CT',
        src: img + '12ct_logo_small.png'
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
            src: el.children[0].getAttribute('src'),
            text: el.children[1].innerText,
            spread: false
        })

        dispatch(requestRealTimeDetails(dispatch, type))
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




    componentDidMount() {
        const { dispatch } = this.props
        dispatch(realTimeMarketCates())
        this.addEvent()
    }


    componentWillUnmount() {
        lists = this.refs.lists
        lists.removeEventListener('click', this.clickHandler)
    }

    render() {
        const { lists } = this.props
        const { spread, text, src } = this.state

        let items = lists.map((list, index) => {
            return <li key={`list${index}`} data-type={list.currencyId} className={list.currencyNameEn === '12CT' ? 'selected' : ''}>
                <img src={img + list.icoUrl} alt=""/>
                <p>{`${list.currencyName}/${list.currencyNameEn}`}</p>
            </li>
        })

        return (
            <div className="RealTimeMarket" style={{backgroundImage: `url(${bg})`}}>
                <div className="top-title text-center">
                    <h1>实时行情</h1>
                    <p>Real-Time Market</p>
                </div>
               <div className="RealTimeMarketInfo">
                    <div className="RealTimeMarketCharts">
                        <div className="RealTimeMarketIcon">
                            <div className="RealTimeMarketIcon-top">
                                <ul className="clearfix">
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
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.homePage,
        ...state.dealcenterRealtime
    }
})(RealTimeMarket)