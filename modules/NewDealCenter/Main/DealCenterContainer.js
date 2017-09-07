import React from 'react'
import Online from './DealCenterOnline'
import Details from './DealCenterTradingDetails'
import Trading from '../Trading/DealCenterTrading'
import { Icon } from 'antd'
import { Link } from 'react-router'
import {formatNumber} from "../../../tools/utils"
import { img } from '../../host'
import SloganItem from "../../Home/SloganItem";

export default class DealCenterContainer extends React.Component {
    render () {

        const { style } = this.props
        const {currentAmount, changeRate, highPrice, lowPrice, volume, currencyNameEn, currencyName, icoUrl, pointPrice, pointNum} = this.props.cates.current

        return (
            <div className="new-dealcenter-container">
                <div className="new-dealcenter-current-coin" style={{backgroundColor: `${style.boxColor}`}}>
                    <ul className="clearfix">
                        <li>
                            <img src={img + icoUrl} alt=""/>
                            <span style={{color: `${style.color}`}}>{`${currencyName}/${currencyNameEn}`}</span>
                        </li>
                        <li className={changeRate >= 0 ? 'green' : 'warn'}>￥{formatNumber(currentAmount, pointPrice)}</li>
                        <li className={changeRate >= 0 ? 'green' : 'warn'}>{changeRate >= 0 ? '+' : ''}{changeRate}%</li>
                        <li style={{color: `${style.color}`}}>最高价：￥{formatNumber(highPrice, pointPrice)}</li>
                        <li style={{color: `${style.color}`}}>最低价：￥{formatNumber(lowPrice, pointPrice)}</li>
                        <li style={{color: `${style.color}`}}>24H成交量：{formatNumber(volume, pointNum)}</li>
                        {/*<li className="fr">*/}
                            {/*<Link to="/dealcenter">旧版入口</Link>*/}
                        {/*</li>*/}
                        {/*<li className="fr">*/}
                            {/*<Link to="/currencyintroduce">*/}
                                {/*<Icon type="question-circle-o"/>*/}
                                {/*币种介绍*/}
                            {/*</Link>*/}
                        {/*</li>*/}
                    </ul>
                </div>
                <div className="new-dealcenter-online-box">
                    <div className="new-dealcenter-online-data clearfix">
                        <Online { ...this.props }/>
                        <Details { ...this.props }/>
                    </div>
                    <Trading />
                </div>
            </div>
        )
    }
}




