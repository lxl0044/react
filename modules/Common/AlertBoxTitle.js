// AlertBoxTitle 
import React from 'react';
import {Icon} from 'antd';

export default class AlertBoxTitle extends React.Component {

    clickHandler() {
        let flag = false;
        this.props.closeAlertBox(flag);
    }

    render() {
        return (
            <div className="alert-box-title">
                {this.props.title}
                <Icon type="close-circle-o" className="fr" onClick={this.clickHandler.bind(this)}/>
            </div>
        )
    }
}