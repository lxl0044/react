import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { message } from 'antd'
import TopTitle from '../../Common/TopTitle';
import zhan from '../../../images/zhan.png'
const token = localStorage.getItem('token')
const uid = localStorage.getItem('uid')
const img = 'http://source.12lian.com/'

export default class FeedbackLook extends React.Component {

    state = {
        list: [],
        question: ''
    }

    componentDidMount() {
        this.getQuestions()
    }

    getQuestions () {
        let hash = FeedbackLook.getId();
        let cont = this.refs.cont;
        cont.scrollTop = cont.scrollHeight;
        axios.post('/user/questionDetail', qs.stringify({
                qid: hash,
                token: token,
                uid: uid
            })
        ).then(function (res) {
            if(res.data.status == 200) {
                this.setState({
                    list: res.data.attachment.list,
                    question: res.data.attachment.question
                })
            }
        }.bind(this))
    }

    static getId(name) {
        var arr = window.location.href.split('/')
        return arr[arr.length - 1]
    }
    
    // 追问信息
    appendAsk () {
        let ask = this.refs.ask.value.trim()
        if(!ask) return message.error('追问内容不能为空')
        axios.post('user/appendAask', qs.stringify({
            detail: ask,
            token: token,
            uid: uid,
            urlkey: '',
            qid: FeedbackLook.getId()
        }))
        .then(function (res) {
            let newAsk = this.state.list
            newAsk.push(res.data.attachment);
            this.setState({
                list: newAsk
            })
            this.getQuestions()
        }.bind(this))
        this.refs.ask.value = ''
    }

    // enter提交
    keySubmit (e) {
        if(e.keyCode === 13) {
            this.appendAsk()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let cont = this.refs.cont;
        cont.scrollTop = cont.scrollHeight;
    }


    render() {
        // 聊天追问
        let lists = this.state.list.map((item, index) => {
            return <div className="FeedbackLookChatService" key={index.toString()} style={{width: '890px'}}>
                    <span>{item.managerId ? '客服' + ':': '客户' + ':'}</span>
                    <p>{item.detail}</p>
                    <div className="text-right">{item.createTime}</div>
                </div>
        })

        return (
            <div className="FeedbackLook fr">
                <div className="FeedbackLookBox">
                    <TopTitle title="查看问题"/>
                    <div className="FeedbackLookMain">
                        <div className="FeedbackLookCenter clearfix">
                            <div className="fl">
                                <span className="fl text-center">问题描述:</span><p className="fr">{this.state.question.detail}</p>
                            </div>
                            <div className="fl">
                                <span className="fl text-center">问题类型:</span><p className="fr">
                                    {this.state.question.type == 1 ? '意见建议' : this.state.question.type == 2 ? '交易问题' : this.state.question.type == 3 ? '常见问题' : '其他'}
                                </p>
                            </div>
                            <div className="fl">
                                <span className="fl text-center">上传截图:</span><b className="UpPic fl">
                                <img src={!this.state.question.urlkey ? zhan : img + this.state.question.urlkey}/></b>
                            </div>
                            <div className="fl LookTimeBox"><p className="text-right LookTime fl">{this.state.question.createTime}</p></div>
                        </div>
                    </div>
                </div>
                <div className="FeedbackLookChat">
                    <TopTitle title="反馈记录"/>
                    <div className="FeedbackLookChatRoom" ref="cont">
                        {lists}
                    </div>
                </div>
                <div className="FeedbackLookSay">
                    <div className="FeedbackLookSayBox"><textarea id="" cols="16" rows="5" ref="ask" maxLength="200" onKeyDown={this.keySubmit.bind(this)}></textarea></div>
                    <div className="FeedbackLookSayAsk fr">
                        <button onClick={this.appendAsk.bind(this)}>追问</button>
                    </div>
                </div>
            </div>
        )
    }
}