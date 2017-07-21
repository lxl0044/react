// Partner
import React from 'react';
import { img } from '../host'
import '../../css/section.css';
import partner1 from '../../images/partner_1.png'
import partner2 from '../../images/partner_2.png'
import partner3 from '../../images/partner_3.png'
import partner4 from '../../images/partner_4.png'
import partner5 from '../../images/partner_5.png'
import partner6 from '../../images/partner_6.png'
import partner7 from '../../images/partner_7.png'
import partner8 from '../../images/partner_8.png'
import partner9 from '../../images/partner_9.png'


export default class Partner extends React.Component {
    render() {
        return (
            <div className="partner" style={{backgroundImage: `url(${img}partner_bg.png)`}}>
                <div className="partner-box">
                    <div className="top-title text-center"><h1>我们的合作伙伴</h1><p>Cooperative</p></div>
                    <div className="partner-list">
                        <ul className="clearfix">
                            <li><a href="javascript:;"><img src={partner1}/></a></li>
                            <li><a href="javascript:;"><img src={partner2}/></a></li>
                            <li><a href="javascript:;"><img src={partner3}/></a></li>
                            <li><a href="javascript:;"><img src={partner4}/></a></li>
                            <li><a href="javascript:;"><img src={partner5}/></a></li>
                            <li><a href="javascript:;"><img src={partner6}/></a></li>
                            <li><a href="javascript:;"><img src={partner7}/></a></li>
                            <li><a href="javascript:;"><img src={partner8}/></a></li>
                            <li><a href="javascript:;"><img src={partner9}/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}