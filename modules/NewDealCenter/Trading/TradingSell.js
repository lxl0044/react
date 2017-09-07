import React from 'react';
import {Link} from 'react-router'
import {push} from 'react-router-redux'
import {Radio, Slider, Icon, message} from 'antd'
import {createTradingOrderLimit, getDealWaitingPrice} from '../../Redux/Action/DealCenterAction'
import {getCurrentCionInfo} from '../../Redux/Action/PayAction'
import {PayCoinList} from '../../Redux/Action/PayCoinAction'
import {formatNumber, initNumber} from '../../../tools/utils'
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";
var md5 = require('../../../tools/MD5.js')
const RadioGroup = Radio.Group

export default class TradingItemSell extends React.Component {

    /**
     * @value 单选框展示
     * @sliderValue 滑动条的值
     * @limit 限价/市价
     * @validAmount 价格是否合法
     * @validNumber 数量是否合法
     * @totalPrice 总金额
     * @fee 手续费
     * @validNumberNot 市价数量是否合法
     * @type {{value: number, sliderValue: number, limit: boolean, validAmount: boolean, validNumber: boolean, totalPrice: number, fee: number, validNumberNot: boolean}}
     */
    state = {
        value: 1,
        sliderValue: 0,
        limit: true,
        validAmount: true,
        validNumber: true,
        totalPrice: 0,
        validNumberNot: true
    }

    // 单选框切换
    radioChange = (e) => {
        this.setState({
            value: e.target.value,
            limit: !this.state.limit,
            fee: 0,
            totalPrice: 0,
            amount: '',
            number: ''
        })
    }

    // 进度条滑动
    sliderChange = (num) => {
        const {coinBalance} = this.props.personalAccount
        const {pointPrice, pointNum} = this.props.cates.current

        // if(value === 1) { // 限价
        let number = this.refs.number
        let amount = this.refs.amount.value || 0

        number.value = initNumber(num * coinBalance / 100, pointNum)

        this.setState({
            sliderValue: num,
            totalPrice: initNumber(amount * number.value, pointPrice),
            number: initNumber(num * coinBalance / 100, pointNum)
        })
        // } else {// 市价
        //     let notLimit = this.refs.notLimit
        //
        //     notLimit.value = initNumber(num * rmbBalance / currentAmount / 100, 4)
        //
        //     this.setState({
        //         sliderValue: value,
        //         totalPrice: initNumber(currentAmount * notLimit.value, 2)
        //     })
        // }

    }

    // changeAmount -> change
    changeAmount = (e) => {
        const {pointPrice} = this.props.cates.current
        let amount = this.refs.amount.value
        let number = this.refs.number.value || 0
        this.setState({
            amount: initNumber(amount, pointPrice),
            totalPrice: initNumber(amount * number, pointPrice)
        })
        const {dispatch} = this.props
        //每次改变的价格
        let info = {
            type: 1,
            price: e.target.value
        }
        dispatch(getDealWaitingPrice(dispatch, info))
    }

    // 检查价格输入是否合法 -> blur
    checkAmount = (e) => {
        let amount = this.refs.amount.value
        if (!amount) return
        const {entrustPriceMax, entrustPriceMin, pointPrice, pointNum} = this.props.cates.current
        const amountValue = this.state.amount
        if (amount < entrustPriceMin || amount > entrustPriceMax) {
            message.error(`价格输入必须在${entrustPriceMin}~${entrustPriceMax}之间`)
            this.setState({
                validAmount: false,
                totalPrice: 0,
            })
        } else {
            this.refs.amount.value = amountValue
            this.setState({
                validAmount: true
            })
        }
        //离焦的时候在调用一下,为了加精度
        const {dispatch} = this.props
        //每次改变的价格
        let info = {
            type: 1,
            price: initNumber(amount, pointPrice)
        }
        dispatch(getDealWaitingPrice(dispatch, info))
    }

    // changeNumber -> change
    changeNumber = () => {
        const {pointNum, pointPrice} = this.props.cates.current
        const {coinBalance} = this.props.personalAccount
        let number = this.refs.number.value <= 0 ? 0 : this.refs.number.value
        let amount = this.refs.amount.value || 0
        this.setState({
            number: initNumber(number, pointNum),
            totalPrice: initNumber(amount * number, pointPrice),
            sliderValue: parseInt(number) === 0 ? 0 : (parseInt(number) / initNumber(coinBalance, pointNum)) * 100 > 100 ? 100 : (parseInt(number) / initNumber(coinBalance, pointNum)) * 100
        })
    }

