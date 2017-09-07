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
import partner10 from '../../images/partner_10.png'
import partner11 from '../../images/partner_11.png'
import partner12 from '../../images/partner_12.png'

export default class Partner extends React.Component {
    render() {
        return (
            <div className="partner">
                <div className="partner-box">
                    <div className="top-title text-center"><h1>我们的合作伙伴</h1><p>Cooperative</p></div>
                    <div className="partner-list">
                        <ul className="clearfix">
                            <li><a target="_blank" href="http://www.txcap.com/"><img src={partner1}/></a></li>
                            <li><a target="_blank" href="https://www.okcoin.cn/"><img src={partner2}/></a></li>
                            <li><a target="_blank" href="https://www.icogogo.com"><img src={partner3}/></a></li>
                            <li><a target="_blank" href="https://www.sosobtc.com/"><img src={partner4}/></a></li>
                            <li><a target="_blank" href="http://www.xinmeilaw.com/"><img src={partner5}/></a></li>
                            <li><a target="_blank" href="http://www.ico.com/"><img src={partner6}/></a></li>
                            <li><a target="_blank" href="https://www.bimao.com/"><img src={partner7}/></a></li>
                            <li><a target="_blank" href="http://mvs.live/"><img src={partner8}/></a></li>
                            <li><a target="_blank" href="http://bitpie.com/"><img src={partner9}/></a></li>
                            <li><a target="_blank" href="http://www.jinse.com/"><img src={partner10}/></a></li>
                            <li><a target="_blank" href="http://www.btc38.com/"><img src={partner11}/></a></li>
                            <li><a href="javascript:;"><img src={partner12}/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}