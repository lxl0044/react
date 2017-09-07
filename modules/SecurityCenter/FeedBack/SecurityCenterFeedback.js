import React from 'react';
import {Tabs, Icon, Pagination, Upload, message} from 'antd';
import {Link} from 'react-router'
import axios from 'axios'
import qs from 'qs'
import { siblings } from '../../../tools/utils'
import AlertBoxTitle from '../../Common/AlertBoxTitle';
import {UpLoadHost} from '../../host'
// import FeedbackLook from './FeedbackLook';
const TabPane = Tabs.TabPane;

const token = localStorage.getItem('token')
const uid = localStorage.getItem('uid')
let typeIndex = 1;
let pageNumber = 1;
let keys = 1 //保存变量已回复和未回复的status
let data = null
export default class SecurityCenterFeedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            closeAlert: false,//问题反馈弹框初始化显示
            list: [],//保存数据
            previewRoute: '/personal/feedback/preview/',
            questionImage: '',
            questionImageCode: '',
            display: "none",
            total: '',//总条数
            showText: "none",
            viladPhone: true,
            current: ''//显示的当前页数，根据当前页数页码发生改变
        }
    }

    showFunc = () => {
        document.body.style.overflow = 'hidden'
        this.setState({
            closeAlert: true
        })
    }
    // 关闭提问的弹窗
    closeFunc = (close) => {
        document.body.style.overflow = 'auto'
        this.setState({
            closeAlert: close
        })
    }

    // 点击删除，删除对应的一列
    delFunc = (id) => {
        let getList = this.state.list, setList = [];
        axios.post('/user/question/del', qs.stringify({
                qid: id,
            })
        ).then(function (res) {
            // console.log(res)
        })

        setList = getList.map((cur, index, arr) => {
            if (cur.qid === id) {
                cur.display = "none";//删除那一行tr
            }
            return cur;
        });
        this.setState({
            list: setList
        });
    }
    //标签分页 已回复和未回复
    callback = (key) => {
        keys = key
        axios.post('/user/questions', qs.stringify({
            size: 10,
            status: keys,
            start: pageNumber
        })).then(function (res) {
            let attachment = res.data.attachment.list
            let count = res.data.attachment.count
            if (attachment == 0) {
                this.setState({
                    showText: "block",
                    display: "none"
                })
            } else {
                this.setState({
                    display: "block",
                    showText: "none",
                    total: count
                })
            }
            this.setState({
                list: attachment,
                current: 1
            })
        }.bind(this))
    }

    // 测试打印的页数
    onChange = (pageNumber) => {
        pageNumber = pageNumber
        axios.post('/user/questions', qs.stringify({
                size: 10,
                start: pageNumber,
                status: keys
            })
        ).then(function (res) {
            let attachment = res.data.attachment.list
            let count = res.data.attachment.count
            if (attachment == 0) {
                this.setState({
                    showText: "block"
                })
            } else {
                this.setState({
                    display: "block",
                    total: count
                })
            }
            this.setState({
                list: attachment,
                current: pageNumber
            })
        }.bind(this))
    }

    // 检查手机号
    checkPhone = () => {
        let phone = this.refs.phone.value
        if (/^1[3|4|5|7|8]\d{9}$/.test(phone) || phone.length === 0) {
            this.setState({
                viladPhone: true
            })
        } else {
            this.setState({
                viladPhone: false
            })
        }
    }

    // 提交信息
    submit = () => {
        let desc = this.refs.describe.value.trim()
        let name = this.refs.name.value.trim()
        let phone = this.refs.phone.value.trim()


        if (!desc) return message.error("内容不能为空")
        if (!this.state.viladPhone || !phone) return message.error("请检查手机号码")
        if (!name) return message.error("请填写姓名")
        axios.post('/user/ask', qs.stringify({
                detail: desc,
                name: name,
                phone: phone,
                urlkey: this.state.questionImageCode,
                type: typeIndex
            })
        ).then(function (res) {
            if (res.data.status === 200) {
                message.success("发布成功")
                this.closeFunc()
                location.reload()
            }
        }.bind(this))
    }

    // 选择类型
    checkType () {
        siblings(this).forEach(function (item) {
            item.style.backgroundColor = '#fff'
            item.style.color = 'rgba(0, 0, 0, 0.65)'
        })
        this.style.backgroundColor = '#c40000'
        this.style.color = '#fff'
        typeIndex = this.getAttribute('data-index')
    }

    addEvent ()  {
        let types = this.refs.types.children
        Array.prototype.forEach.call(types, function (item) {
            item.addEventListener('click',this.checkType)
        }.bind(this))
    }


    // 组件初始化时调用，以后组件的更新不掉用，整个生命周期只掉用一次，此时可以修改state
    componentDidMount = () => {
        this.addEvent()
        let token = localStorage.getItem("token")
        let uid = localStorage.getItem("uid")
        data = {
            token: token,
            uid: uid
        }

        axios.post('/user/questions', qs.stringify({
                size: 10,
                status: 1,
                start: pageNumber
            })
        ).then(function (res) {
            let attachment = res.data.attachment.list
            let count = res.data.attachment.count
            if (attachment == 0) {
                this.setState({
                    showText: "block",
                    display: "none"
                })
            } else {
                this.setState({
                    display: "block",
                    showText: "none",
                    total: count
                })
            }
            this.setState({
                list: attachment,
                current: 1
            })
        }.bind(this))
    }

    // 上传图片
    handleChange = (info) => {
        if (info.file.status === 'done') {
            this.setState({
                questionImageCode: info.file.response.attachment.key
            })
            this.getBase64(info.file.originFileObj, questionImage => this.setState({questionImage}));
        }
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        if (!isJPG) {
            message.error('只能选择图片上传')
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小必须小于2M');
        }
        return isJPG && isLt2M;
    }

    render() {

        let list = this.state.list.map((cur, index, arr) => {
            return <tr key={index.toString()} className="TabsTabLi" style={{display: cur.display}}>
                <td>{index + 1}</td>
                <td>{cur.type == 1 ? '意见建议' : cur.type == 2 ? '交易问题' : cur.type == 3 ? '常见问题' : cur.type == 4 ? '其他' : ''}</td>
                <td>{cur.detail}</td>
                <td>{cur.status == 2 ? '已回复' : '未回复'}</td>
                <td>{cur.createTime}</td>
                <td><Link to={"/personal/feedback/preview/" + cur.qid}>查看</Link><a href="javascript:;"
                                                                                   onClick={this.delFunc.bind(this, cur.qid)}>删除</a>
                </td>
            </tr>
        })
        return (
            <div className="SecurityCenterFeedback">
                <div className="FeedbackTitle clearfix">
                    <span className="FdTitle_1 fl">问题反馈</span>
                    <span className="FdTitle_2 fr" onClick={this.showFunc.bind(this)}>提问/反馈</span>
                </div>
                <div className="FeedbackTaps">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="未回复" key="1">
                            <table className="TapsTableList text-center">
                                <thead>
                                <tr className="TabsTabLi">
                                    <th>序号</th>
                                    <th>问题类型</th>
                                    <th className="TabsTabLiOmit">问题描述</th>
                                    <th>问题状态</th>
                                    <th>提交时间</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>{list}</tbody>
                            </table>
                            <div className="PagePaging" style={{display: this.state.display}}><Pagination
                                current={parseInt(this.state.current)} total={parseInt(this.state.total)}
                                onChange={this.onChange.bind(this)}/></div>
                        </TabPane>
                        <TabPane tab="已回复" key="2">
                            <table className="TapsTableList text-center">
                                <thead>
                                <tr className="TabsTabLi">
                                    <th>序号</th>
                                    <th>问题类型</th>
                                    <th className="TabsTabLiOmit">问题描述</th>
                                    <th>问题状态</th>
                                    <th>提交时间</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                {list}
                                </tbody>
                            </table>
                            <div className="PagePaging" style={{display: this.state.display}}><Pagination
                                current={parseInt(this.state.current)} total={parseInt(this.state.total)}
                                onChange={this.onChange.bind(this)}/></div>
                        </TabPane>
                    </Tabs>

                    <p className="MyIntegralPagesText text-center" style={{display: this.state.showText}}>你还没有问题哦!</p>
                </div>

                <div className={this.state.closeAlert ? "FdAlertBox" : "FdAlertBox hide"}>
                    <div className="FdAlertBoxRoom">
                        <div className="clearfix">
                            <span className="fl">提问/反馈</span>
                            <AlertBoxTitle closeAlertBox={this.closeFunc.bind(this)}/>
                        </div>
                        <ul className="FdUpload">
                            <li className="FdUpload_Pl">
                                <div className="FdUpload_Pl_1 clearfix">
                                    <span className="fl">问题描述</span>
                                    <div className="fl">
                                        <textarea className="FdUpload_Pl_1_text" cols="31" rows="10"
                                                  ref="describe"></textarea>
                                    </div>
                                </div>
                            </li>
                            <li className="FdUpload_Pic">
                                <div className="FdUpload_Pic_1 clearfix">
                                    <span className="fl">上传截图</span>
                                    <div className="FdUpload_Pic_1_Up fl">
                                        <Upload
                                            name="file"
                                            showUploadList={false}
                                            action={UpLoadHost}
                                            beforeUpload={this.beforeUpload}
                                            onChange={this.handleChange}
                                            data={data}
                                        >
                                            {
                                                this.state.questionImage ?
                                                    <img src={this.state.questionImage}/> :
                                                    <Icon type="plus-circle-o"/>
                                            }
                                        </Upload>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="FdType">
                            <div className="FdTypeBox clearfix">
                                <span>问题类型</span>
                                <ul className="FdTypeList text-center" ref="types">
                                    <li data-index="1" style={{backgroundColor: '#c40000', color: '#fff'}}>意见建议</li>
                                    <li data-index="2">交易问题</li>
                                    <li data-index="3">常见问题</li>
                                    <li data-index="4">其他</li>
                                </ul>
                            </div>
                        </div>
                        <div className="FdInfo">
                            <ul className="FdInfoBox">
                                <li className="clearfix">
                                    <span className="FdInfoName show fl">姓名</span>
                                    <div className="FdInfoNameIpt fl">
                                        <input type="text" ref="name"/>
                                    </div>
                                </li>
                                <li className="clearfix">
                                    <span className="FdInfoPhone show fl">联系电话</span>
                                    <div className="FdInfoPhoneIpt fl">
                                        <input type="text" ref="phone" onInput={this.checkPhone.bind(this)}/>
                                    </div>
                                    {this.state.viladPhone ? '' : <span className="warn"
                                                                        style={{display: 'inline-block; margin-top: 28px; padding-left: 10px'}}>手机号码错误</span>}
                                </li>
                            </ul>
                            <div className="FdSubmit">
                                <button onClick={this.submit.bind(this)}>确认提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}