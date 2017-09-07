import React from 'react';
import { message } from 'antd'
import {img} from '../../host'
import {
    emitMsgForCates,
    dealCenterDelegateDetails,
    dealCenterLastestTrading,
    lisntenPersonalTradingPrice,
    offPersonalTradingPrice,
    offDelegateDetails,
    offMsgForCates,
    dealCenterOffTrading
} from '../../Redux/Action/DealCenterAction'
import { formatNumber } from "../../../tools/utils"

export default class CateItem extends React.Component {

    changeCoinInfo(coinCode) {
        if(coinCode === '111' || coinCode === '112' || coinCode === '113' || coinCode === '114' || coinCode === '115') {
            return message.info('敬请期待')
        }

        const {dispatch} = this.props
        const {currencyNameEn} = this.props
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        sessionStorage.setItem('currencyId', coinCode)
        sessionStorage.setItem('currencyNameEn', currencyNameEn)

        dispatch(offPersonalTradingPrice()) // 取消监听
        dispatch(offMsgForCates())
        dispatch(offDelegateDetails())
        dispatch(dealCenterOffTrading())

        dispatch(emitMsgForCates(dispatch, coinCode))
        dispatch(dealCenterDelegateDetails(dispatch, coinCode))
        dispatch(dealCenterLastestTrading(dispatch, coinCode))
        dispatch({type: 'CHANGE_IFRAME_HASH', hash: currencyNameEn.toLocaleLowerCase()})

        if(!token && !uid) return
        dispatch(lisntenPersonalTradingPrice())
    }

    render() {
        const {coinCode, changeRate, currencyName, currencyNameEn, icoUrl, currentAmount, pointNum, volume, pointPrice, selected} = this.props

        return (
            <li className={selected ? "dealcenter-nav-list selected" : "dealcenter-nav-list"} onClick={this.changeCoinInfo.bind(this, coinCode)}>
                <div className="nav-list-box clearfix">
                    <div className="fl"><img src={img + icoUrl}/></div>
                    <dl className="fl">
                        <dd>
                            <ul className="clearfix">
                                <li>{`${currencyName}/${currencyNameEn}`}</li>
                                <li className={changeRate >= 0 ? 'green' : 'warn'}>{ currentAmount !== '敬请期待' ? `￥${formatNumber(currentAmount, pointPrice)}` : '敬请期待'}</li>
                                <li className={changeRate >= 0 ? 'green' : 'warn'}>{changeRate >= 0 ? '+' : ''}{changeRate}%</li>
                            </ul>
                        </dd>
                        <dd>24H成交量：{volume ? formatNumber(volume ,pointNum) : 0}</dd>
                    </dl>
                </div>
            </li>
        )
    }
}
