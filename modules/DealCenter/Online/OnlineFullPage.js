import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { formatNumber } from '../../../tools/utils'
import coinLogo from '../../../images/12ct-withdraw.png'
import { img } from '../../host'

class OnlineFullPage extends React.Component {

    state = {
        spread: false
    }

    changeCoin = () => {
        this.setState({
            spread: !this.state.spread
        })
    }

    render() {

        const { spread } = this.state
        const { hash } = this.props
        const { others, current } = this.props.cates
        const { pointPrice, pointNum } = this.props.cates.current
        let lists = others.map((item, index) => {
            return <li key={`othersCoin${index}`}>{item.currencyNameEn}</li>
        })


        return (
            <div className="dealcenter-full-page">
                <div className="full-page-title">
                    {/*头部竖线左侧*/}
                    <ul className="clearfix title-left fl">
                        <li className="logo">
                            <a href="javascript:;">12链</a>
                        </li>
                        <li className="clearfix">
                            <dl onClick={this.changeCoin}>
                                <dd><img src={coinLogo} alt="" className="fl"/></dd>
                                <dd>
                                    {`${current.currencyNameEn}/${current.currencyName}`}
                                    { spread ? <Icon type="caret-up" /> : <Icon type="caret-down" /> }
                                </dd>
                            </dl>
                            <ul className="coin-lists">
                                {/*币种列表*/}
                                {lists}
                            </ul>
                        </li>
                        <li className="green">${formatNumber(current.currentAmount, pointPrice)}</li>
                        <li className="warn">${formatNumber(current.changeRate, 2)}</li>
                        <li className="vertical-line"></li>
                    </ul>
                    {/*头部竖线右侧*/}
                    <ul className="fl">
                        <li>最高价：￥{formatNumber(current.highPrice, pointPrice)}</li>
                        <li>最低价：￥{formatNumber(current.lowPrice, pointPrice)}</li>
                        <li>12H成交量：{formatNumber(current.volume, pointNum)}</li>
                    </ul>
                </div>
                <div className="inner-frame">
                    <iframe src={`https://plugin.bimao.com/12lian/#12lian_${hash}`} frameBorder="0" width="100%" height="100%"></iframe>
                </div>
                <div className="full-page-bot">
                    <ul className="clearfix">
                        <li>
                            <dl>
                                <dt>未完成委托</dt>
                                <dd>
                                    <ul className="clearfix">
                                        <li>类型</li>
                                        <li>委托价格</li>
                                        <li>委托数量</li>
                                        <li>状态</li>
                                        <li>操作</li>
                                    </ul>
                                </dd>
                                <dd></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>成交记录</dt>
                                <dd>
                                    <ul className="clearfix">
                                        <li>时间</li>
                                        <li>类型</li>
                                        <li>价格</li>
                                        <li>数量</li>
                                    </ul>
                                </dd>
                                <dd></dd>
                            </dl>
                        </li>
                        <li>
                            <dl className="fl full-trading-buy">
                                <dt>可用  CNY：1234567.0000</dt>
                                <dd></dd>
                            </dl>
                            <dl className="fl full-trading-sell">
                                <dt>可用  12CT：1234567.0000</dt>
                                <dd></dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default connect(state => {
    return {
        ...state.dealcenterRealtime
    }
})(OnlineFullPage)



