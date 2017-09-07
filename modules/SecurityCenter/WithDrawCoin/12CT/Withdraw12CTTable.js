import React from 'react';
import {Icon, DatePicker, Pagination,Select} from 'antd';
import moment from 'moment';
import axios from 'axios'
import qs from 'qs'
import {getBeforeDate} from '../../../../tools/utils'
import { WithDrawCTRecordTable } from '../../../Redux/Action/WithDrawAction'

const Option = Select.Option;
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
            page:1,//默认页数开始页数
        }
    }

    // 当查看完成状态
    onChangeValue(value) {
        this.setState({
            value:value,
            current:1//页数
        })
        const { dispatch } = this.props
        let info = {
            status: value,//1未完成2完成
            start:1,
            size:10,
            currentyId:this.props.currencyId,
            beginTime:nowDay3 === beginTime ? nowDay3 : beginTime,
            endTime:nowDay4 === createTimeEnd ? nowDay4 : createTimeEnd
        }
        //传给父组件的页数
        this.props.nextModules(1)
        dispatch(WithDrawCTRecordTable(dispatch, info))

    }

    //分页器
    onChange(page) {
        const { dispatch } = this.props
        let info = {
            status: this.state.value,//1未完成2完成
            start:page,
            size:10,
            currentyId:this.props.currencyId,
            beginTime:nowDay3 === beginTime ? nowDay3 : beginTime,
            endTime:nowDay4 === createTimeEnd ? nowDay4 : createTimeEnd
        }
        this.setState({
            page:page,
        })
        //传给父组件的页数
        this.props.nextModules(page)
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
            beginTime = startTime
            const { dispatch } = this.props
            let info = {
                status: this.state.value,//1未完成2完成
                start:1,
                size:10,
                currentyId:this.props.currencyId,
                beginTime:beginTime,
                endTime:nowDay4 === createTimeEnd ? nowDay4 : createTimeEnd
            }
            dispatch(WithDrawCTRecordTable(dispatch, info))
        }
        //结束时间
        endTime (date,endTime) {
            //处理结束时间格式传送给后台
            createTimeEnd = endTime
            const { dispatch } = this.props
            let info = {
                status: this.state.value,//1未完成2完成
                start:1,
                size:10,
                currentyId:this.props.currencyId,
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
        nowDay3 = getBeforeDate(1);
        nowDay4 = getBeforeDate();
        beginTime = nowDay3
        createTimeEnd = nowDay4
    }

    render() {
        const { data,isPage,total,startTime,endTime,status } = this.props.CTRecordTable
        let item = data.map((cur, index) => {
            return <tr key={index.toString()}>
                <td>{cur.createTime}</td>
                <td>{cur.ctbWalletSn}</td>
                <td className="green">{this.formatPrice(cur.initAmount)}</td>
                <td className="warn">{this.formatPrice(cur.fee)}</td>
                <td>{cur.paidAmount}</td>
                <td>{cur.confirms}</td>
            </tr>
        })
        return (
            <div className="pay_record">
                <div className="pay_record_title clearfix">
                    <span className="fl">提币记录</span>
                    <span className="fr" onClick={this.hideFunc.bind(this)}>{this.state.show ?
                        <span className="fr" onClick={this.hideFunc.bind(this)}>收起<Icon type="down"/></span> :
                        <span className="fr" onClick={this.showFunc.bind(this)}>展开<Icon type="up"/></span>}</span>
                </div>
                <div className={this.state.show ? "pay_record_table clearfix show" : "pay_record_table clearfix hide"}>
                    <Select className="fl" value={ status == 1 ? "未完成" : "完成" } style={{width: 124}} onChange={this.onChangeValue.bind(this)}>
                        <Option value="1">未完成</Option>
                        <Option value="2">完成</Option>
                    </Select>
                    <div className="inlineBlock pay_record_table_date fr">
                        <span>起止日期</span><DatePicker onChange={this.startTime.bind(this)} allowClear={false}
                        value={startTime}/><span>至</span><DatePicker onChange={this.endTime.bind(this)}
                        value={endTime} allowClear={false}/>
                    </div>
                    <div className="pay_record_main fl">
                        <table className="pay_record_main_center text-center">
                            <thead>
                            <tr>
                                <th>提币时间</th>
                                <th>提币地址</th>
                                <th>提币数量</th>
                                <th>手续费</th>
                                <th>实际到账数量</th>
                                <th>状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            {item}
                            </tbody>
                        </table>
                        <div className={isPage === 0 ? "hide pay_record_page text-center" : "show pay_record_page text-center" }>
                            <Pagination current={parseInt(this.props.current)} total={parseInt(total)}
                                        onChange={this.onChange.bind(this)}/>
                        </div>
                        <p className={isPage === 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>你还没有提币记录哦!</p>
                    </div>
                </div>
            </div>
        )
    }
}