    // 检查数量输入是否合法 -> blur
    checkNumber = () => {
        let number = this.refs.number.value
        if (!number) return
        const {amountHighLimit, amountLowLimit} = this.props.cates.current
        const numberValue = this.state.number
        if (number < amountLowLimit || number > amountHighLimit) { // 大于最大，小于最小
            message.error('委托数量过低或超限')
            this.setState({
                validNumber: false,
                totalPrice: 0
            })
        } else {
            this.refs.number.value = numberValue
            this.setState({
                validNumber: true
            })
        }
    }

    // // 检查 市价 数量输入是否合法
    // checkNumberForNotlimit = () => {
    //     let notLimit = this.refs.notLimit.value
    //     if(!notLimit) return
    //     const { amountHighLimit, amountLowLimit } = this.props.cates.current
    //     const { rmbBalance } = this.props.personalAccount
    //     const { currentAmount, coinFee } = this.props.cates.current
    //     if(parseInt(number) < amountLowLimit || parseInt(number) > amountHighLimit || parseInt(number) > coinBalance) { // 大于最大，小于最小，大于自己最大可买
    //         message.error('数量输入错误')
    //         this.setState({
    //             validNumberNot: false,
    //             totalPrice: 0,
    //             fee: 0
    //         })
    //     } else {
    //         this.setState({
    //             validNumberNot: true,
    //             totalPrice: initNumber(currentAmount * notLimit, 2),
    //             fee: initNumber(currentAmount * notLimit * coinFee, 4)
    //         })
    //     }
    //
    // }

    // 卖出 coin
    sellCoin = () => {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        const {dispatch, pwdStatus} = this.props
        const {currencyId} = this.props.cates.current
        const {validAmount, validNumber, value, validNumberNot} = this.state

        if (!token && !uid) {
            message.error('请先登录')
            return dispatch(push('/login'))
        }


        // if( value === 1 ) { // 限价
        let number = this.refs.number.value
        let amount = this.refs.amount.value

        if (!amount) return message.error('请输入价格')
        if (!number) return message.error('请输入数量')
        if (!validAmount) return message.error('价格输入错误')
        if (!validNumber) return message.error('数量输入错误')

        let sellButton = this.refs.sell
        if (pwdStatus === "1") { // 每次卖出都需要交易密码
            let dealPwd = md5(this.refs.dealPwd.value.trim() + dealSalt + uid)
            let dealPassword = this.refs.dealPwd
            if (!dealPassword.value) return message.error('请输入交易密码')
            sellButton.setAttribute("disabled", "disabled")

            // 需要输入交易密码的限价委托单
            let info = {
                buyOrSell: 2,
                currencyId: currencyId,
                fdPassword: dealPwd,
                num: number,
                price: amount,
                source: 1,
                type: 1
            }

            return dispatch(createTradingOrderLimit(dispatch, info, this.refs.number, this.refs.amount, currencyId, sellButton, dealPassword))
        }

        let info = {
            buyOrSell: 2,
            currencyId: currencyId,
            fdPassword: '',
            num: number,
            price: amount,
            source: 1,
            type: 1
        }
        sellButton.setAttribute("disabled", "disabled")
        // 卖出不需要交易密码
        return dispatch(createTradingOrderLimit(dispatch, info, this.refs.number, this.refs.amount, currencyId, sellButton))
        // }
        //
        //
        // // 市价
        // let notLimit = this.refs.notLimit.value
        //
        // if(!notLimit) return message.error('请输入数量')
        // if(!validNumberNot) return message.error('数量输入错误')
        //
        // if(pwdStatus === "1") {
        //     let dealPwd = this.refs.dealPwd.value.trim()
        //     if(!dealPwd) return message.error('请输入交易密码')
        //
        //     // 需要输入交易密码的市价委托单
        //     let info = {
        //         buyOrSell: 2,
        //         currencyId: currencyId,
        //         fdPassword: dealPwd,
        //         num: notLimit,
        //         price: 0,
        //         source: 1,
        //         type: 2
        //     }
        //
        //     dispatch(createTradingOrderNotlimit(dispatch, info, this.refs.notLimit))
        // }
        //
        // // 不需要交易密码
        // let info = {
        //     buyOrSell: 2,
        //     currencyId: currencyId,
        //     fdPassword: '',
        //     num: notLimit,
        //     price: 0,
        //     source: 1,
        //     type: 2
        // }
        // dispatch(createTradingOrderNotlimit(dispatch, info, this.refs.notLimit))
    }

    // 跳转到充币页
    goPayCoin = () => {
        const {dispatch} = this.props
        const currencyId = sessionStorage.getItem('currencyId') || '2'
        dispatch(getCurrentCionInfo(dispatch, {currentyId: currencyId}))
        dispatch(PayCoinList(dispatch, currencyId))
        dispatch({type: 'CHANGE_CURRENCYID_IN_PROPERTY', currencyId: currencyId})
    }


