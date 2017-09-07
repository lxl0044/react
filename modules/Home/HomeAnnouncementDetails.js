import React from 'react'
import { Link } from 'react-router'
import news from '../../images/news.png'


const HomeAnnouncementDetails = (props) => {
    return (
        <div className="home-announcement-details clearfix">
            <div className="fl">
                <img src={news} alt=""/>
            </div>
            <div className="fl">
                <dl>
                    <dt className="clearfix">
                        <Link to={`/announce/preview/${props.announceId}`}>
                            <div className="announcement-title fl">{props.title}</div>
                            <div className="announcement-time fr">{props.publishTime.split(' ')[0]}</div>
                        </Link>
                    </dt>
                    <dd className="announcement-underline"></dd>
                    {/*<dd><Link to={`/announce/preview/${props.announceId}`}>{props.desc}</Link></dd>*/}
                </dl>
            </div>
        </div>
    )
}

export default HomeAnnouncementDetails