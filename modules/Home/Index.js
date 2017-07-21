import React from 'react';
import Banner from './Banner'
import Slogan from './Slogan'
import Partner from './Partner'
import RealTimeMarket from './RealTimeMarket'
import HomeAnnouncement from './HomeAnnouncement'

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <Banner/>
                <div className="IndexBox" style={{backgroundColor: "#fff", overflow: 'hidden'}}>
                    <HomeAnnouncement />
                    <RealTimeMarket/>
                    <Slogan/>
                    <Partner/>
                </div>
            </div>
        )
    }
}