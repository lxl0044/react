import React from 'react';
import axios from 'axios'
import qs from 'qs'
import {Link} from 'react-router';


export default class Announcement extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.post('/announce/list', qs.stringify({num: 5}))
            .then(function (res) {
                this.setState({
                    data: res.data.attachment
                })
            }.bind(this))
    }


    render() {
        const { data } = this.state
        let lists = data.map((list, index) => {
            return <li key={list.announceId.toString()} className="clearfix">
                <Link to={"/announce/preview/" + list.announceId} title={list.title}>
                    <span className="fl">{list.title}</span>
                    <span className="fr">{list.publishTime.split(' ')[0]}</span>
                </Link>
            </li>
        });

        return (
            <div className="announcement">
                <div className="announcement-title">
                    <h3 className="fl warn">公告</h3>
                    <Link to="/information/announcement" className="fr">更多</Link>
                </div>
                <div className="announcement-list">
                    <ul>
                        {lists}
                    </ul>
                </div>
            </div>
        )
    }
}