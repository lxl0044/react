// toptitle 
import React from 'react';

export default class TopTitle extends React.Component {
    render() {
        let cls = this.props.className || '';
        return (
            <div className={'top-title ' + cls}>{this.props.title}</div>
        )
    }
}