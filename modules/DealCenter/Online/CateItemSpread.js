import React from 'react';
import {Icon} from 'antd'
import {img} from '../../host'
import {Link} from 'react-router'
import {formatNumber} from '../../../tools/utils'
import {chooseActiveTab} from '../../Redux/Action/DelegationAction'

let timer = null//定时器
export default class CateItem extends React.Component {
    state = {
        opacity: 1,
    }

    goDelegation = () => {
        const {dispatch} = this.props
        const {currencyId} = this.props.cates.current
        dispatch({type: 'CHOOSE_ACTIVE_TAB', id: currencyId})
    }


    render() {
        const {currentAmount, changeRate, highPrice, lowPrice, volume, currencyNameEn, icoUrl, pointPrice, pointNum} = this.props.cates.current

        return (
            <li className="cate-item">
                <div className="cate-item-box"
                     ref="cont">
                    <div className="cate-item-box-title">
                        <dl>
                            <dd><img src={img + icoUrl}/></dd>
                            <dd>{currencyNameEn}</dd>
                            <dd className={changeRate >= 0 ? "green" : "warn"}>{changeRate}%</dd>
                        </dl>
                    </div>
                    <div className="cate-item-box-cont">
                        <dl className="lastest-price">
                            <dd>最新价格</dd>
                            <dd>¥ <span
                                className={changeRate >= 0 ? "green" : "warn"}>{formatNumber(currentAmount, pointPrice)}</span>
                            </dd>
                            <dd>最高价／最低价</dd>
                            <dd>{formatNumber(highPrice, pointPrice)} / {formatNumber(lowPrice, pointPrice)}</dd>
                        </dl>
                        <dl className="detail">
                            <dd>24H成交量</dd>
                            <dd>{currencyNameEn}：{formatNumber(volume, pointNum)}</dd>
                            <Link to="/delegation" className="warn" onClick={this.goDelegation}>成交记录</Link>
                        </dl>
                    </div>
                </div>
            </li>
        )
    }
}
