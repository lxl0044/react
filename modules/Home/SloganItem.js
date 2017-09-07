// SloganItem
import React from 'react';

export default class SloganItem extends React.Component {
    render() {
        return (
            <div className="slogan-item">
                <div className="icon-box">
                    <img src={this.props.type}/>
                </div>
                <div className="slogan-box fl">
                    <div className="slogan-title">{this.props.title}</div>
                    <div className="slogan-info">
                        <p className="text-center">{this.props.info}</p>
                        <p className="text-left">{this.props.info1}</p>
                    </div>
                </div>
            </div>
        )
    }
}