// InformationCont
import React from 'react';
import {Link} from 'react-router';

export default class InformationCont extends React.Component {
    render() {
        return (
            <div className="information-cont">
                <Link to={"/information/preview/" + this.props.index}>
                    <div className="article-title">{this.props.title}</div>
                </Link>
                <div className="article-info clearfix">
                    <ul className="fl">
                        <li>发表于{this.props.time}</li>
                    </ul>
                </div>
                <div className="article-img">
                    <Link to={"/information/preview/" + this.props.index}><img src={this.props.src} alt=""/></Link>
                </div>
                <div className={this.props.hasDevide ? 'devide show' : 'devide hide'}></div>
            </div>
        )
    }
}