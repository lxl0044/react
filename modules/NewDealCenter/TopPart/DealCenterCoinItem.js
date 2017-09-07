import React from 'react';
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
import {formatNumber} from "../../../tools/utils"
import { img } from '../../host'
import { message } from 'antd'

export default class DealCenterCoinItem extends React.Component {

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
        dispatch({type: 'INIT_TRADING_DATA'}) // 清空原先的交易列表

        dispatch({type: 'CLEAR_INPUT_VALUE'}) // 清空价格input框内
        dispatch({type: 'RESET_TRADING_STACK'})// 重置卖队列滚动条位置

        let inputs = document.querySelectorAll('.dealcenter input')
        Array.prototype.forEach.call(inputs, function (input) {
            input.value = ''
        })

        dispatch(emitMsgForCates(dispatch, coinCode))
        dispatch(dealCenterDelegateDetails(dispatch, coinCode))
        dispatch(dealCenterLastestTrading(dispatch, coinCode))
        dispatch({type: 'CHANGE_IFRAME_HASH', hash: currencyNameEn.toLowerCase()})
        if(!token && !uid) return
        dispatch(lisntenPersonalTradingPrice())
    }

    render() {
        const {coinCode, changeRate, currencyName, currencyNameEn, currentAmount, pointPrice, selected, boxColor, color, icoUrl} = this.props

        return (
            <li className={selected ? "new-dealcenter-coin-item selected" : "new-dealcenter-coin-item"}
                onClick={this.changeCoinInfo.bind(this, coinCode)}
                style={{backgroundColor: `${boxColor}`}}
            >
                <dl className="clearfix">
                    <dt className="fl"><img src={img + icoUrl} alt=""/></dt>
                    <dd className="fl">
                        <ul>
                            <li style={{color: `${color}`}}>{`${currencyName}/${currencyNameEn}`}</li>
                            {/*<li className="clearfix">*/}
                                {/*<span className={changeRate >= 0 ? 'green fl' : 'warn fl'}>￥{formatNumber(currentAmount, pointPrice)}</span>*/}
                                {/*<span className={changeRate >= 0 ? 'green fr' : 'warn fr'}>{changeRate >= 0 ? '+' : ''}{changeRate}%</span>*/}
                            {/*</li>*/}
                            <li className={changeRate >= 0 ? 'green' : 'warn'}>{ currentAmount !== '敬请期待' ? `￥${formatNumber(currentAmount, pointPrice)}` : '敬请期待'}</li>
                            <li className={changeRate >= 0 ? 'green' : 'warn'}>{changeRate >= 0 ? '+' : ''}{changeRate}%</li>
                        </ul>
                    </dd>
                </dl>
            </li>
        )
    }
}
