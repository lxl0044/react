import React from 'react';
import agencyArrows from '../../../images/agencyArrows.png'
import agencyDai from '../../../images/agencyDai.png'
import agencyDui from '../../../images/agencyDui.png'
import agencyMoney from '../../../images/agencyMoney.png'
import agencyZhi from '../../../images/agencyZhi.png'
import qq from "../../../images/qq.gif"

const data = [{
    img:qq,
    text:"代理：果果",
    agency:"3515454134",
    url:"http://wpa.qq.com/msgrd?v=3&uin=3515454134&site=qq&menu=yes"
},{
    img:qq,
    text:"代理：清清",
    agency:"2439802267",
    url:"http://wpa.qq.com/msgrd?v=3&uin=2439802267&site=qq&menu=yes"
},{
    img:qq,
    text:"代理：大源",
    agency:"1023785436",
    url:"http://wpa.qq.com/msgrd?v=3&uin=1023785436&site=qq&menu=yes"
},{
    img:qq,
    text:"代理：爱宝",
    agency:"1653085337",
    url:"http://wpa.qq.com/msgrd?v=3&uin=1653085337&site=qq&menu=yes"
},{
    img:qq,
    text:"代理：艾丫",
    agency:"274448782",
    url:"http://wpa.qq.com/msgrd?v=3&uin=274448782&site=qq&menu=yes"
}]
export default class AgencyPay extends React.Component {

    render() {
        let item = data.map((cur,index,arr) => {
            return  <li key={index.toString()}>
                <a href={cur.url} target="_blank" rel="nofollow">
                    <img src={cur.img}/>
                    <p>
                        <span className="show">{cur.text}</span>
                        <span className="show">QQ：{cur.agency}</span>
                    </p>
                </a>
            </li>
        })
        return (
            <div className="AgencyPay">
                <div className="AgencyPay-info text-center">
                    <p><span>温馨提示：</span>以下人员为12链官方指定代理，各位代理均在12链平台完成了KYC3视频认证，并已缴纳足额保证金，您可放心充值。</p>
                    <p>请您添加各代理账号时仔细辨认，保证交易安全。切勿将登录密码、交易密码等账户关键信息提供给任何代理人员。</p>
                </div>
                <div className="AgencyPay-icon text-center">
                    <img src={agencyDai} alt=""/>
                    <span className="blue">选择代理</span>
                    <img src={agencyArrows} alt=""/>
                    <img src={agencyZhi} alt=""/>
                    <span className="blue">获得支付宝充值账号</span>
                    <img src={agencyArrows} alt=""/>
                    <img src={agencyMoney} alt=""/>
                    <span className="blue">充值</span>
                    <img src={agencyArrows} alt=""/>
                    <img src={agencyDui} alt=""/>
                    <span className="blue">完成</span>
                </div>
                <div className="AgencyPay-relation">
                    <ul>
                        {item}
                    </ul>
                </div>
            </div>
        )
    }
}