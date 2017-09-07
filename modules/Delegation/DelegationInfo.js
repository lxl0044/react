import React from 'react'
import {Select, DatePicker, Pagination,Modal} from 'antd'
import {delegationDetails,repealBillOne} from '../Redux/Action/DelegationAction'
import { getDate ,getBeforeDate } from './../../tools/utils'
import moment from 'moment'
const dataFormat = 'YYYY-MM-DD'
const Option = Select.Option;
var md5 = require('./../../tools/MD5.js')
import { formatNumber } from './../../tools/utils'
//交易密码的加盐
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";
// 保存当前时间
let orderNo = null;//订单单号
export default class DelegationInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value1:1,//类型
            value2:0,//交易类型
            value3:10,//交易状态
            pwdText:true,//文本错误
            key:1//默认页数
        }
    }
    //开始时间
    startTime = (date, startTime) => {
        const { dispatch } = this.props
        dispatch({type: 'CHANGE_DELEGATION_STARTTIME', startTime: moment(startTime, dataFormat)})
    }
    //结束时间
    endTime = (date, endTime) => {
        const { dispatch } = this.props
        dispatch({type: 'CHANGE_DELEGATION_ENDTIME', endTime: moment(endTime, dataFormat)})
    }

    // 分页
    onChange(key) {
        const { dispatch } = this.props
        const { currencyId } = this.props
        const { startTime, endTime } = this.props
        this.setState({
            key:key
        })
        let info = {
            beginTime:startTime._i,
            endTime:endTime._i,
            start:key,
            size:10,
            buyOrSell:this.state.value2,//不限0买入1卖出2
            currencyId:currencyId,//币种
            status:this.state.value3,//10全部,0未成交,1部分成交,2全部成交,3委托失败,4全部撤单,5部分成交后撤单,
            type:this.state.value1//限价1市价2
        }
        //传给父组件的页数
        this.props.nextModules(key)
        dispatch(delegationDetails(dispatch,info))
    }

    //类型
    handleChange1 (value) {
        this.setState({
            value1:value
        })
    }
    //交易类型
    handleChange2 (value) {
        this.setState({
            value2:value
        })
    }
    //交易状态
    handleChange3 (value) {
        this.setState({
            value3:value
        })
    }

    //点击确定的时候
    subFunc() {
        const { dispatch } = this.props
        const { currencyId } = this.props
        const { startTime, endTime } = this.props

        let info = {
            beginTime:startTime._i,
            endTime: endTime._i,
            start:1,
            size:10,
            buyOrSell:this.state.value2,//不限0买入1卖出2
            currencyId:currencyId,//币种
            status:this.state.value3,//10全部,0未成交,1部分成交,2全部成交,3委托失败,4全部撤单,5部分成交后撤单,
            type:this.state.value1//限价1市价2
        }
        dispatch(delegationDetails(dispatch,info))
    }

    //点击撤单的时候
    repealBill (orderNoNum) {
        const { dispatch,pwdStatus } = this.props
        const { currencyId } = this.props
        const { startTime, endTime } = this.props
        orderNo = orderNoNum
        //调用列表的传参
        let page = this.state.key
        let size = 10
        let buyOrSell = this.state.value2//不限0买入1卖出2
        let status = this.state.value3  //10全部,0未成交,1部分成交,2全部成交,3委托失败,4全部撤单,5部分成交后撤单
        let type = this.state.value1//限价1市价2
        //判断用不用输入交易密码1用，2不用
        if (pwdStatus == "2") {
            //撤销订单要的参数
            let info = {
                currencyId:currencyId,
                fdPassword:'',
                orderNo:orderNo,
                source:1
            }
            //关闭状态，可以直接发撤单
            return dispatch(repealBillOne(dispatch,info,startTime._i,endTime._i,page,currencyId,size,buyOrSell,status,type))
        }
        dispatch({type: 'DELEGATION_SHOW_MODAL'})

    }

    handleCancel (){
        const { dispatch } = this.props
        let jyCode = this.refs.jyCode
        jyCode.value = ''

        dispatch({type: 'DELEGATION_CLOSE_MODAL'})
    }

    //确定输入交易密码
    clkFunc () {
        let uid = localStorage.getItem("uid")
        let jyCode = md5(this.refs.jyCode.value.trim() + dealSalt + uid)
        const { dispatch,jyPwd} = this.props
        const { currencyId } = this.props
        const { startTime, endTime } = this.props
        let page = this.state.key
        let size = 10
        let buyOrSell = this.state.value2//不限0买入1卖出2
        let status = this.state.value3  //10全部,0未成交,1部分成交,2全部成交,3委托失败,4全部撤单,5部分成交后撤单
        let type = this.state.value1//限价1市价2
        let info = {
            currencyId:currencyId,
            fdPassword:jyCode,
            orderNo:orderNo,
            source:1
        }
        dispatch(repealBillOne(dispatch,info,startTime._i,endTime._i,page,currencyId,size,buyOrSell,status,type))
    }
    render() {
        const { pwdStatus, visible } = this.props
        const {data, isPage, total} = this.props.details
        const { startTime, endTime } = this.props
        const { pointPrice, pointNum } = this.props

        let item = data.map((cur, index, arr) => {
            return <tr key={index.toString()}>
                <td>{cur.orderTime}</td>
                {cur.buyOrSell == 1 ? <td className="green">买入</td> : <td className="warn">卖出</td>}
                <td><span>{formatNumber(cur.num,pointNum)}</span><br/><span>/{formatNumber(cur.tradeNum,pointNum)}</span></td>
                <td>{formatNumber(cur.remainNum,pointNum)}</td>
                <td><span>{formatNumber(cur.price,pointPrice)}</span>/<span>{formatNumber(cur.averagePrice,pointPrice)}</span></td>
                <td className="text-right"style={{paddingRight:"30px"}}>{formatNumber(cur.dealAmount,2)}</td>
                <td>{formatNumber(cur.fee,2)}</td>
                <td>
                    <span>{cur.status == 10 ? "全部成交" :
                        cur.status == 0 ? "未成交" :
                            cur.status == 1 ? "部分成交" :
                                cur.status == 2 ? "全部成交" :
                                    cur.status == 3 ? "委托失败 " :
                                        cur.status == 4 ? "全部撤单" :
                                        cur.status == 5 ? "部分成交后撤单" : " "}</span></td>
                <td>{cur.status == 2 || cur.status == 4 || cur.status == 5 ? <a href="javascript:;">--</a> :
                    <a href="javascript:;" onClick={this.repealBill.bind(this,cur.orderNo)}>撤单</a>}</td>
            </tr>
        })
        return (
            <div className="delegation-info">
                <div className="delegation-info-top clearfix">
                    <div className="delegation-type fl">
                        <label htmlFor="">类型</label>
                        <Select defaultValue="1" onChange={this.handleChange1.bind(this)} style={{width: 124}}>
                            <Option value="1">限价委托</Option>
                            {/*<Option value="2">市价委托</Option>*/}
                        </Select>
                    </div>
                    <div className="delegation-time fl">
                        <label htmlFor="">委托时间</label>
                        <DatePicker onChange={this.startTime} allowClear={false} value={startTime}
                                    format={'YYYY-MM-DD'}/>
                        <span className="split">到</span>
                        <DatePicker onChange={this.endTime} allowClear={false} value={endTime}/>
                    </div>
                    <div className="deal-type fl">
                        <label htmlFor="">交易类型</label>
                        <Select defaultValue="0" style={{width: 76}} onChange={this.handleChange2.bind(this)}>
                            <Option value="0">不限</Option>
                            <Option value="1">买入</Option>
                            <Option value="2">卖出</Option>
                        </Select>
                    </div>
                    <div className="deal-status fl">
                        <label htmlFor="">交易状态</label>
                        <Select defaultValue="10" style={{width: 76}} onChange={this.handleChange3.bind(this)}>
                            <Option value="10">不限</Option>
                            <Option value="2">全部成交</Option>
                            <Option value="1">部分成交</Option>
                            <Option value="0">未成交</Option>
                            <Option value="4">撤单</Option>
                        </Select>
                    </div>
                    <a href="javascript:;" onClick={this.subFunc.bind(this)}>
                        确定
                    </a>
                </div>
                <div className="delegation-info-table">
                    <table style={{fontSize:"14px"}}>
                        <thead>
                        <tr>
                            <th>时间</th>
                            <th>类型</th>
                            <th>委托数量／已成交</th>
                            <th>尚未成交</th>
                            <th style={{width:"249px"}}>委托价格／平均成交价</th>
                            <th style={{width:"100px"}} className="text-center">成交金额</th>
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
                        className={isPage == 0 ? "hide pay_record_page text-center" : "show pay_record_page text-center"}>
                        <Pagination current={parseInt(this.props.current)} total={parseInt(total)}
                                    onChange={this.onChange.bind(this)}/></div>
                    <p className={isPage == 0 ? "show InformPagesText text-center" : "hide InformPagesText text-center"}>
                        暂无记录!</p>
                </div>
                <div style={{display: 'inline'}}>
                    <Modal title={"输入交易密码"} visible={visible}
                           onCancel={this.handleCancel.bind(this)} footer={null}>
                        <div className="alert-cont">
                            <div className="input-area">
                                <label htmlFor="">交易密码</label>
                                <div className="input-box thin-box">
                                    <input type="password" ref="jyCode" placeholder="请输入交易密码"
                                           className={this.state.pwdText ? '' : 'wrong'}/>
                                    {this.state.pwdText ? '' : <span>*交易密码输入错误</span>}
                                </div>
                                <div className="box-holder"></div>
                            </div>
                            <div className="input-area">
                                <button className="ResDealPwdButton" onClick={this.clkFunc.bind(this)}>确定</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}