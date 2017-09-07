import React from 'react';
import { connect } from 'react-redux'
import Header from './TopPart/DealCenterHeader'
import Container from './Main/DealCenterContainer'
import Coins from './TopPart/DealCenterCoins'
import './dealcenter.css'


class DealCenter extends React.Component {

    render() {
        const {bgc} = this.props.style
        const { theme } = this.props

        return (
            <div className={theme === 'light' ? "new-dealcenter" : "new-dealcenter new-dealcenter-dark"} style={{backgroundColor: `${bgc}`}}>
                <Header />
                <div className="new-dealcenter-content">
                    <div className="new-dealcenter-right-side">
                        <Coins { ...this.props }/>
                    </div>
                    <Container { ...this.props }/>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.dealcenterRealtime
    }
})(DealCenter)