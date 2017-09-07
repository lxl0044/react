// Slogan
import React from 'react';
import SloganItem from './SloganItem';
import '../../css/section.css';
import safetyIcon from './../../images/safetyIcon.png'
import justIcon from './../../images/justIcon.png'
import lucencyIcon from './../../images/lucencyIcon.png'
import integrityIcon from './../../images/integrityIcon.png'

const data = [{
    id: 1,
    type: safetyIcon,
    title: '安全',
    info: '严密的认证与防护机制，防注入、防渗透、防CC、防DDOS，',
    info1:'确保资产交易安全。'
}, {
    id: 2,
    type: lucencyIcon,
    title: '透明',
    info: '将用户交易数据打包上区块链，做到交易数据透明，构建',
    info1: '平台与用户之间的信任机制。'
}, {
    id: 3,
    type: justIcon,
    title: '公正',
    info: '充分尊重金融市场的交易规范，建立公平公正的交易机制，',
    info1:'保障交易者的合法权益。'
}, {
    id: 4,
    type: integrityIcon,
    title: '诚信',
    info: '遵守数字金融行业的生存法则，构建诚信交易体系，打造',
    info1:'健康良好的金融秩序。'
}]

export default class Slogan extends React.Component {
    render() {
        let items = data.map(item => {
            return <SloganItem type={item.type} title={item.title} info={item.info} info1={item.info1}
                               key={item.id.toString()}/>
        })

        return (
            <div className="slogan">
                <div className="top-title text-center">
                    <h1>我们的服务平台</h1>
                    <p>Service Platform</p>
                </div>
                <div className="slogan-items clearfix">
                    {items}
                </div>
            </div>
        )
    }
}