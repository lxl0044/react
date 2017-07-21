import React from 'react';
import '../../css/securitycenter.css';
import '../../css/personalinformation.css'
import SecurityCenterMenu from '../Common/SecurityCenterMenu'


export default class SecurityCenter extends React.Component {
	render() {
		return (
			<div className="SecurityCenter">
				<div className="SecurityCenterMainBox clearfix">
					<SecurityCenterMenu />
					{this.props.children}
				</div>
			</div>
		)
	}
}

