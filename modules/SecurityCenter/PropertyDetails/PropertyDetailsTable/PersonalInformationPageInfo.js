import React from 'react';
import { Pagination,DatePicker,Radio,Select } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { getDate,getBeforeDate,formatNumber } from '../../../../tools/utils'
moment.locale('zh-cn');
import axios from 'axios'
import qs from 'qs'

const Option = Select.Option;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';
// 保存当前时间
let nowDay1 = null,
    nowDay2 = null,
    nowDay3 = null,
    nowDay4 = null;
export default class PersonalInformationPageInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : "7",
            currency:"1",//币种
            handle:"",//操作类型
            nowDay1:nowDay1,//当前时间
            nowDay2:nowDay2,//结束时间
            total: '',//总条数
            isPage: '',//是否显示分页
            data:[],//保存数据
            showTimeInput:false,
            payOrWithDraw:"充值",
            payCoinOrWithDrawCoin:"提现",
            handleTpye:1//需要传送给后台的参数
        }
    }
    //分页器
    onChange (page) {
        let day1 = this.state.nowDay1//开始时间
        let day2 = this.state.nowDay2//结束时间
        let currency = this.state.currency//币种
        let handle = this.state.handle//操作类型
        axios.post('/coin/allMoneyList',qs.stringify({
            start:page,
            size:10,
            beginTime:day1,
            endTime:day2,
            currencyId:currency,//币种1是CNY，2代币
            status:handle//操作类型1充值，2提现
        })).then(function (res) {
              if (res.data.status == 200) {
                    //判断返回的数据的条数
                    if (res.data.attachment.list.length == 0) {
                        this.setState({
                            isPage: res.data.attachment.list.length,
                            data: res.data.attachment.list
                        })
                    } else {
                        //不等于0就进入这里
                        this.setState({
                            data: res.data.attachment.list,
                            total: res.data.attachment.count,
                            isPage: res.data.attachment.list.length
                        })
                    }
                }
            }.bind(this))
    }
    onChangeRadio = (e) => {
        let day = e.target.value;
        let getBeforeDay = getBeforeDate(day)
        if (day == 7){
            this.setState({
                value: day,
                nowDay1:getBeforeDay,
                nowDay2:nowDay4,
                showTimeInput:false
            });
        } else if (day == 0) {
            this.setState({
                value: day,
                showTimeInput:true
            });
        }

    }
    //当操作类型下拉框的时候
    onChangePay (value) {
        this.setState({
            handle:value,
            handleTpye:value
        })
    }
    //当币种选择下拉框的时候
    onChangeMoney (value) {
        if (value === "1") {
            this.setState({
                payOrWithDraw:"充值",
                payCoinOrWithDrawCoin:"提现",
                currency:value,
                handle:"充值",
                handleTpye:1
            })
        }else{
            this.setState({
                payOrWithDraw:"充币",
                payCoinOrWithDrawCoin:"提币",
                currency:value,
                handle:"充币",
                handleTpye:1
            })
        }

    }

    //开始时间
    timeChange = (moment,time) => {
        this.setState({
            nowDay1:time
        })
    }
    //结束时间
    timeChange1 = (moment,time) => {
        this.setState({
            nowDay2:time
        })
    }
    //点击确定的时候
    clkFunc () {
        let day1 = this.state.nowDay1//开始时间
        let day2 = this.state.nowDay2//结束时间
        let currency = this.state.currency//币种
        let handle = this.state.handleTpye//操作类型
        axios.post('/coin/allMoneyList',qs.stringify({
            start:1,
            size:10,
            beginTime:day1,
            endTime:day2,
            currencyId:currency,//币种1是CNY，2代币
            status:handle//操作类型1充值，2提现
        })).then(function (res) {
              if (res.data.status == 200) {
                    //判断返回的数据的条数
                    if (res.data.attachment.list.length == 0) {
                        this.setState({
                            isPage: res.data.attachment.list.length,
                            data: res.data.attachment.list
                        })
                    } else {
                        //不等于0就进入这里
                        this.setState({
                            data: res.data.attachment.list,
                            total: res.data.attachment.count,
                            isPage: res.data.attachment.list.length
                        })
                    }
                }
            }.bind(this))
    }
    //这里获取当前时间需要注意一下，可能是生命周期的原因，在DidMount的时候不显示，在WillMount时候就能显示，
    componentWillMount () {
        //获取utils里面的方法
        nowDay1 = getBeforeDate(7);
        nowDay2 = getBeforeDate();
        nowDay3 = getBeforeDate(7);
        nowDay4 = getBeforeDate();
        //默认币种是人民币
        this.setState({
            currency:1,
            handle:1,
            nowDay1:nowDay3,
            nowDay2:nowDay4
        })
    }
    //渲染数据
    componentDidMount () {
        //账单明细
        axios.post('/coin/allMoneyList',qs.stringify({
            start:1,
            size:10,
            beginTime:nowDay3,
            endTime:nowDay4,
            currencyId:1,//币种1是CNY，2代币
            status:1//操作类型1充值，2提现
        })).then(function (res) {
              if (res.data.status == 200) {
                    //判断返回的数据的条数
                    if (res.data.attachment.list.length == 0) {
                        this.setState({
                            isPage: res.data.attachment.list.length,
                            data: res.data.attachment.list,
                        })
                    } else {
                        //不等于0就进入这里
                        this.setState({
                            data: res.data.attachment.list,
                            total: res.data.attachment.count,
                            isPage: res.data.attachment.list.length
                        })
                    }
                }
            }.bind(this))
    }
    render() {
        const { sureCoinCoinsList } = this.props
        let item = this.state.data.map((cur,index,arr) => {
            return <tr key={index.toString()}>
                <td>{cur.createTime}</td>
                <td>{ cur.type === 1 ? "充值" : cur.type === 2 ? "提现" : cur.type === 3 ? "充币" : cur.type === 4 ? "提币" : ""}</td>
                <td>{ cur.currencyNameEn }</td>
                <td className="text-right" style={{width:"191px",paddingRight:"64px"}}>{formatNumber(cur.initAmount,4)}</td>
                <td>{formatNumber(cur.fee,2)}</td>
            </tr>
        })
        let options = sureCoinCoinsList.map((cur) => {
            return <Option value={`${cur.currencyId}`}>{`${cur.currencyNameEn}`}</Option>
        })
        return (

            <div className="AccountDetail">
                <div className="AccountDetailTitle clearfix">
                    <div className="clearfix fl DetailTitleList1">
                        <span>账户明细</span>
                    </div>
                    {/*<div className="clearfix fr DetailTitleList2">
                        <Icon type="download"/><span>下载</span>
                    </div>*/}
                </div>
                <div className="AccountDetailMain">
                    <div className="inlineBlock">
                        <label htmlFor="" style={{fontSize:"12px"}}>操作类型</label>
                        <Select style={{width: 70}} value={this.state.handle == "1" ? "充值" : this.state.handle} onChange={this.onChangePay.bind(this)}>
                            <Option value="1">{this.state.payOrWithDraw}</Option>
                            <Option value="2">{this.state.payCoinOrWithDrawCoin}</Option>
                        </Select>
                    </div>
                    <div className="inlineBlock">
                        <label htmlFor="" style={{fontSize:"12px"}}>币种选择</label>
                        <Select style={{width: 70}} defaultValue="1" onChange={this.onChangeMoney.bind(this)}>
                            <Option value="1">CNY</Option>
                            {options}
                        </Select>
                    </div>
                    <div className="AccountDetailMainBtn" style={{display:"inline"}}>
                        <RadioGroup onChange={this.onChangeRadio.bind(this)} value={this.state.value}>
                            <Radio value="7">最近7天</Radio>
                            <Radio value="0">全部</Radio>
                        </RadioGroup>
                    </div>
                    <div style={{display:"inline"}} className={this.state.showTimeInput ? "show" : "hide"}>
                        <span style={{fontSize:"12px",marginRight:"5px"}}>日期</span><DatePicker allowClear={false}  onChange={this.timeChange.bind(this)}/><span style={{fontSize:"12px",margin:"0 5px"}}>至</span><DatePicker allowClear={false} onChange={this.timeChange1.bind(this)}/>
                    </div>
                    <div className="AccountDetailMainButton">
                        <button onClick={this.clkFunc.bind(this)}>确定</button>
                    </div>
                    <div className="AccountDetailMainSelect">
                        <div className="AccountDetailTable">
                             <table cellSpacing="0" cellPadding="0" className="DetailTable text-center">
                                <thead>
                                    <tr>
                                        <th>时间</th>
                                        <th>操作类型</th>
                                        <th>币种名称</th>
                                        <th>{this.state.currency == 1 ? "金额" : "数量"}</th>
                                        <th>手续费</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item}
                                </tbody>
                            </table>
                            <div className={this.state.isPage == 0 ? "hide DetailTablePage text-center" : "show DetailTablePage text-center"}><Pagination defaultCurrent={1} total={parseInt(this.state.total)}
                                                onChange={this.onChange.bind(this)}/></div>
                             <p className={this.state.isPage == 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>
                            暂无记录!</p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}