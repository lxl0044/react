import React from 'react';
import { getIntroCoin, queryCoinInfo } from '../../Redux/Action/CoinIntroduceAction'
import {formatNumber} from "../../../tools/utils"
import { img } from '../../host'

export default class Coin extends React.Component {

    changeCoinInfo(coinCode) {
        const { dispatch } = this.props
        dispatch(getIntroCoin(dispatch, coinCode))
        dispatch(queryCoinInfo(dispatch, coinCode))
    }

    render() {
        const {coinCode, changeRate, currencyName, currencyNameEn, currentAmount, pointPrice, icoUrl} = this.props

        return (
            <li onClick={this.changeCoinInfo.bind(this, coinCode)} className="fl">
                <dl className="clearfix">
                    <dt className="fl"><img src={img + icoUrl} alt=""/></dt>
                    <dd className="fl">
                        <ul>
                            <li>{`${currencyName}/${currencyNameEn}`}</li>
                            <li className="clearfix">
                                <span className={changeRate >= 0 ? 'green fl' : 'warn fl'}>￥{formatNumber(currentAmount, pointPrice)}</span>
                                <span className={changeRate >= 0 ? 'green fl' : 'warn fl'}>{changeRate >= 0 ? '+' : ''}{changeRate}%</span>
                            </li>
                        </ul>
                    </dd>
                </dl>
            </li>
        )
    }
}
