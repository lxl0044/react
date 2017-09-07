import React from 'react';
import '../../../css/currencyintroduce.css'

export default class LskInfo extends React.Component {


    componentDidMount() {
        document.body.scrollTop = 0
    }

    render() {

        return (
            <div className="rts-info">
                <div className="text-center rts-info-title">
                    比特币/BTC
                </div>
                <div className="coin-info-bgc-Image" style={{marginTop: "40px"}}></div>
                <div className="rts-info-main">
                    <p>
                        比特币（BitCoin）的概念最初由中本聪在2009年提出，根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的数字货币。点对点的传输意味着一个去中心化的支付系统。
                    </p>
                    <p>
                        2008年11月1日，中本聪（Satoshi Nakamoto）在一个隐秘的密码学评论组上贴出了一篇研讨陈述，陈述了他对电子货币的新设想——比特币就此面世，比特币的首笔交易完成。比特币用揭露散布总账摆脱了第三方机构的制约，中本聪称之为“区域链”。用户乐于奉献出CPU的运算能力，运转一个特别的软件来做一名“挖矿工”，这会构成一个网络共同来保持“区域链”。这个过程中，他们也会生成新货币。买卖也在这个网络上延伸，运转这个软件的电脑真相破解不可逆暗码难题，这些难题包含好几个买卖数据。第一个处理难题的“矿工”会得到50比特币奖赏，相关买卖区域加入链条。跟着“矿工”数量的添加，每个迷题的艰难程度也随之进步，这使每个买卖区的比特币生产率保持约在10分钟一枚。
                    </p>
                    <p>
                        与大多数货币不同，比特币不依靠特定货币机构发行，它依据特定算法，通过大量的计算产生，比特币经济使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学的设计来确保货币流通各个环节安全性。P2P的去中心化特性与算法本身可以确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实的拥有者转移或支付。这同样确保了货币所有权与流通交易的匿名性。比特币与其他虚拟货币最大的不同，是其总数量非常有限，具有极强的稀缺性。该货币系统曾在4年内只有不超过1050万个，之后的总数量将被永久限制在2100万个。
                    </p>
                    <p>
                        货币具备以下特征：
                    </p>
                    <p>
                        <span className="font-weight">去中心化：</span>比特币是第一种分布式的虚拟货币，整个网络由用户构成，没有中央银行。去中心化是比特币安全与自由的保证 。
                    </p>
                    <p>
                        <span className="font-weight">全世界流通：</span>比特币可以在任意一台接入互联网的电脑上管理。不管身处何方，任何人都可以挖掘、购买、出售或收取比特币。
                    </p>
                    <p>
                        <span className="font-weight">专属所有权：</span>操控比特币需要私钥，它可以被隔离保存在任何存储介质。除了用户自己之外无人可以获取。
                    </p>
                    <p>
                        <span className="font-weight">低交易费用：</span>可以免费汇出比特币，但最终对每笔交易将收取约1比特分的交易费以确保交易更快执行。
                    </p>
                    <p>
                       <span className="font-weight">无隐藏成本：</span>作为由A到B的支付手段，比特币没有繁琐的额度与手续限制。知道对方比特币地址就可以进行支付。
                    </p>
                    <p>
                        <span className="font-weight">跨平台挖掘：</span>用户可以在众多平台上发掘不同硬件的计算能力。
                    </p>
                </div>
                <div className="coin-info-bgc-Image" style={{marginBottom: "50px"}}></div>
            </div>
        )
    }
}