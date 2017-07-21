import React from 'react';
import { Link } from 'react-router'
import axios from 'axios'
import qs from 'qs'
import { Icon } from 'antd'
import {formatDate} from '../../tools/utils'

export default class AnnouncementPreview extends React.Component {

    state = {
        content: '',
        title: '',
        publishTime: 0
    }



    getNewsid () {
        var arr = window.location.href.split('/')
        return arr[arr.length - 1]
    }

    componentDidMount () {
        document.body.scrollTop = 0
        let hash = this.getNewsid()
        axios.post('/announce/getInfo', qs.stringify({
            announceId: hash
        }))
            .then((res) => {
                if(res.data.status === 200) {
                    this.setState({
                        content: res.data.attachment.content,
                        title: res.data.attachment.title,
                        publishTime: res.data.attachment.publishTime
                    })
                }
            })
    }

    componentDidUpdate () {
        let cont = this.refs.cont
        const { content } = this.state
        cont.innerHTML = content
    }


    render () {

        const { title, publishTime } = this.state
        return (
            <div className="announcement-preivew">
                <a href="javascript:;" onClick={() => { window.history.back() }}>
                    <Icon type="arrow-left" />
                    返回上一页
                </a>
                <div className="announcement-preivew-details">
                    <div className="preview-title">
                        <h2>{title}</h2>
                        <div className="preview-title-time">{`时间：${formatDate(publishTime, 'YYYY-MM-DD hh-mm-ss')}`}</div>
                    </div>
                    <div className="pewview-cont" ref="cont">

                    </div>
                </div>
            </div>
        )
    }
}
