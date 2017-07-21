// Slogan
import React from 'react';
import TopTitle from '../Common/TopTitle';
import SloganItem from './SloganItem';
import '../../css/section.css';

const data = [{
    id: 1,
    type: 'safety',
    title: '安全',
    info: '严密的认证与防护机制，确保资产交易安全'
}, {
    id: 2,
    type: 'eye-o',
    title: '透明',
    info: '交易数据透明，充分尊重金融市场的交易规范'
}, {
    id: 3,
    type: 'solution',
    title: '公正',
    info: '交易机制公平公正，保障交易者合法权益'
}, {
    id: 4,
    type: 'trophy',
    title: '诚信',
    info: '践行诚信法则，构建良好的金融秩序'
}]

export default class Slogan extends React.Component {
    render() {
        let items = data.map(item => {
            return <SloganItem type={item.type} title={item.title} info={item.info}
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