    render() {
        let {sliderValue, limit, value, validAmount, validNumber, totalPrice, validNumberNot, fee} = this.state
        const {coinBalance} = this.props.personalAccount
        const {currentAmount, coinFee, sellFee, currencyNameEn, pointPrice, pointNum} = this.props.cates.current
        const {validDealPwd, pwdStatus, sellPrice} = this.props
        const {price} = this.props.dealSellPrice
        const {boxTopColor, color, borderColor} = this.props.style

        return (
            <div className="trading-item trading-sell fl" style={{borderColor: `${borderColor}`}}>
                {/*<div className="radio-box">*/}
                {/*<RadioGroup onChange={this.radioChange} value={value}>*/}
                {/*<Radio value={1}>限价</Radio>*/}
                {/*<Radio value={2}>市价</Radio>*/}
                {/*</RadioGroup>*/}
                {/*</div>*/}
                <div className="clearfix">
                    <p>最佳卖价：<span
                        className="warn">{sellPrice ? formatNumber(sellPrice, pointPrice) : formatNumber(currentAmount, pointPrice)}</span>（CNY）
                    </p>
                    <p>可用：<span>{formatNumber(coinBalance, pointNum)}</span>（{currencyNameEn}）<span
                        className="approximate">≈</span><span>{!(coinBalance * currentAmount) ? formatNumber(0, pointPrice) : formatNumber(coinBalance * currentAmount, pointPrice)}</span>（CNY）
                    </p>
                    {/*<p>约合：<span>{ !(coinBalance * currentAmount) ? formatNumber(0, pointPrice) : formatNumber(coinBalance * currentAmount, pointPrice)}</span>（CNY）</p>*/}
                </div>
                {limit ? <div className="input-item-box clearfix">
                        <div className="limit-price fl">
                            <label htmlFor="">价格</label>
                            <input className={validAmount ? '' : 'invalid'}
                                   type="number" ref="amount"
                                   onBlur={this.checkAmount} min="0"
                                   onChange={this.changeAmount}
                                   value={price}
                                   style={{
                                       backgroundColor: `${boxTopColor}`,
                                       color: `${color}`,
                                       borderColor: `${borderColor}`
                                   }}
                            />
                        </div>
                        <span className="fl">X</span>
                        <div className="limit-price fl">
                            <label htmlFor="">数量</label>
                            <input className={validNumber ? '' : 'invalid'}
                                   type="number" ref="number"
                                   min="0" onBlur={this.checkNumber}
                                   onChange={this.changeNumber}
                                   style={{
                                       backgroundColor: `${boxTopColor}`,
                                       color: `${color}`,
                                       borderColor: `${borderColor}`
                                   }}
                            />
                        </div>
                        <span className="fl">＝</span>
                        <div className="limit-price fl">
                            <label htmlFor="">金额</label>
                            <input type="text" disabled="disabled" value={totalPrice}
                                   style={{
                                       color: `${color}`,
                                       borderColor: `${borderColor}`
                                   }}
                            />
                        </div>
                    </div> :
                    <div className="input-item-box">
                        <label htmlFor="">数量</label>
                        <input type="number" placeholder={`卖出数量${currencyNameEn}`}
                               ref="notLimit" onBlue={this.checkNumberForNotlimit}
                               min="0" className={validNumberNot ? '' : 'invalid'}
                        />
                    </div>
                }
                <div className="slider-box clearfix">
                    <div className="slider-cont fl">
                        <Slider defaultValue={0} tipFormatter={null}
                                onChange={this.sliderChange} value={sliderValue}
                        />
                        <ul className="tick-mark">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="slider-num fl"><span>{initNumber(sliderValue, 1)}</span><span>%</span></div>
                </div>
                <p>手续费：{sellFee * 100}%（CNY）</p>
                {pwdStatus === '2' ? "" : <div className="input-item-box">
                    <div className="input-item-pwd">
                        <input type="password" placeholder="请输入交易密码"
                               className={validDealPwd ? "" : "invalid"}
                               ref="dealPwd" style={{
                            backgroundColor: `${boxTopColor}`,
                            color: `${color}`,
                            borderColor: `${borderColor}`
                        }}
                        />
                        {validDealPwd ? "" : <Icon type="close"/>}
                    </div>
                </div>}
                <div className="btn-box">
                    <button onClick={this.sellCoin} ref="sell">卖出</button>
                    <Link to="/personal/paycoin" onClick={this.goPayCoin}>充币</Link>
                </div>
            </div>
        )
    }
}