import React from 'react';
import axios from 'axios'
import MessageMain from './MessageMain';
import '../../css/message.css'

export default class Message extends React.Component {
	state = {
		data: []
	}

	componentDidMount() {
		let hash = Message.getNewsid();
		
		axios.post('/news/detail?newsid=' + hash)
			.then(function (res) {
				this.setState({
					data: res.data.attachment
				})
			}.bind(this))
	}

	static getNewsid () {
        var arr = window.location.href.split('/')
        return arr[arr.length - 1]
    }

	render() {
		return (
			<div className="Message">
				<MessageMain data={this.state.data}/>
			</div>
		)
	}
}
