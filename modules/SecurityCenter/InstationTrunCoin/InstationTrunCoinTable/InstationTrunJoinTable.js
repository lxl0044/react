import React from 'react';
import {DatePicker,Pagination,Popover} from 'antd';
import {getBeforeDate,formatNumber} from '../../../../tools/utils'
import { sureInstationTrunCoinList } from '../../../Redux/Action/InstationTrunCoinAction'

const dateFormat = 'YYYY-MM-DD';
// 保存当前时间
let nowDay3 = null,//这两个是处理时间传给后台的格式问题
    nowDay4 = null,//这两个是处理时间传给后台的格式问题
    beginTime = null,//保存开始时间
    createTimeEnd = null;//保存结束时间
export default class InstationTrunCoinTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            data: [],
            isPage:'',//是否显示分页
            total:'',//条数
            page:1//默认页数开始页数
        }
    }

    // 当查看完成状态
    onChangeValue(value) {
        // this.setState({
        //     value:value
        // })
        // const { dispatch } = this.props
        // let info = {
        //     status: value,//1未完成2完成
        //     start:this.state.page,
        //     size:10,
        //     currentyId:this.props.currencyId,
        //     beginTime:nowDay3 === beginTime ? nowDay3 : beginTime,
        //     endTime:nowDay4 === createTimeEnd ? nowDay4 : createTimeEnd
        // }
        // dispatch(WithDrawCTRecordTable(dispatch, info))

    }

    //分页器
    onChange(page) {
        const { currencyId } = this.props.InstationTrunCoinInfo.attachment
        const { dispatch } = this.props
        let parmas = {
            createTimeBegin:beginTime === nowDay3 ? nowDay3 : beginTime,
            createTimeEnd:createTimeEnd === nowDay4 ? nowDay4 : createTimeEnd,
            currencyId: currencyId,
            size:10,
            start:page,
            type:2
        }
        this.setState({
            page:page
        })
        //传给父组件的页数
        this.props.nextModules(page)
        dispatch(sureInstationTrunCoinList(dispatch,parmas))
    }
    //开始时间
    startTime (date,startTime) {
        beginTime = startTime
        // //处理开始时间格式传送给后台
        const { currencyId } = this.props.InstationTrunCoinInfo.attachment
        const { dispatch } = this.props
        let parmas = {
            createTimeBegin:startTime,
            createTimeEnd:createTimeEnd === nowDay4 ? nowDay4 : createTimeEnd,
            currencyId: currencyId,
            size:10,
            start:this.state.page,
            type:2
        }
        dispatch(sureInstationTrunCoinList(dispatch,parmas))
    }
    //结束时间
    endTime (date,endTime) {
        createTimeEnd = endTime
        // //处理结束时间格式传送给后台
        const { currencyId } = this.props.InstationTrunCoinInfo.attachment
        const { dispatch } = this.props
        let parmas = {
            createTimeBegin:beginTime === nowDay3 ? nowDay3 : beginTime,
            createTimeEnd:endTime,
            currencyId: currencyId,
            size:10,
            start:this.state.page,
            type:2
        }
        dispatch(sureInstationTrunCoinList(dispatch,parmas))
    }

    //这里获取当前时间需要注意一下，可能是生命周期的原因，在DidMount的时候不显示，在WillMount时候就能显示，
    componentWillMount() {
        //引入ttils文件，获取时间方法，
        nowDay3 = getBeforeDate(1);
        nowDay4 = getBeforeDate();
        beginTime = nowDay3//保存开始时间
        createTimeEnd = nowDay4
    }

    render() {
        const { data,isPage,total,startTime,endTime } = this.props.InstationTrunCoinList
        const { pointNum } = this.props.InstationTrunCoinInfo.currency
        let item = data.map((cur, index) => {
            return <tr key={index.toString()}>
                <td>{cur.createTime}</td>
                <td>{cur.fromCustomerUid}</td>
                <td>{formatNumber(cur.amount,pointNum)}</td>
                <td>{formatNumber(cur.fee,2)}</td>
                <td>{ cur.status === 2 ? "完成" : cur.status === 5 ? <Popover placement="bottomRight" content={!cur.note ? "无" : cur.note} trigger="hover">
                    <span className="blue">驳回</span>
                </Popover> : "未完成"}</td>
            </tr>
        })
        return (
            <div className="InstationTrunCoinTable-table">
                <div className="InstationTrunCoinTable-table-wrap clearfix">
                    <div className="inlineBlock fr">
                        <span>起止日期</span><DatePicker onChange={this.startTime.bind(this)} allowClear={false}
                                                     value={startTime}  /><span>至</span><DatePicker onChange={this.endTime.bind(this)}
                                                                                                    allowClear={false} value={endTime} />
                    </div>
                    <div className="InstationTrunCoinTable-table-main fl">
                        <table className="InstationTrunCoinTable-table-center text-center">
                            <thead>
                            <tr>
                                <th>转入时间</th>
                                <th>转出UID</th>
                                <th>转入数量</th>
                                <th>手续费</th>
                                <th>状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            {item}
                            </tbody>
                        </table>
                        <div className={isPage === 0 ? "hide pay_record_page text-center" : "show pay_record_page text-center" }>
                            <Pagination value={1} total={parseInt(total)}
                                        onChange={this.onChange.bind(this)}/>
                        </div>
                        <p className={isPage === 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>暂无记录!</p>
                    </div>
                </div>
            </div>
        )
    }
}