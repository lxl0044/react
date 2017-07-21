// Information
import React from 'react';
import '../../css/information'

export default class Information extends React.Component {

	render() {
		return (
			<div className="information clearfix">
				{this.props.children}
			</div>
		)
	}
}