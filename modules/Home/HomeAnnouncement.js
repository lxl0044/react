import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getAnnouncement } from '../Redux/Action/CommonAction'
import '../../css/announcement.css'
import HomeAnnouncementDetails from './HomeAnnouncementDetails'


class HomeAnnouncement extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getAnnouncement(2))
    }


    render () {

        const { announcementList } = this.props
        let lists = announcementList.map((item, index) => {
            return <HomeAnnouncementDetails { ...item } key={`homeAnnouncement${index}`}/>
        })

        return (
            <div className="home-announcement">
                <p style={{width: '1200px', margin: '15px auto 0',backgroundColor: '#fffaf4'}}><span style={{fontWeight: '600', color: 'red'}}>风险提示:</span>数字货币价格波动较大，其交易存在较大风险（预挖、暴涨暴跌、庄家操控、团队解散、技术缺陷等），12链严格执行《关于防范比特币风险的通知》等政策法规，依法为数字货币投资者提供自由交易平台，但对币的价值不做任何投资承诺，请您投资前对数字货币充分认知，理性判断自己的投资能力，审慎做出投资决策！</p>
                <div className="home-announcement-title text-center">
                    <h1>公告</h1>
                    <p>Announcement</p>
                </div>
                <div className="home-announcement-cont clearfix">
                    {lists}
                </div>
                <div className="announcement-more">
                    <Link to="/information/announcement">更多...</Link>
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

