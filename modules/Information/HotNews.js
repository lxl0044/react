// HotNews
import React from 'react';
import axios from 'axios'
import qs from 'qs'
import {Link} from 'react-router';
import TopTitle from '../Common/TopTitle'

export default class HotNews extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.post('/news/recommend', qs.stringify({size: 5, status: 1}))
            .then(function (res) {
                this.setState({
                    data: res.data.attachment
                })
            }.bind(this))
    }

    render() {
        let lists = this.state.data.map((list, index) => {
            return <li key={list.newsid.toString()} className="clearfix">
                    <Link to={"/information/preview/" + list.newsid} title={list.title}><span>{index + 1}</span><p style={{display: 'inline'}}>{list.title}</p></Link>
                </li>
        });

        return (
            <div className="hot">
                <TopTitle title="TOPS"/>
                <div className="hot-list">
                    <ul>
                        {lists}
                    </ul>
                </div>
            </div>
        )
    }
}