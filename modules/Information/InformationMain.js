// Information
import React from 'react';
import InformationBox from './InformationBox';
import HotNews from './HotNews';
import Announcement from './Announcement'

export default class InformationMain extends React.Component {
	render() {
		return (
			<div>
				<InformationBox />
				<div className="information-rightside">
					<HotNews />
					<Announcement />
				</div>
			</div>
		)
	}
}

