// 聊天室
import React from 'react';
import {chatHost} from '../../host';
import io from 'socket.io-client'
import './chat.css'
import emoji from '../../../tools/emoji'
import { img } from '../../host'


const token = localStorage.getItem('token')
const uid = localStorage.getItem('uid')
// const ws = chatHost + "?token=" + token + "&uid=" + uid
let socket
export default class Chat extends React.Component {

    state = {
        data: [],
        showEmoji: false
    }


    emitMessage = () => {
        let msg = this.refs.content
        // socket.emit("chat", {coinNameEn: "12ct", coinId: 2, content: msg.value})
        msg.value = ''
    }

    // 回车发送信息
    keyHandler (e) {
        if (e.keyCode == 13) {
            e.preventDefault()
            this.emitMessage()
        }
    }

    // 固定至底部
    fixedBottom () {
        let cont = this.refs.cont;
        cont.scrollTop = cont.scrollHeight;
    }

    // 显示emoji表情
    showEmojiBox = () => {
        this.setState({
            showEmoji: !this.state.showEmoji
        })
    }

    // emoji 添加点击事件
    chooseEmoji () {
        let emojis = this.refs.emoji.children
        Array.prototype.forEach.call(emojis, (item) => {
            item.addEventListener('click', this.clickEmoji.bind(this))
        })
    }

    // // 点击emoji表情
    clickEmoji (e) {
        let content = this.refs.content
        let value = content.value
        let emoji = e.target.innerText

        content.value = value + emoji

        this.setState({
            showEmoji: false
        })

    }

    componentDidMount() {
        // socket = io(ws)

        this.fixedBottom()
        this.chooseEmoji()
        // socket.emit("chat_first_join", {"coinNameEn": "12ct"})
        // socket.on("chat_12ct", (msg) => {
        //     let newData = this.state.data
        //     newData.push(...msg)
        //     this.setState({
        //         data: newData
        //     })
        // })
    }

    componentDidUpdate () {
        this.fixedBottom()
    }


    componentWillUnmount() {
        // socket.disconnect()
    }

    render() {
        const {data, showEmoji} = this.state
        const uid = localStorage.getItem('uid')

        let messages = data.map(function (item,index) {
            return <li className={item.uid == uid ? 'clearfix' : ''} key={`chat${index}`}>
                <span className="msg-user">{ item.uid == uid ? '' : `${item.customerName}：`}</span>
                <span className={item.uid == uid ? "msg-content self fr" : "msg-content"}>{item.content}</span>
            </li>
        })

        let emojis = emoji.map(function (item, index) {
            return <span key={`emoji${index}`}>{ item }</span>
        })

        return (
            <div className="chat" style={{backgroundImage: `url(${img}chat_bg.png)`}}>
                <div className="dealcenter-chat-body">
                    <div className="dealcenter-chat-box" ref="cont">
                        <div className="dealcenter-chat-cont">
                            <ul>
                                {messages}
                            </ul>
                        </div>
                    </div>
                    <div className="chat-area clearfix">
                        <div className="emoji-placeholder">
                            <span onClick={this.showEmojiBox}>😀</span>
                        </div>
                        <div className={showEmoji ? "emoji-box" : "emoji-box hide"} ref="emoji">
                            { emojis }
                        </div>
                        <textarea cols="30" rows="10" placeholder="请输入内容" ref="content" onKeyDown={this.keyHandler.bind(this)}></textarea>
                        <button onClick={this.emitMessage}>发送</button>
                    </div>
                </div>
            </div>
        )
    }
}