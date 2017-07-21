import React from 'react';
import { Icon } from 'antd';
import {getBeforeDate} from '../../../tools/utils'
import {queryRechargeRecord} from '../../Redux/Action/PayAction'
// 保存当前时间
let beginTime = getBeforeDate(1),//保存开始时间
    createTimeEnd = getBeforeDate();//保存结束时间
let timer = null;//保存定时器的名字

let time = 5;
export default class AlipayPaySuccess extends React.Component {
        componentDidMount() {
            const { dispatch } = this.props
            const counter = this.refs.counter
            timer = setInterval(function(){
                time--
                counter.innerText = time
                if (time === 0) {
                    //清除倒计时定时器
                    clearInterval(timer)
                    time = 5
                    //这里当时间等于0的时候给父级传一个参数，重新放回登录页面
                    dispatch({type: 'PAY_ALIPAY_CALLBACK_STATUS'})
                    //等于0的时候重新调取列表
                    let params = {
                        status: 0,
                        start: 1,
                        size: 10,
                        screateTimeBegin: beginTime,
                        createTimeEnd: createTimeEnd,
                        rechargeType: 2
                    }
                    dispatch(queryRechargeRecord(dispatch, params))
                }
            },1000)
        }
        //在组件卸载的时候清除定时器
        componentWillUnmount() {
            //清除倒计时定时器
            clearInterval(timer)
        }
    render() {
        return (
            <div className={this.props.payStatus == 2 || this.props.payStatus == 3 ? "show weChatPaySuccess" : "hide weChatPaySuccess"}>
                <div className="weChatPaySuccessIcon text-center">
                    {this.props.payStatus == 2 ? <span><Icon className="green" type="check-circle" /><span>充值成功</span></span> : this.props.payStatus == 3 ?
                    <span><Icon className="warn" type="close-circle" /><span>充值失败</span></span> : ""}
                </div>
                <div className={this.props.payStatus == 2 || this.props.payStatus == 3 ? "show weChatPaySuccessMain" : "hide weChatPaySuccessMain"}>
                    <p>
                        <span>订单号：</span>
                        <span className="warn">{this.props.orderNumber}</span>
                    </p>
                    <p>
                        <span>充值金额：</span>
                        <span className="warn">{this.props.payMoney}</span>
                    </p>
                    <p className={this.props.payStatus == 2 ? "show" : this.props.payStatus == 3 ? "hide" : ""}>
                        <span>实际到账：</span>
                        <span className="warn">{this.props.actual_amount}</span>
                    </p>
                    <p>
                        <span ref="counter">{time}</span><span>秒后跳转回充值页面</span>
                    </p>
                </div>
            </div>
        )
    }
}