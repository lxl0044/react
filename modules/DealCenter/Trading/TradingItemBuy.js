import React from 'react';
import {Link} from 'react-router'
import {push} from 'react-router-redux'
import {Radio, Slider, Icon, message} from 'antd'
import {createTradingOrderLimit, createTradingOrderNotlimit} from '../../Redux/Action/DealCenterAction'
import {formatNumber} from '../../../tools/utils'
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";
var md5 = require('../../../tools/MD5.js')
const RadioGroup = Radio.Group

export default class TradingItem extends React.Component {

    /**
     * @value 单选框展示
     * @sliderValue 滑动条的值
     * @limit 限价/市价
     * @validAmount 价格是否合法
     * @validNumber 数量是否合法
     * @totalPrice 总金额
     * @type {{value: number, sliderValue: number, limit: boolean, validAmount: boolean, validNumber: boolean, totalPrice: number, fee: number, validNumberNot: boolean}}
     */
    state = {
        value: 1,
        sliderValue: 0,
        limit: true,
        validAmount: true,
        validNumber: true,
        totalPrice: 0,
        fee: 0,
        validNumberNot: true,
        amount: '',
        number: ''
    }

    // 单选框切换
    radioChange = (e) => {
        this.setState({
            value: e.target.value,
            limit: !this.state.limit,
            fee: 0,
            totalPrice: 0
        })
    }

    // 进度条滑动
    sliderChange = (num) => {
        const {currentAmount} = this.props.cates.current
        const {rmbBalance} = this.props.personalAccount

        // if(value === 1) { // 限价
        let number = this.refs.number
        let amount = this.refs.amount.value || 0

        number.value = formatNumber(num * rmbBalance / currentAmount / 100, 4)

        this.setState({
            sliderValue: num,
            totalPrice: formatNumber(amount * number.value, 2),
            number: formatNumber(num * rmbBalance / currentAmount / 100, 4)
        })
        // } else {// 市价
        //    let notLimit = this.refs.notLimit
        //
        //    notLimit.value = formatNumber(num * rmbBalance / currentAmount / 100, 4)
        //
        //    this.setState({
        //        sliderValue: value,
        //        totalPrice: formatNumber(currentAmount * notLimit.value, 2)
        //    })
        // }

    }


    // changeAmount
    changeAmount = () => {
        let value = this.refs.amount.value
        this.setState({
            amount: formatNumber(value, 2)
        })
    }

    // 检查价格输入是否合法
    checkAmount = () => {
        let amount = this.refs.amount.value
        let number = this.refs.number.value || 0
        if (!amount) return
        const {entrustPriceMax, entrustPriceMin, coinFee} = this.props.cates.current
        const amountValue = this.state.amount
        if (amount < entrustPriceMin || amount > entrustPriceMax) {
            message.error(`价格输入必须在${entrustPriceMin}~${entrustPriceMax}之间`)
            this.setState({
                validAmount: false,
                totalPrice: 0,
                fee: 0
            })
        } else {
            this.refs.amount.value = amountValue
            this.setState({
                validAmount: true,
                totalPrice: formatNumber(amount * number, 2),
                fee: formatNumber(amount * number * coinFee, 4)
            })
        }
    }


    // changeNumber
    changeNumber = () => {
        let value = this.refs.number.value
        this.setState({
            number: formatNumber(value, 4)
        })
    }


    // 检查数量输入是否合法
    checkNumber = () => {
        let number = this.refs.number.value
        let amount = this.refs.amount.value || 0
        if (!number) return
        const {amountHighLimit, amountLowLimit, coinFee, currentAmount} = this.props.cates.current
        const {rmbBalance} = this.props.personalAccount
        const numberValue = this.state.number
        if (number < amountLowLimit || number > amountHighLimit) { // 大于最大，小于最小
            message.error('委托数量过低或超限')
            this.setState({
                validNumber: false,
                totalPrice: 0,
                fee: 0
            })
        } else {
            this.refs.number.value = numberValue
            this.setState({
                validNumber: true,
                totalPrice: formatNumber(amount * number, 2),
                fee: formatNumber(amount * number * coinFee, 4),
                sliderValue: (parseInt(number) / parseInt(rmbBalance / currentAmount))* 100
            })
        }
    }

    // // 检查 市价 数量输入是否合法
    // checkNumberForNotlimit = () => {
    // 	let notLimit = this.refs.notLimit.value
    //    const { currentAmount } = this.props.cates.current
    // 	if(!notLimit) return
    //    const { rmbBalance } = this.props.personalAccount
    //    const { amountHighLimit, amountLowLimit } = this.props.cates.current
    //    if(parseInt(number) < amountLowLimit || parseInt(number) > amountHighLimit || parseInt(number) > formatNumber(rmbBalance / currentAmount, 4)) {// 大于最大，小于最小，大于自己最大可买
    //        message.error('数量输入错误')
    //        this.setState({
    //            validNumberNot: false,
    //            totalPrice: 0,
    //            fee: 0
    //        })
    //    } else {
    //        this.setState({
    //            validNumberNot: true,
    //            totalPrice: formatNumber(currentAmount * notLimit, 2),
    //            fee: formatNumber(currentAmount * notLimit * 0.002, 4)
    //        })
    //    }
    //
    // }


