import React from 'react';
import {checkAlipay} from '../../Redux/Action/PayAction'
import AlipayPaySuccess from './AlipayPaySuccess'
import {getBeforeDate} from '../../../tools/utils'
import {queryRechargeRecord} from '../../Redux/Action/PayAction'
// 保存当前时间
let beginTime = getBeforeDate(1),//保存开始时间
    createTimeEnd = getBeforeDate();//保存结束时间
let timer = null
export default class WeChatPayForCode extends React.Component {
    //准备在这里请求一下后台接口，2秒一次，在这里会得到充值失败还有成功的返回值，
    // 不管成功还是失败就让他的子集消失
    componentDidMount() {
        const {dispatch} = this.props
        const {orderNumber} = this.props.payAlipay

        timer = setInterval(function () {
            dispatch(checkAlipay(dispatch, orderNumber))
        }, 5000)

    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.alipayInfo.closeBox) {
            clearInterval(timer)
        }
    }

    //取消订单
    cancelFunc() {
        //给父级传一个参数，重新放回登录页面
        const {dispatch} = this.props
        dispatch({type: 'CANCEL_PAY_ALIPAY_STATUS'})
        //点击取消订单的时候重新调取列表
        let params = {
            status: 0,
            start: 1,
            size: 10,
            screateTimeBegin: beginTime,
            createTimeEnd: createTimeEnd,
            //修改这里是为了隐藏微信和支付宝支付，以后再改成1
            rechargeType: 2
        }
        dispatch(queryRechargeRecord(dispatch, params))
    }

    //在组件卸载的时候清除定时器
    componentWillUnmount() {
        //清除倒计时定时器
        clearInterval(timer)
    }

    // 在这里因为用两个状态控制一个元素是有问题，所有在后面对接口的时候，让请求的状态控制里面的内容的消失
    // weChatPayForTitle
    // weChatPayForMoney
    // weChatPayForCode
    render() {

        const {show, img, payMoney, orderNumber} = this.props.payAlipay
        const {payStatus, closeBox, actual_amount} = this.props.alipayInfo

        return (
            <div className={show ? "hide weChatPayFor" : "show weChatPayFor"}>
                <div className={payStatus == 2 || payStatus == 3 ? "hide weChatPayForTitle" : "show weChatPayForTitle"}>
                    <p className="text-center">
                        <span>订单号：</span>
                        <span className="warn">{orderNumber}</span>
                    </p>
                </div>
                <div className={payStatus == 2 || payStatus == 3 ? "hide weChatPayForMoney" : "show weChatPayForMoney"}>
                    <p className="text-center">
                        <span>订单金额：</span>
                        <span className="warn">{payMoney}</span>
                    </p>
                </div>
                <div className={payStatus == 2 || payStatus == 3 ? "hide weChatPayForCode" : "show weChatPayForCode"}>
                    <div>
                        <img src={img}/>
                    </div>
                </div>
                <div className={payStatus == 2 || payStatus == 3 ? "hide cancel-button" : "show cancel-button"}>
                    <button onClick={this.cancelFunc.bind(this)}>返回充值</button>
                </div>
                {closeBox ? "" : <AlipayPaySuccess dispatch={this.props.dispatch}
                                                   actual_amount={actual_amount} payMoney={payMoney}
                                                   orderNumber={orderNumber} payStatus={payStatus}
                />}
            </div>
        )
    }
}