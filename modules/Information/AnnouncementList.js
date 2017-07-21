import React from 'react';
import axios from 'axios'
import qs from 'qs'
import {Link} from 'react-router';
import {formatDate} from '../../tools/utils'
import TopTitle from '../Common/TopTitle'
import { Icon } from 'antd'

export default class AnnouncementCont extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        document.body.scrollTop = 0
        axios.post('/announce/list', qs.stringify({num: 5}))
            .then(function (res) {
                this.setState({
                    data: res.data.attachment
                })
            }.bind(this))
    }

    render () {
        const { data } = this.state
        let lists = data.map((list, index) => {
            return <li key={list.announceId.toString()} className="clearfix">
                <Link to={"/announce/preview/" + list.announceId} title={list.title}>
                    <Icon type="message" className="fl"/>
                    <span className="fl">{list.title}</span>
                    <span className="fr">{formatDate(list.publishTime, 'YYYY-MM-DD')}</span>
                </Link>
            </li>
        });


        return (
            <div className="announcement-cont">
                <a href="javascript:;" onClick={() => { window.history.back() }}>
                    <Icon type="arrow-left" />
                    返回上一页
                </a>
                <TopTitle title="公告"/>
                <div className="announcement-cont-list">
                    { lists }
                </div>
            </div>
        )
    }
}
