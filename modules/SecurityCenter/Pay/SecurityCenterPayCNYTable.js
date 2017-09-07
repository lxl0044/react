import React from 'react';
import {Icon, DatePicker, Pagination,Select} from 'antd';
import {getBeforeDate} from '../../../tools/utils'
import {queryRechargeRecord,changePayPages} from '../../Redux/Action/PayAction'

import axios from 'axios'
import qs from 'qs'
const Option = Select.Option;
// 保存当前时间
let beginTime = getBeforeDate(1),//保存开始时间
    createTimeEnd = getBeforeDate();//保存结束时间
export default class SecurityCenterPayCNYTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            data: [],
            showPreview: false,
            CardAccountName: '',//户名
            amount: '',//汇款金额
            bankCardNo: '',//银行账户
            bankDeposit: '',//开户行
            bankTypeName: '',//
            note:'',//附言
            value:0//select选择框默认值
        }
    }

    // 当查看完成状态
    onChangeValue(value) {
        const {dispatch} = this.props
        const {rechargeType, startTime, endTime} = this.props.rechargeCNYList
        this.setState({
            value:value
        })
        let params = {
            start: 1,
            status:value,
            screateTimeBegin: startTime._i,
            createTimeEnd: endTime._i,
            rechargeType: rechargeType
        }
        dispatch(changePayPages(1))
        dispatch(queryRechargeRecord(dispatch, params))
    }

    //开始时间
    startTime(date, startTime) {
        const {rechargeType, status, endTime} = this.props.rechargeCNYList
        const {dispatch} = this.props
        //处理开始时间格式传送给后台
        beginTime = startTime
        let params = {
            status: this.state.value,
            start: 1,
            size: 10,
            screateTimeBegin: startTime,
            createTimeEnd: endTime._i,
            rechargeType: rechargeType
        }
        dispatch(queryRechargeRecord(dispatch, params))
    }

    //结束时间
    endTime(date, endTime) {
        //处理结束时间格式传送给后台
        createTimeEnd = endTime
        const {dispatch} = this.props
        const {rechargeType, status, startTime} = this.props.rechargeCNYList

        let params = {
            status: this.state.value,
            start: 1,
            size: 10,
            screateTimeBegin: beginTime,
            createTimeEnd: endTime,
            rechargeType: rechargeType
        }
        dispatch(queryRechargeRecord(dispatch, params))
    }

    //分页器
    onChange(page) {
        const {dispatch} = this.props
        const {rechargeType, status} = this.props.rechargeCNYList
        let params = {
            status: this.state.value,
            start: page,
            size: 10,
            screateTimeBegin: beginTime,
            createTimeEnd: createTimeEnd,
            rechargeType: rechargeType
        }
        dispatch(changePayPages(page))
        dispatch(queryRechargeRecord(dispatch, params))
    }

    //隐藏table
    hideFunc(e) {
        e.stopPropagation();
        this.setState({
            show: false
        })
    }

    //隐藏table
    showFunc(e) {
        e.stopPropagation();
        this.setState({
            show: true
        })
    }

    // 点击删除
    delFunc(id) {
        let getList = this.state.data;
        getList.map((cur) => {
            if (cur.cont && cur.cont == id) {
                cur.timer = "none"
            }
        })
        this.setState({
            data: getList
        })
    }

    //复制银行账号
    copyBankCard () {
        let bankCard = this.refs.bankCard
        bankCard.focus();
        bankCard.setSelectionRange(0, bankCard.value.length);
        document.execCommand("Copy", true)
    }
    //复制户名
    copyBankName () {
        let bankName = this.refs.bankName
        bankName.focus();
        bankName.setSelectionRange(0, bankName.value.length);
        document.execCommand("Copy", true)
    }
    previewHandler(id) {
        const {lists} = this.props.rechargeCNYList
        lists.map((cur, index) => {
            //判断我点击的是那个查看
            if (cur.rechargeId == id) {
                axios.get('/viewReCharge/' + id)
                    .then(function (res) {
                        if (res.data.status == 200) {
                            let bankCardNo = res.data.attachment.bankCardNo.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
                            this.setState({
                                showPreview: true,
                                CardAccountName: res.data.attachment.CardAccountName,
                                amount: res.data.attachment.amount,
                                bankCardNo: bankCardNo,
                                bankDeposit: res.data.attachment.bankDeposit,
                                note: res.data.attachment.note
                            })
                        }
                    }.bind(this))
            }
        })

        document.body.style.overflow = "hidden"
    }

    //点击关闭银行卡充值信息
    closePreview() {
        this.setState({
            showPreview: false
        })
        document.body.style.overflow = "auto"
    }


    // 格式化金额
    formatPrice (fee) {
        let newFee
        if(/\./.test(`${fee}`)) {
            let arr = `${fee}`.split('.')
            if(arr[1].length === 2) {
                return newFee = fee
            } else {
                return newFee = `${fee}0`
            }
        } else {
            return newFee = `${fee}.00`
        }
    }

    componentDidMount() {
        let params = {
            status: 0,
            start: 1,
            size: 10,
            screateTimeBegin: beginTime,
            createTimeEnd: createTimeEnd,
            //修改这里是为了隐藏微信和支付宝支付，以后再改成1
            rechargeType: 3
        }
        const {dispatch} = this.props
        dispatch(queryRechargeRecord(dispatch, params))
        dispatch(changePayPages(1))
    }

    render() {
        const {changePayCurrent} = this.props
        const {lists, total, startTime, endTime,status} = this.props.rechargeCNYList
        let item = lists.map((cur, index) => {
            return <tr key={index.toString()}>
                <td>{cur.creatTime}</td>
                <td className="green">{this.formatPrice(cur.amount)}</td>
                <td className="warn">{this.formatPrice(cur.fee)}</td>
                <td>{cur.status === 1 ? '未完成' : '完成'}</td>
                {cur.rechargeType === 3 ?
                    <td><a href="javascript:;" onClick={this.previewHandler.bind(this, cur.rechargeId)}>查看</a></td> :
                    <td>--</td>}
            </tr>
        })
        return (
            <div className="pay_record">
                <div className="pay_record_title clearfix">
                    <span className="fl">充值记录</span>
                    <span className="fr" onClick={this.hideFunc.bind(this)}>{this.state.show ?
                        <span className="fr" onClick={this.hideFunc.bind(this)}>收起<Icon type="down"/></span> :
                        <span className="fr" onClick={this.showFunc.bind(this)}>展开<Icon type="up"/></span>}</span>
                </div>
                <div className={this.state.show ? "pay_record_table clearfix show" : "pay_record_table clearfix hide"}>
                    <Select className="fl" value={ `${status}` } style={{width: 124}} onChange={this.onChangeValue.bind(this)}>
                        <Option value="0">未完成</Option>
                        <Option value="2">完成</Option>
                    </Select>
                    <div className="inlineBlock pay_record_table_date fr">
                        <span>起止日期</span>
                        <DatePicker onChange={this.startTime.bind(this)} allowClear={false} value={startTime} format={'YYYY-MM-DD'}/>
                        <span>至</span>
                        <DatePicker onChange={this.endTime.bind(this)} value={endTime} allowClear={false} format={'YYYY-MM-DD'}/>
                    </div>
                    <div className="pay_record_main fl">
                        <table cellSpacing="0" cellPadding="0" className="pay_record_main_center text-center">
                            <thead>
                            <tr>
                                <th>充值时间</th>
                                <th>金额</th>
                                <th>手续费</th>
                                <th>状态</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {item}
                            </tbody>
                        </table>
                        <div
                            className={total === 0 ? "pay_record_page text-center hide" : "pay_record_page text-center"}>
                            <Pagination current={changePayCurrent} total={parseInt(total)}
                                        onChange={this.onChange.bind(this)}/>
                        </div>
                        <p className={total === 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>
                            你还没有充值记录哦!</p>
                    </div>
                </div>
                {/* 点击查看充值信息，仅限银行充值时使用 */}
                <div className={this.state.showPreview ? "show bankCardPayAlert" : "hide bankCardPayAlert"}>
                    <div className="bankCardPayCenetr">
                        <div className="bankCardPayBox">
                            <div className="bankCardPayTop"></div>
                            <div className="bankCardPayTopTtile">
                                <div className="bankCardPayTopTtileIcon clearfix">
                                    <span className="fl warn">银行转账充值</span><span className="fr warn"><Icon
                                    type="close-circle-o" onClick={this.closePreview.bind(this)}/></span>
                                </div>
                                <div className="bankCardPayInfoWarp show">
                                    <p>请将充值金额转账至以下账户<span className="warn">（暂不支持支付宝及其他三方支付，否则将导致无法入账）</span></p>
                                    <p><span>银行账户：</span><input className="font-weight" style={{width:"200px"}} value={this.state.bankCardNo} ref="bankCard"></input><button onClick={this.copyBankCard.bind(this)}>复制</button></p>
                                    <p><span>开户行：</span><span className="font-weight">{this.state.bankDeposit}</span></p>
                                    <p><span>户名：</span><input className="font-weight" style={{width:"250px"}} value={this.state.CardAccountName} ref="bankName"></input><button onClick={this.copyBankName.bind(this)}>复制</button></p>
                                </div>
                                <div className="bankCardPayInfoBag show">
                                    <p className="font-weight">汇聚信息</p>
                                    <p><span>汇款金额：¥</span><span className="font-weight">{this.state.amount}</span><span
                                        className="warn"> (*为快速到账，请按此处显示的金额转账)</span></p>
                                    <p><span>备注附言：</span><span className="font-weight">{this.state.note}</span><span
                                        className="font-weight"> (区分大小写)</span></p>
                                    <p><span>注意：</span><span className="font-weight">为了快速准确到账，转账时请在附言中填写备注，请不要在填加备注以外的其他信息。</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}