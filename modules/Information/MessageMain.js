import React from 'react';
import { Icon } from 'antd';
import TopTitle from '../Common/TopTitle'

export default class MessageMain extends React.Component {
	
	componentWillReceiveProps(nextProps) {
		let msg = this.refs.msg
		msg.innerHTML = nextProps.data.desc

		document.body.scrollTop = 0
	}

	render() {

		return (
			<div className="MessageMain">
				<TopTitle title="资讯"/>
				<div className="MessageCenter">
					<div className="MessageTitle">
						<h4>{this.props.data.title}</h4>
						<div className="MessageTitleLeft clearfix">
							<ul className="fl">
								<li className="article-time"><i>发表于</i><i>{this.props.data.time}</i></li>
							</ul>
							<span><Icon type="eye-o" />{this.props.data.count}</span>
						</div>
					</div>
					<div className="MessageInfo">
						<div className="MessageInfoText" ref="msg"></div>
					</div>
				</div>
			</div>
		)
	}
}