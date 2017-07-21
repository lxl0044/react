import React from 'react';
import { Link } from 'react-router'
import '../../../css/myintegral.css';
import TopTitle from '../../Common/TopTitle';
import {DatePicker, Pagination,message} from 'antd';
import axios from 'axios';
import qs from 'qs'
let startTime = ''//保存开始时间
let endTime = ''//保存开始时间
let token = localStorage.getItem("token")
let uid = localStorage.getItem("uid")
export default class MyIntegral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],//保存当前请求的后台数据
            total:'',//保存后台数据的数据条数
            display:"none",//如果有数据就让分页显示
            showText:"none",//如果没有分页就让它显示
            points:''
        }
    }

    //监听时间的改变
    onChangeStart(date, dateString) {
        startTime = dateString;
    }
    onChangeEnd(date, dateString) {
        endTime = dateString;
    }
    //监听页数的变化
    onChangePage(pageNumber) {
        axios.post('/user/myPoints', qs.stringify({
            size: 10,
            token: token,
            uid: uid,
            start: pageNumber,
            startTime:startTime,
            endTime:endTime
        })).then(function (res) {
            this.setState({
                dataList: res.data.attachment.points
            })
        }.bind(this))
    }

    //当我点击查询的时侯，找到当前时间对应的数据
    refer = () => {
        if (startTime > endTime) {
            message.error("查询时间方式不对")
            this.setState({
                dataList : [],
                display:"none",
                showText:"block"
            })
        } else if (startTime == '') {
            message.error("查询时间方式不对")
            this.setState({
                dataList : [],
                display:"none",
                showText:"block"
            })
        } else if (endTime == '') {
            message.error("查询时间方式不对")
            this.setState({
                dataList : [],
                display:"none",
                showText:"block"
            })
        } else {
            axios.post('/user/myPoints', qs.stringify({
                size: 10,
                token: token,
                uid: uid,
                start: 1,
                startTime: startTime,
                endTime: endTime
            })
        ).then(function (res) {
            let total = res.data.attachment.total;
            if (total == 0) {
                this.setState({
                    showText:"block",
                    display:"none"
                })
            } else {
                this.setState({
                    showText:"none",
                    display:"block"
                })
            }
            this.setState({
                dataList: res.data.attachment.points,
                total:total
            })
        }.bind(this))
        }
        
    }
    //数据初始化的时候请求后台数据
    componentDidMount() {
        axios.post('/user/myPoints',qs.stringify({
                size: 10,
                token: token,
                uid: uid,
                start: 1
            })
        ).then(function (res) {
            let totalPoints = res.data.attachment.totalPoints
            let points = res.data.attachment.points
                this.setState({
                    points:totalPoints
                })
                if (points == 0) {
                   this.setState({
                    showText:"block",
                    display:"none"
                   })
                } else {
                    this.setState({
                        dataList: points,
                        total:res.data.attachment.total,
                        display:"block"
                    }) 
                }
                
            }.bind(this))
    }

    render() {
        let list = this.state.dataList.map((cur, index, arr)=> {
            if (cur.status) {
                return <tr key={index.toString()}>
                    <td className="MyIntegralListTr1">{cur.time}</td>
                    <td>{cur.type}</td>
                    <td>+{cur.number}</td>
                </tr>
            } else {
                return <tr key={index.toString()}>
                    <td className="MyIntegralListTr1">{cur.time}</td>
                    <td>{cur.type}</td>
                    <td>-{cur.number}</td>
                </tr>
            }

        })
        return (
            <div className="MyIntegral fr">
                <div className="MyIntegralTop">
                    <TopTitle title="我的积分"/>
                    <div className="MyIntegralInfo">
                        <div><span>您的目前积分:</span><span>{this.state.points}</span></div>
                        <div><Link to="personal/faq">如何使用积分></Link><Link to="personal/faq">如何获得积分></Link></div>
                    </div>
                </div>
                <div className="MyIntegralMain">
                    <TopTitle title="积分明细"/>
                    <div className="MyIntegralTime">
                        <div className="MyIntegralTimeList">
                            <DatePicker placeholder={'开始时间'} onChange={this.onChangeStart.bind(this)} />
                            <DatePicker placeholder={'结束时间'} onChange={this.onChangeEnd.bind(this)} />
                        </div>
                        <button onClick={this.refer.bind(this)}>查询</button>
                    </div>
                    <div className="MyIntegralList">
                        <table className="text-center">
                            <thead>
                            <tr>
                                <td>时间</td>
                                <td>积分类型</td>
                                <td>数量(积分)</td>
                            </tr>
                            </thead>
                            <tbody>
                            {list}
                            </tbody>
                        </table>
                        <div className="MyIntegralPages" style={{display:this.state.display}}><Pagination defaultCurrent={1} total={parseInt(this.state.total)}
                                                                     onChange={this.onChangePage.bind(this)}/></div>
                        <p className="MyIntegralPagesText text-center" style={{display:this.state.showText}}>你还没有通知哦!</p>
                    </div>
                </div>
            </div>
        )
    }
}