    // --------------------买入 coin--------------------- //
    buyCoin = () => {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        const {dispatch, pwdStatus} = this.props
        const {currencyId} = this.props.cates.current


        if (!token && !uid) {
            message.error('请先登录')
            return dispatch(push('/login'))
        }


        const {validAmount, validNumber, value, validNumberNot} = this.state


        // ----------------限价----------------- //
        // if( value === 1 ) {
        let number = this.refs.number.value
        let amount = this.refs.amount.value

        if (!amount) return message.error('请输入价格')
        if (!number) return message.error('请输入数量')
        if (!validAmount) return message.error('价格输入错误')
        if (!validNumber) return message.error('数量输入错误')


        if (pwdStatus === "1") { // 每次都要输入交易密码
            let dealPwd = md5(this.refs.dealPwd.value.trim() + dealSalt + uid)
            let dealPassword = this.refs.dealPwd
            if (!dealPassword.value) return message.error('请输入交易密码')

            // 需要输入交易密码的委托单
            let info = {
                buyOrSell: 1,
                currencyId: currencyId,
                fdPassword: dealPwd,
                num: number,
                price: amount,
                source: 1,
                type: 1
            }
            return dispatch(createTradingOrderLimit(dispatch, info, this.refs.number, this.refs.amount, currencyId,dealPassword))
        }

        let info = {
            buyOrSell: 1,
            currencyId: currencyId,
            fdPassword: '',
            num: number,
            price: amount,
            source: 1,
            type: 1
        }
        // 不需要输入交易密码的委托单
        return dispatch(createTradingOrderLimit(dispatch, info, this.refs.number, this.refs.amount, currencyId))
        // }
        // --------------------市价------------------ //
        // let notLimit = this.refs.notLimit.value
        //
        // if(!notLimit) return message.error('请输入数量')
        // if(!validNumberNot) return message.error('数量输入错误')
        //
        // if(pwdStatus === "1") { // 每次都要输入交易密码
        //     let dealPwd = this.refs.dealPwd.value
        //     if(!dealPwd) return message.error('请输入交易密码')
        //
        //     let info = {
        //         buyOrSell: 1,
        //         currencyId: currencyId,
        //         fdPassword: dealPwd,
        //         num: notLimit,
        //         price: 0,
        //         source: 1,
        //         type: 2
        //     }
        // return dispatch(createTradingOrderNotlimit(dispatch, info, this.refs.notLimit, currencyNameEn))
        // }
        //
        // let info = {
        //     buyOrSell: 1,
        //     currencyId: currencyId,
        //     fdPassword: '',
        //     num: notLimit,
        //     price: 0,
        //     source: 1,
        //     type: 2
        // }
        // // 市价购买，不需要输入交易密码
        // return dispatch(createTradingOrderNotlimit(dispatch, info, this.refs.notLimit, currencyNameEn))

    }


    render() {
        let {sliderValue, limit, value, validAmount, validNumber, totalPrice, validNumberNot} = this.state
        const {rmbBalance} = this.props.personalAccount
        const {currentAmount, coinFee, currencyNameEn, entrustPriceMax, entrustPriceMin, amountHighLimit, amountLowLimit} = this.props.cates.current
        const {validDealPwd, pwdStatus} = this.props

        return (
            <div className="trading-item fl">
                {/*<div className="radio-box">*/}
                {/*<RadioGroup onChange={this.radioChange} value={value}>*/}
                {/*<Radio value={1}>限价</Radio>*/}
                {/*<Radio value={2}>市价</Radio>*/}
                {/*</RadioGroup>*/}
                {/*</div>*/}
                <div className="clearfix">
                    <p>可用：<span className="warn">{rmbBalance}</span>（CNY）</p>
                    <p>约合：<span>{formatNumber(rmbBalance / currentAmount, 2)}</span>（{currencyNameEn}）</p>
                </div>
                {limit ? <div className="input-item-box clearfix">
                        <div className="limte-price fl">
                            <label htmlFor="">价格</label>
                            <input className={validAmount ? '' : 'invalid'}
                                   type="number" ref="amount"
                                   onBlur={this.checkAmount} min="0"
                                   onChange={this.changeAmount}
                            />
                        </div>
                        <span className="fl">X</span>
                        <div className="limte-price fl">
                            <label htmlFor="">数量</label>
                            <input className={validNumber ? '' : 'invalid'}
                                   type="number" ref="number"
                                   min="0" onBlur={this.checkNumber}
                                   onChange={this.changeNumber}
                            />
                        </div>
                        <span className="fl">＝</span>
                        <div className="limte-price fl">
                            <label htmlFor="">金额</label>
                            <input type="text" disabled="disabled" value={totalPrice}/>
                        </div>
                    </div> :
                    <div className="input-item-box">
                        <label htmlFor="">数量</label>
                        <input type="number" placeholder={`买入数量${currencyNameEn}`}
                               onBlur={this.checkNumberForNotlimit}
                               min="0" ref="notLimit"
                               className={validNumberNot ? '' : 'invalid'}
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
                    <div className="slider-num fl"><span>{formatNumber(sliderValue, 1)}</span><span>%</span></div>
                </div>
                <p>手续费：{coinFee * 100}%（{currencyNameEn}）</p>
                {pwdStatus === '2' ? "" : <div className="input-item-box">
                    <div className="input-item-pwd">
                        <input type="password" placeholder="请输入交易密码"
                               className={validDealPwd ? "" : "invalid"}
                               ref="dealPwd"
                        />
                    </div>
                    {validDealPwd ? "" : <Icon type="close"/>}
                </div>}
                <div className="btn-box">
                    <button onClick={this.buyCoin}>买入</button>
                    <Link to="/personal/securitycenterpay" className="success">充值</Link>
                </div>
            </div>
        )
    }
}