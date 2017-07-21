import React from 'react';
import {connect} from 'react-redux'
import {requestUserInfo} from '../../Redux/Action/CommonAction'
import TopTitle from '../../Common/TopTitle';
import {Icon, Pagination} from 'antd';
import axios from 'axios';
import qs from 'qs'

let token = localStorage.getItem("token")
let uid = localStorage.getItem("uid")

class SecurityCenterInform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            current: 1,//默认显示第一页
            showText: "none",
            display: "none",
            total: ''
        }
    }

    // 获取当前时间
    getDate = () => {
        let time = new Date().getTime()
        return new Date(time).toLocaleString()
    }
    // 监听点击的页数
    onChange = (page) => {
        let pages = page;
        let resetList = [];
        axios.post("/notice/notices", qs.stringify({
            token: token,
            uid: uid,
            size: 10,
            start: pages
        }))
            .then(function (res) {
                let data = res.data.attachment.notices;
                let total = res.data.attachment.total
                if (data == 0) {
                    this.setState({
                        showText: "block"
                    })
                } else {
                    this.setState({
                        display: "block",
                        total: total
                    })
                }
                data.map((cur, index, arr) => {
                    if (cur.content) {
                        if (cur.status == 1) {
                            resetList.push({
                                id: cur.noticeid,
                                type: "down",
                                time: cur.time,
                                color: "#999",
                                status: cur.status,
                                title:cur.title
                            });
                            resetList.push({
                                content: cur.content,
                                display: "none",
                                getId: cur.noticeid,
                                color: "#999",
                                status: cur.status,
                                title:cur.title
                            })
                        } else {
                            resetList.push({
                                id: cur.noticeid,
                                type: "down",
                                time: cur.time,
                                color: "#000",
                                status: cur.status,
                                title:cur.title
                            });
                            resetList.push({
                                content: cur.content,
                                display: "none",
                                getId: cur.noticeid,
                                color: "#000",
                                status: cur.status,
                                title:cur.title
                            })
                        }

                    }
                })
                this.setState({
                    list: resetList
                })

            }.bind(this))
    }
    // 绑定点击查看按钮
    clkFunc = (id, status) => {
        let getList = this.state.list,setList=[];
        setList = getList.map((cur) => { // 找到对应的展示行和展开行
            if (cur.id && cur.id === id) {
                cur.type = (cur.type === "down") ? "up" : "down";
                cur.color = "#999"
            }
            if (cur.getId && cur.getId === id) {
                cur.display = (cur.display === "none") ? "" : "none";
                cur.color = "#999"
            }
            return cur;
        });

        const {dispatch} = this.props
        //如果状态不等于1，说明没有查看，如果查看了，就不让发请求
        if (status != 1) {
            axios.post("/notice/updateNotices", qs.stringify({
                token: token,
                uid: uid,
                noticeid: id
            }))
                .then(function (res) {
                    dispatch(requestUserInfo())
                }.bind(this))
        }

        this.setState({
            list: setList
        });

    }
    // 绑定删除按钮
    delFunc = (id) => {
        // 获取当前state里面的list，建立一个空数组
        let getList = this.state.list, setList = [];
        setList = getList.map((cur) => { // 找到对应的展示行和展开行
            if (cur.getId && cur.getId === id) {
                cur.display = "none";//删除那一行tr
            }
            if (cur.id && cur.id === id) {
                cur.display = "none";//删除那一行tr
            }
            return cur;
        });
        //点击删除之后请求的接口
        axios.post("/notice/del", qs.stringify({
                noticeid: id,
                uid: uid,
                token: token
            })
        ).then(function (res) {
            //判断如果状态==200发送请求，重新渲染
            if (res.data.status == 200) {
                axios.post("/notice/notices", qs.stringify({
                    token: token,
                    uid: uid,
                    size: 10,
                    start: 1
                })).then(function (res) {
                    let resetList = []
                    let data = res.data.attachment.notices;
                    let total = res.data.attachment.total
                    if (data == 0) {
                        this.setState({
                            showText: "block",
                            total: total,
                            display: "none"
                        })
                    } else {
                        this.setState({
                            display: "block",
                            showText: "none",
                            total: total
                        })
                    }
                    data.map((cur, index, arr) => {
                        if (cur.content) {
                            if (cur.status == 1) {
                                resetList.push({
                                    id: cur.noticeid,
                                    type: "down",
                                    time: cur.time,
                                    color: "#999",
                                    status: cur.status,
                                    title:cur.title
                                });
                                resetList.push({
                                    content: cur.content,
                                    display: "none",
                                    getId: cur.noticeid,
                                    color: "#999",
                                    status: cur.status,
                                    title:cur.title
                                })
                            } else {
                                resetList.push({
                                    id: cur.noticeid,
                                    type: "down",
                                    time: cur.time,
                                    color: "#000",
                                    status: cur.status,
                                    title:cur.title
                                });
                                resetList.push({
                                    content: cur.content,
                                    display: "none",
                                    getId: cur.noticeid,
                                    color: "#000",
                                    status: cur.status,
                                    title:cur.title
                                })
                            }
                        }
                    })
                    //删除重新渲染ui再次再加到state状态
                    this.setState({
                        list: resetList
                    })
                }.bind(this))
            }
            this.setState({
                list: setList
            });
        }.bind(this))
    }
    componentDidMount = () => {
        let resetList = [];//建立空数组保存id和图标的状态

        axios.post("/notice/notices", qs.stringify({
            token: token,
            uid: uid,
            size: 10,
            start: 1
        }))
            .then(function (res) {
                if (res.data.status == 200) {
                    let data = res.data.attachment.notices;
                    let total = res.data.attachment.total
                    if (data == 0) {
                        this.setState({
                            showText: "block"
                        })
                    } else {
                        this.setState({
                            display: "block",
                            total: total
                        })
                    }
                    data.map((cur, index, arr) => {
                        //一开始渲染出来已查看的
                        if (cur.content) {
                            if (cur.status == 1) {
                                resetList.push({
                                    id: cur.noticeid,
                                    type: "down",
                                    time: cur.time,
                                    color: "#999",
                                    status: cur.status,
                                    title:cur.title
                                });
                                resetList.push({
                                    content: cur.content,
                                    display: "none",
                                    getId: cur.noticeid,
                                    color: "#999",
                                    status: cur.status,
                                    title:cur.title
                                })
                            } else {
                                resetList.push({
                                    id: cur.noticeid,
                                    type: "down",
                                    time: cur.time,
                                    color: "#000",
                                    status: cur.status,
                                    title:cur.title
                                });
                                resetList.push({
                                    content: cur.content,
                                    display: "none",
                                    getId: cur.noticeid,
                                    color: "#000",
                                    status: cur.status,
                                    title:cur.title
                                })
                            }

                        }
                    })
                    this.setState({
                        list: resetList
                    })
                }
            }.bind(this))

    }

    render() {
        let getList = this.state.list.map((cur, index) => { // 遍历新的数据数组
            if (cur.id) { // 如果是展示行
                return (

                    <tr style={{display: cur.display, color: cur.color}} key={index.toString()}>
                        <td>{cur.title}</td>
                        <td>{cur.time}</td>
                        <td><Icon type="close-circle-o" onClick={this.delFunc.bind(this, cur.id)}/></td>
                        <td id={cur.id}><Icon type={cur.type} onClick={this.clkFunc.bind(this, cur.id, cur.status)}/>
                        </td>
                    </tr>
                )
            } else { // 如果是展开行
                return (
                    <tr style={{display: cur.display}} key={index.toString()}>
                        <td colSpan="4" style={{color: cur.color}} className="text-left TextIndent">{cur.content}</td>
                    </tr>
                )
            }
        });
        return (
            <div className="SecurityCenterInform fr">
                <TopTitle title="通知"/>
                <div className="InformBox">
                    <table className="InformTable">
                        <thead style={{color: "#000"}}>
                        <tr>
                            <td>主题</td>
                            <td>时间</td>
                            <td>删除</td>
                            <td>查看</td>
                        </tr>
                        </thead>
                        <tbody>
                        {getList}
                        </tbody>
                    </table>
                </div>
                <div className="InformPages" style={{display: this.state.display}}><Pagination defaultCurrent={1}
                                                                                               onChange={this.onChange}
                                                                                               total={parseInt(this.state.total)}/>
                </div>
                <p className="InformPagesText text-center" style={{display: this.state.showText}}>你还没有通知哦!</p>
            </div>
        )
    }
}

export default connect()(SecurityCenterInform)
