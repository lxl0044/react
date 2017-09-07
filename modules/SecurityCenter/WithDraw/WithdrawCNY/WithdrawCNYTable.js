import React from 'react';
import axios from 'axios'
import qs from 'qs'
import {Icon, DatePicker, Pagination,Select} from 'antd';
import moment from 'moment';
import {getBeforeDate} from '../../../../tools/utils'
import { WithDrawCNYRecordTable,cancelWithDrawBill } from '../../../Redux/Action/WithDrawAction'
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

// 保存当前时间
let nowDay1 = null,
    nowDay2 = null,
    nowDay3 = null,//这两个是处理时间传给后台的格式问题
    nowDay4 = null,//这两个是处理时间传给后台的格式问题
    screateTimeBegin = null,//保存开始时间
    createTimeEnd = null;//保存结束时间
export default class SecurityCenterPayCNYTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            show: true,
            data: [],//保存数据
            total: '',//总条数
            isPage: '',//是否显示分页
            page:1,//默认页数的开始页数
            current:1//页数

        }
    }

    // 当查看完成状态
    onChangeValue(value) {
        const { dispatch } = this.props
        let info = {
            status: value,//1未完成2完成
            start: this.state.page,
            size: 10,
            screateTimeBegin: nowDay3 === screateTimeBegin ? nowDay3 : screateTimeBegin,
            createTimeEnd: nowDay4 === createTimeEnd ? nowDay4 : createTimeEnd
        }
        dispatch(WithDrawCNYRecordTable(dispatch, info))
        this.setState({
            value:value,
            current:1
        })
    }

    //分页器
    onChangePage(page) {
        const { dispatch } = this.props
        let info = {
            status: this.state.value,//1未完成2完成
            start: page,
            size: 10,
            screateTimeBegin: nowDay3 === screateTimeBegin ? nowDay3 : screateTimeBegin,
            createTimeEnd: nowDay4 === createTimeEnd ? nowDay4 : createTimeEnd
        }
        this.setState({
            current:page
        })
        dispatch(WithDrawCNYRecordTable(dispatch, info))

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

    //开始时间
    startTime(date, startTime) {
        //处理开始时间格式传送给后台
        screateTimeBegin = startTime + " " + "00" + ":" + "00" + ":" + "00"
        const { dispatch } = this.props
        let info = {
            status: this.state.value,//1未完成2完成
            start: 1,
            size: 10,
            screateTimeBegin: screateTimeBegin,
            createTimeEnd: nowDay4 == createTimeEnd ? nowDay4 : createTimeEnd
        }
        dispatch(WithDrawCNYRecordTable(dispatch, info))
    }

    //结束时间
    endTime(date, endTime) {
        //处理结束时间格式传送给后台
        createTimeEnd = endTime + " " + "23" + ":" + "59" + ":" + "59"
        const { dispatch } = this.props
        let info = {
            status: this.state.value,//1未完成2完成
            start: 1,
            size: 10,
            screateTimeBegin: nowDay3 == screateTimeBegin ? nowDay3 : screateTimeBegin,
            createTimeEnd: createTimeEnd
        }
        dispatch(WithDrawCNYRecordTable(dispatch, info))
    }

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

    //这里获取当前时间需要注意一下，可能是生命周期的原因，在DidMount的时候不显示，在WillMount时候就能显示，
    componentWillMount() {
        //引入ttils文件，获取时间方法，
        nowDay1 = getBeforeDate(1);
        nowDay2 = getBeforeDate();
        nowDay3 = getBeforeDate(1);
        nowDay4 = getBeforeDate();
        screateTimeBegin = nowDay3
        createTimeEnd = nowDay4
    }
    //取消提现订单
    cancelBill (refId) {
        const { dispatch } = this.props
        let info = {
            refId:refId
        }
        dispatch(cancelWithDrawBill(dispatch, info))
    }
    componentDidMount() {
        const { dispatch } = this.props
        let info = {
            status: 1,//1未完成2完成
            start: 1,
            size: 10,
            screateTimeBegin: nowDay3,
            createTimeEnd: nowDay4
        }
        dispatch(WithDrawCNYRecordTable(dispatch, info))
    }

    render() {
        const { data,isPage,total } = this.props.CNYRecordTable
        let item = data.map((cur, index) => {
            return <tr key={index.toString()}>
                <td>{cur.creatTime}</td>
                <td>银行卡</td>
                <td className="warn">¥{this.formatPrice(cur.amount)}</td>
                <td className="warn">¥{this.formatPrice(cur.fee)}</td>
                <td>{cur.status === 2 ? "完成" : "未完成"}</td>
                {this.state.value === 2 ? <td>--</td> : <td>{cur.note}</td>}
                {cur.status === 2 ? <td>--</td> : <td><span className="blue" style={{cursor: "pointer"}} onClick={this.cancelBill.bind(this,cur.refId)}>撤销</span></td>}
            </tr>
        })
        return (
            <div className="pay_record">
                <div className="pay_record_title clearfix">
                    <span className="fl">提现记录</span>
                    <span className="fr" onClick={this.hideFunc.bind(this)}>{this.state.show ?
                        <span className="fr" onClick={this.hideFunc.bind(this)}>收起<Icon type="down"/></span> :
                        <span className="fr" onClick={this.showFunc.bind(this)}>展开<Icon type="up"/></span>}</span>
                </div>
                <div className={this.state.show ? "pay_record_table clearfix show" : "pay_record_table clearfix hide"}>
                    <Select className="fl" defaultValue="1" style={{width: 124}} onChange={this.onChangeValue.bind(this)}>
                        <Option value="1">未完成</Option>
                        <Option value="2">完成</Option>
                    </Select>
                    <div className="inlineBlock pay_record_table_date fr">
                        <span>起止日期</span><DatePicker onChange={this.startTime.bind(this)} allowClear={false}
                                                     defaultValue={moment(nowDay1, dateFormat)}/><span>至</span><DatePicker
                        onChange={this.endTime.bind(this)} allowClear={false} defaultValue={moment(nowDay2, dateFormat)}/>
                    </div>
                    <div className="pay_record_main fl">
                        <table className="pay_record_main_center text-center">
                            <thead>
                            <tr>
                                <th>提现时间</th>
                                <th>提现方式</th>
                                <th>提现金额</th>
                                <th>手续费</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {item}
                            </tbody>
                        </table>
                        <div
                            className={isPage === 0 ? "hide pay_record_page text-center" : "show pay_record_page text-center"}>
                            <Pagination current={parseInt(this.state.current)} total={parseInt(total)}
                                        onChange={this.onChangePage.bind(this)}/></div>
                        <p className={isPage === 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>
                            你还没有提现记录哦!</p>
                    </div>
                </div>
            </div>
        )
    }
}