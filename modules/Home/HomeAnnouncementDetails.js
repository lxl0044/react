import React from 'react'
import { Link } from 'react-router'
import news from '../../images/news.png'
import { formatDate } from "../../tools/utils"


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
                            <div className="announcement-time fr">{formatDate(props.publishTime, 'YYYY-MM-DD')}</div>
                        </Link>
                    </dt>
                    <dd className="announcement-underline"></dd>
                    <Link to={`/announce/preview/${props.announceId}`}>{props.desc}</Link>
                </dl>
            </div>
        </div>
    )
}

export default HomeAnnouncementDetails