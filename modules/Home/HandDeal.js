import React from 'react';
import '../../css/handdeal.css'
import {Icon} from 'antd'
import handDealImg from './../../images/hand-deal-phone.png'
import axios from 'axios';

const base = 'data:image/png;base64,'

export default class HandDeal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64AndroidUrl: '',
            base64IosUrl: ''
        }
    }

    componentDidMount() {
        axios.post('/downloadapp/updateLocation')
            .then(function (res) {
                this.setState({
                    base64AndroidUrl: res.data.attachment.base64AndroidUrl,
                    base64IosUrl: res.data.attachment.base64IosUrl
                })
            }.bind(this))
    }
    render() {
        return (
            <div className="hand-deal">
                <div className="hand-deal-main">
                    <div className="hand-deal-center">
                        <div>
                            <p>
                                从指尖出发，方寸间，纵享轻松交易！
                            </p>
                            <p>
                                12链手机客户端——专注掌上交易体验
                            </p>
                        </div>
                        <div>
                            <ul className="clearfix">
                                <li className="fl">
                                    <span className="show text-center"><Icon style={{fontSize:"20px",color:"#7cba59",paddingRight:"5px"}} type="android"/><span>Android</span></span>
                                    <img src={base + this.state.base64AndroidUrl}/>
                                </li>
                                <li className="fl">
                                    <span className="show text-center"><Icon className="text-center" style={{fontSize:"20px",color:"#2ec4f7",paddingRight:"5px"}} type="apple"/><span>IOS</span></span>
                                    <img src={base + this.state.base64IosUrl}/>
                                </li>
                            </ul>
                        </div>
                        <img src={handDealImg}/>
                    </div>
                </div>
            </div>
        )
    }
}