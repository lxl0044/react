import React from 'react';
import axios from 'axios'
import qs from 'qs'
import {Icon, DatePicker, Pagination} from 'antd';
import moment from 'moment';
import {getDate} from '../../../../tools/utils'

const dateFormat = 'YYYY-MM-DD';


// 保存当前时间
let nowDay1 = null,
    nowDay2 = null,
    nowDay3 = null,
    nowDay4 = null,
    beginTime = null,//保存开始时间
    createTimeEnd = null;//保存结束时间
export default class SecurityCenterPayCNYTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            show: true,
            data: [],
            isPage: '',//是否显示分页
            total: '',//条数
        }
    }

    // 当查看完成状态
    // onChangeValue(e) {
    //     axios.post('/coin/selectListByUuid', qs.stringify({
    //         status: e.target.value,
    //         start: 1,
    //         size: 10,
    //         currencyId: 2,
    //         beginTime: nowDay3 == beginTime ? nowDay3 : beginTime,
    //         endTime: nowDay4 == beginTime ? nowDay4 : createTimeEnd
    //     }))
    //         .then(function (res) {
    //             if (res.data.status == 200) {
    //                 //判断返回的数据的条数
    //                 if (res.data.attachment.points.length == 0) {
    //                     this.setState({
    //                         isPage: res.data.attachment.points.length,
    //                         data: res.data.attachment.points
    //                     })
    //                 } else {
    //                     //不等于0就进入这里
    //                     this.setState({
    //                         data: res.data.attachment.points,
    //                         total: res.data.attachment.total,
    //                         isPage: res.data.attachment.points.length
    //                     })
    //                 }
    //             }
    //
    //         }.bind(this))
    //     this.setState({
    //         value: e.target.value
    //     })
    // }

    //分页器
    onChange(page) {
        axios.post('/coin/selectListByUuid', qs.stringify({
            status: 0,
            start: page,
            size: 10,
            currencyId: 2,
            beginTime: nowDay3 == nowDay3 ? nowDay3 : beginTime,
            endTime: nowDay4 == nowDay4 ? nowDay4 : createTimeEnd
        }))
            .then(function (res) {
                if (res.data.status == 200) {
                    //判断返回的数据的条数
                    if (res.data.attachment.points.length == 0) {
                        this.setState({
                            isPage: res.data.attachment.points.length,
                            data: res.data.attachment.points
                        })
                    } else {
                        //不等于0就进入这里
                        this.setState({
                            data: res.data.attachment.points,
                            total: res.data.attachment.total,
                            isPage: res.data.attachment.points.length
                        })
                    }
                }

            }.bind(this))
    }

    //开始时间
    startTime(date, startTime) {
        //处理开始时间格式传送给后台
        beginTime = startTime + " " + "00" + ":" + "00" + ":" + "00"
        axios.post('/coin/selectListByUuid', qs.stringify({
            status: 0,//1未完成2完成
            start: 1,
            size: 10,
            beginTime: beginTime,
            endTime: nowDay4
        }))
            .then(function (res) {
                if (res.data.status == 200) {
                    //判断返回的数据的条数
                    if (res.data.attachment.list.length == 0) {
                        this.setState({
                            isPage: res.data.attachment.list.length
                        })
                    } else {
                        //不等于0就进入这里
                        this.setState({
                            data: res.data.attachment.list,
                            total: res.data.attachment.total,
                            isPage: res.data.attachment.list.length
                        })
                    }
                }

            }.bind(this))
    }

    //结束时间
    endTime(date, endTime) {
        //处理结束时间格式传送给后台
        createTimeEnd = endTime + " " + "23" + ":" + "59" + ":" + "59"

        axios.post('/coin/selectListByUuid', qs.stringify({
            status: 0,//1未完成2完成
            start: 1,
            size: 10,
            beginTime: nowDay3,
            endTime: createTimeEnd
        }))
            .then(function (res) {
                if (res.data.status == 200) {
                    //判断返回的数据的条数
                    if (res.data.attachment.list.length == 0) {
                        this.setState({
                            isPage: res.data.attachment.list.length
                        })
                    } else {
                        //不等于0就进入这里
                        this.setState({
                            data: res.data.attachment.list,
                            total: res.data.attachment.total,
                            isPage: res.data.attachment.list.length
                        })
                    }
                }

            }.bind(this))
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
        nowDay1 = getDate("Y/M/D");
        nowDay2 = getDate("Y/M/D");
        nowDay3 = getDate("Y-M-D H:M:S:0");
        nowDay4 = getDate("Y-M-D H:M:S:1");
        beginTime = nowDay3
        createTimeEnd = nowDay4
    }

    //获取数据
    componentDidMount() {
        axios.post('/coin/selectListByUuid', qs.stringify({
            status: 0,//1未完成2完成
            start: 1,
            size: 10,
            currencyId: 2,
            beginTime: nowDay3,
            endTime: nowDay4
        }))
            .then(function (res) {
                if (res.data.status == 200) {
                    if (res.data.attachment.points.length == 0) {
                        this.setState({
                            isPage: res.data.attachment.points.length
                        })
                    } else {
                        //不等于0就进入这里
                        this.setState({
                            data: res.data.attachment.points,
                            total: res.data.attachment.total,
                            isPage: res.data.attachment.points.length
                        })
                    }
                }
            }.bind(this))
    }

    render() {
        let item = this.state.data.map((cur, index, arr) => {
            return <tr key={index.toString()} style={{display: cur.timer}}>
                <td>{cur.createTime}</td>
                <td>{cur.walletSn}</td>
                <td>{cur.coinNum}</td>
                <td>{cur.status === 2 ? "完成" : "未完成"}</td>
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
                    {/*<select className="fl" name="" id="" onChange={this.onChangeValue.bind(this)}>*/}
                        {/*<option value="1">未完成</option>*/}
                        {/*<option value="2">完成</option>*/}
                    {/*</select>*/}
                    <div className="inlineBlock pay_record_table_date fr">
                        <span>起止日期</span><DatePicker onChange={this.startTime.bind(this)} allowClear={false}
                                                     defaultValue={moment(nowDay1, dateFormat)}/><span>至</span><DatePicker
                        onChange={this.endTime.bind(this)} defaultValue={moment(nowDay2, dateFormat) } allowClear={false}/>
                    </div>
                    <div className="pay_record_main fl">
                        <table cellSpacing="0" cellPadding="0" className="pay_record_main_center text-center">
                            <thead>
                            <tr>
                                <th>充值时间</th>
                                <th>充值地址</th>
                                <th>充值数量</th>
                                <th>状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            {item}
                            </tbody>
                        </table>
                        <div
                            className={this.state.isPage == 0 ? "hide pay_record_page text-center" : "show pay_record_page text-center"}>
                            <Pagination defaultCurrent={1} total={parseInt(this.state.total)}
                                        onChange={this.onChange.bind(this)}/></div>
                        <p className={this.state.isPage == 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>
                            你还没有充币记录哦!</p>
                    </div>
                </div>
            </div>
        )
    }
}