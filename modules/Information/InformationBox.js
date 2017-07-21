// InformationBox
import React from 'react';
import axios from 'axios'
import qs from 'qs'
import TopTitle from '../Common/TopTitle';
import InformationCont from './InformationCont';
import { img } from '../host'

export default class InformationBox extends React.Component {
    state = {
        data: [],
        anymore: true,
        total: ''
    }

    componentDidMount() {
        this.getData(5, 1)
    }

    getData (size, start) {
		axios.post('/news/news', qs.stringify({
            size: size,
            start: start,
            status: 1
        })).then(function (res) {
            let data = res.data.attachment.news
            data.map((item, index) => {
                if (index < res.data.attachment.news.length - 1) {
                    item.hasDevide = true
                }
            })
            this.setState({
                data: data,
                total: res.data.attachment.total
            })
        }.bind(this))
    }

    getMore() {
    	let size = this.state.data.length + 5
    	if(size >= this.state.total) {
    		size = this.state.total
			this.setState({
				anymore: false
			})
			this.getData(size, 1)
    	} else {
    		this.getData(size, 1)
    	}
    }

    render() {
        let articles = this.state.data.map(article => {
            return <InformationCont
                key={article.newsid.toString()}
                index={article.newsid.toString()}
                title={article.title}
                src={img + article.author}
                time={article.time}
                watched={article.count}
                info={article.dec}
                hasDevide={article.hasDevide}
            />
        })

        return (
            <div className="information-box">
                <TopTitle title="资讯"/>
                <div className="information-body">
                    {articles}
                </div>
                {this.state.anymore ? <div className="more" onClick={this.getMore.bind(this)}>查看更多</div> : ''}
            </div>
        )
    }
}