import React from 'react';
import axios from 'axios'
import qs from 'qs'
import {Link} from 'react-router';
import TopTitle from '../Common/TopTitle'
import { Icon,Pagination } from 'antd'

export default class AnnouncementCont extends React.Component {

    state = {
        data: [],
        total:''
    }

    componentDidMount() {
        document.body.scrollTop = 0
        axios.post('/announce/pageList', qs.stringify({
            page: 1,
            rows:10
        }))
            .then(function (res) {
                this.setState({
                    data: res.data.attachment
                })
            }.bind(this))
        //查询公告总条数
        axios.post('/announce/getAnnounceCount')
            .then(function (res) {
                this.setState({
                    total:res.data.attachment
                })
            }.bind(this))
    }
    onChange (page) {
        axios.post('/announce/pageList', qs.stringify({
            page: page,
            rows:10
        }))
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
                    <span className="fr">{list.publishTime.split(' ')[0]}</span>
                </Link>
            </li>
        });


        return (
            <div className="announcement-cont">
                <Link to="/information">
                    <Icon type="arrow-left" />
                    返回上一页
                </Link>
                <TopTitle title="公告"/>
                <div className="announcement-cont-list">
                    <ul>
                        {lists}
                    </ul>
                    <div className="announcement-pages text-center">
                        {this.state.total > 0 ? <Pagination defaultCurrent={1} total={this.state.total}
                                    onChange={this.onChange.bind(this)}/> : ""}
                    </div>
                    <p className={this.state.total > 0 ? "hide text-center" : "show text-center"}>暂无公告</p>
                </div>
            </div>
        )
    }
}
