import React from 'react';
import {Icon, DatePicker, Pagination} from 'antd';
import moment from 'moment';
import axios from 'axios'
import qs from 'qs'
import {getDate} from '../../../../tools/utils'
import { WithDrawCTRecordTable } from '../../../Redux/Action/WithDrawAction'

const dateFormat = 'YYYY-MM-DD';


// 保存当前时间
let nowDay1 = null,
    nowDay2 = null,
    nowDay3 = null,//这两个是处理时间传给后台的格式问题
    nowDay4 = null,//这两个是处理时间传给后台的格式问题
    beginTime = null,//保存开始时间
    createTimeEnd = null;//保存结束时间
export default class SecurityCenterPayCNYTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            show: true,
            data: [],
            isPage:'',//是否显示分页
            total:'',//条数
        }
    }

    // 当查看完成状态
    // onChangeValue(e) {
    //    axios.post('/coin/selectTakeList',qs.stringify({
    //             status:e.target.value,
    //             start:1,
    //             size:10,
    //             currentyId:2,
    //             beginTime:nowDay3 == beginTime ? nowDay3 : beginTime,
    //             endTime:nowDay4 == beginTime ? nowDay4 : createTimeEnd
    //         }))
    //         .then(function (res) {
    //             if (res.data.status == 200 ) {
    //                //判断返回的数据的条数
    //                 if (res.data.attachment.list.length == 0) {
    //                     this.setState({
    //                         isPage:res.data.attachment.list.length,
    //                         data:res.data.attachment.list
    //                     })
    //                 } else {
    //                     //不等于0就进入这里
    //                     this.setState({
    //                         data:res.data.attachment.list,
    //                         total:res.data.attachment.total,
    //                         isPage:res.data.attachment.list.length
    //                     })
    //                 }
    //             }
    //
    //         }.bind(this))
    //         this.setState({
    //             value:e.target.value
    //         })
    // }

    //分页器
    onChange(page) {
        const { dispatch } = this.props
        let info = {
            status: 0,//1未完成2完成
            start:page,
            size:10,
            currentyId:2,
            beginTime:nowDay3 === beginTime ? nowDay3 : beginTime,
            endTime:nowDay4 === createTimeEnd ? nowDay4 : createTimeEnd
        }
        dispatch(WithDrawCTRecordTable(dispatch, info))
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
        startTime (date,startTime) {
            //处理开始时间格式传送给后台
            beginTime = startTime + " " + "00" + ":" + "00" + ":" + "00"
            const { dispatch } = this.props
            let info = {
                status: 0,//1未完成2完成
                start:1,
                size:10,
                currentyId:2,
                beginTime:beginTime,
                endTime:nowDay4 === createTimeEnd ? nowDay4 : createTimeEnd
            }
            dispatch(WithDrawCTRecordTable(dispatch, info))
        }
        //结束时间
        endTime (date,endTime) {
            //处理结束时间格式传送给后台
            createTimeEnd = endTime + " " + "23" + ":" + "59" + ":" + "59"
            const { dispatch } = this.props
            let info = {
                status: 0,//1未完成2完成
                start:1,
                size:10,
                currentyId:2,
                beginTime:nowDay3 === beginTime ? nowDay3 : beginTime,
                endTime:createTimeEnd
            }
            dispatch(WithDrawCTRecordTable(dispatch, info))
        }

    // 点击删除
    delFunc(id) {
        let getList = this.state.data;
        getList.map((cur, index, arr) => {
            if (cur.cont && cur.cont === id) {
                cur.timer = "none"
            }
        })
        this.setState({
            data: getList
        })
    }

    // 格式化价格
    formatPrice (fee) {
        let newFee
        if(/\./.test(`${fee}`)) {
            let arr = `${fee}`.split('.')
            if(arr[1].length === 4) {
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
        nowDay1 = getDate("Y/M/D");
        nowDay2 = getDate("Y/M/D");
        nowDay3 = getDate("Y-M-D H:M:S:0");
        nowDay4 = getDate("Y-M-D H:M:S:1");
        beginTime = nowDay3
        createTimeEnd = nowDay4
    }

    componentDidMount() {
        const { dispatch } = this.props
        let info = {
            status: 0,//1未完成2完成
            start: 1,
            size: 10,
            currentyId:2,
            beginTime: nowDay3,
            endTime: nowDay4
        }
        dispatch(WithDrawCTRecordTable(dispatch, info))
    }

    render() {
        const { data,isPage,total } = this.props.CTRecordTable
        let item = data.map((cur, index) => {
            return <tr key={index.toString()}>
                <td>{cur.createTime}</td>
                <td>{cur.ctbWalletSn}</td>
                <td className="green">{this.formatPrice(cur.amount)}</td>
                <td className="warn">{this.formatPrice(cur.fee)}</td>
                <td>{cur.confirms}</td>
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
                    {/*<select className="fl" name="" id="" onChange={this.onChangeValue.bind(this)}>*/}
                        {/*<option value="1">未完成</option>*/}
                        {/*<option value="2">完成</option>*/}
                    {/*</select>*/}
                    <div className="inlineBlock pay_record_table_date fr">
                        <span>起止日期</span><DatePicker onChange={this.startTime.bind(this)} allowClear={false}
                        defaultValue={moment(nowDay1, dateFormat)}/><span>至</span><DatePicker onChange={this.endTime.bind(this)}
                        defaultValue={moment(nowDay2, dateFormat)} allowClear={false}/>
                    </div>
                    <div className="pay_record_main fl">
                        <table className="pay_record_main_center text-center">
                            <thead>
                            <tr>
                                <th>提现时间</th>
                                <th>提现地址</th>
                                <th>提现数量</th>
                                <th>手续费</th>
                                <th>状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            {item}
                            </tbody>
                        </table>
                        <div className={isPage === 0 ? "hide pay_record_page text-center" : "show pay_record_page text-center" }>
                            <Pagination defaultCurrent={1} total={parseInt(total)}
                                        onChange={this.onChange.bind(this)}/>
                        </div>
                        <p className={isPage === 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>你还没有提币记录哦!</p>
                    </div>
                </div>
            </div>
        )
    }
}