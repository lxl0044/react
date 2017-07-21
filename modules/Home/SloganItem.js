// SloganItem
import React from 'react';
import {Icon} from 'antd';

export default class SloganItem extends React.Component {
    render() {
        return (
            <div className="slogan-item">
                <div className="icon-box">
                    <Icon className="icon" type={this.props.type}/>
                </div>
                <div className="slogan-box fl">
                    <div className="slogan-title">{this.props.title}</div>
                    <div className="slogan-info">
                        <p className="text-center">{this.props.info}</p>
                    </div>
                </div>
            </div>
        )
    }
}