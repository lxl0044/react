import React from 'react';
import '../../css/ourteam.css';
import rateTop from '../../images/rateTop.png'
import rateMain from '../../images/rateMain.png'
export default class RateExplain extends React.Component {
    componentDidMount() {
        document.body.scrollTop = 0
    }
    render() {
        return (
            <div>
                <div className="rate-explain">
                    <div className="rate-explain-title">
                        <div className="rate-explain-title-box">
                            <img src={rateTop}/>
                        </div>
                    </div>
                    <div className="rate-explain-main">
                        <div className="rate-explain-main-img">
                            <img src={rateMain}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}