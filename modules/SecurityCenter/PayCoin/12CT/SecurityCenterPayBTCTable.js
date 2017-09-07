import React from 'react';
import axios from 'axios'
import qs from 'qs'
import {Icon, DatePicker, Pagination,Select} from 'antd';
import moment from 'moment';
import {getBeforeDate} from '../../../../tools/utils'
import { PayCoinTable } from './../../../Redux/Action/PayCoinAction'

const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;

// 保存当前时间
let nowDay3 = null,
    nowDay4 = null,
    beginTimeStart = null,//保存开始时间
    createTime = null;//保存结束时间
export default class SecurityCenterPayCNYTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            show: true,
            data: [],
            isPage: '',//是否显示分页
            total: '',//条数
            page:1
        }
    }

    // 当查看完成状态
    onChangeValue(value) {
        this.setState({
            value:value
        })
        let info = {
            status:value,//1未完成2完成
            start: 1,
            size: 10,
            currencyId: this.props.currencyId,
            beginTime: nowDay3 == beginTimeStart ? nowDay3 : beginTimeStart,
            endTime: nowDay4 == createTime ? nowDay4 : createTime
        }
        const {dispatch} = this.props
        //传给父组件的页数
        this.props.nextModules(1)
        dispatch(PayCoinTable(dispatch, info))
    }

    //分页器
    onChange(page) {
        this.setState({
            page:page
        })
        let info = {
            status: this.state.value,//1未完成2完成
            start: page,
            size: 10,
            currencyId: this.props.currencyId,
            beginTime: nowDay3 == beginTimeStart ? nowDay3 : beginTimeStart,
            endTime: nowDay4 == createTime ? nowDay4 : createTime
        }
        const {dispatch} = this.props
        //传给父组件的页数
        this.props.nextModules(page)
        dispatch(PayCoinTable(dispatch, info))
    }

    //开始时间
    startTime(date, startTime) {
        //处理开始时间格式传送给后台
        beginTimeStart = startTime
        let info = {
            status: this.state.value,//1未完成2完成
            start: 1,
            size: 10,
            currencyId: this.props.currencyId,
            beginTime: beginTimeStart == nowDay3 ? nowDay3 : beginTimeStart,
            endTime: createTime
        }
        const {dispatch} = this.props
        dispatch(PayCoinTable(dispatch, info))
    }

    //结束时间
    endTime(date, endTime) {
        //处理结束时间格式传送给后台
        createTime = endTime
        let info = {
            status: this.state.value,//1未完成2完成
            start: 1,
            size: 10,
            currencyId: this.props.currencyId,
            beginTime: beginTimeStart,
            endTime: createTime == nowDay4 ? nowDay4 : createTime
        }
        const {dispatch} = this.props
        dispatch(PayCoinTable(dispatch, info))
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

    //这里获取当前时间需要注意一下，可能是生命周期的原因，在DidMount的时候不显示，在WillMount时候就能显示，
    componentWillMount() {
        nowDay3 = getBeforeDate(1);
        nowDay4 = getBeforeDate();
        beginTimeStart = nowDay3
        createTime = nowDay4
    }
    render() {
        const { startTime,endTime,data,isPage,total,status } = this.props.PayCoin.payCoinTableList
        const { currencyId } = this.props.PayCoin
        const { coinFee } = this.props.coinInfo
        let item = data.map((cur, index, arr) => {
            return <tr key={index.toString()} style={{display: cur.timer}}>
                <td>{cur.createTime}</td>
                <td>{cur.walletSn}</td>
                <td>{cur.coinNum}</td>
                { parseFloat(coinFee) ? <td>{cur.fee}</td> : <td></td>}
                { parseFloat(coinFee) ? <td>{cur.realNum}</td> : <td></td>}
                <td>{cur.confirms}</td>
            </tr>
        })
        return (
            <div className="pay_record">
                <div className="pay_record_title clearfix">
                    <span className="fl">充币记录</span>
                    <span className="fr" onClick={this.hideFunc.bind(this)}>{this.state.show ?
                        <span className="fr" onClick={this.hideFunc.bind(this)}>收起<Icon type="down"/></span> :
                        <span className="fr" onClick={this.showFunc.bind(this)}>展开<Icon type="up"/></span>}</span>
                </div>
                <div className={this.state.show ? "pay_record_table clearfix show" : "pay_record_table clearfix hide"}>
                    <Select className="fl" value={`${status}`} style={{width: 124}} onChange={this.onChangeValue.bind(this)}>
                        <Option value="1">未完成</Option>
                        <Option value="2">完成</Option>
                    </Select>
                    <div className="inlineBlock pay_record_table_date fr">
                        <span>起止日期</span><DatePicker onChange={this.startTime.bind(this)} allowClear={false}
                                                     value={ startTime }/><span>至</span><DatePicker
                        onChange={this.endTime.bind(this)} value={ endTime } allowClear={false}/>
                    </div>
                    <div className="pay_record_main fl">
                        <table cellSpacing="0" cellPadding="0" className="pay_record_main_center text-center">
                            <thead>
                            <tr>
                                <th>充币时间</th>
                                <th>充币地址</th>
                                <th>充币数量</th>
                                { parseFloat(coinFee) ? <th>手续费</th> : <th></th>}
                                { parseFloat(coinFee) ? <th>实际到账数量</th> : <th></th>}
                                <th>状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            {item}
                            </tbody>
                        </table>
                        <div
                            className={isPage == 0 ? "hide pay_record_page text-center" : "show pay_record_page text-center"}>
                            <Pagination current={parseInt(this.props.current)} total={parseInt(parseInt(total))}
                                        onChange={this.onChange.bind(this)}/></div>
                        <p className={isPage == 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>
                            你还没有充币记录哦!</p>
                    </div>
                </div>
            </div>
        )
    }
}