import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getAnnouncement} from '../Redux/Action/CommonAction'
import '../../css/announcement.css'
import HomeAnnouncementDetails from './HomeAnnouncementDetails'
import CoinIntroduce from './CoinIntroduce'


class HomeAnnouncement extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getAnnouncement(5))
    }


    render() {

        const {announcementList} = this.props
        let lists = announcementList.map((item, index) => {
            return <HomeAnnouncementDetails {...item} key={`homeAnnouncement${index}`}/>
        })

        return (
            <div className="clearfix home-announcement-and-introduction">
                <div className="home-announcement fl">
                    <div className="home-announcement-fl-title clearfix">
                        <span className="fl">公告</span>
                        <span className="fr">
                        <Link className="blue" to="/information/announcement">more</Link>
                    </span>
                    </div>
                    <div className="home-announcement-cont clearfix">
                        {lists}
                    </div>
                </div>
                <div className="fr home-coin-introduction">
                    <div className="home-coin-introduction-fr-title">
                        <span>
                            币种介绍
                        </span>
                        <div className="home-coin-introduction-center">
                            <CoinIntroduce />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.homePage
    }
})(HomeAnnouncement)

