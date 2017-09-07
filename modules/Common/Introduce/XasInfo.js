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
                    阿希币/XAS
                </div>
                <div className="coin-info-bgc-Image" style={{marginTop: "40px"}}></div>
                <div className="rts-info-main">
                    <p>
                        Asch是一个去中心化的应用平台。它提供了一系列的sdk和api来帮助开发者构建基于Javascript和侧链技术的去中心化应用。Asch通过提供定制侧链、智能合约、应用托管等一体化的行业解决方案，致力于打造一个易于使用、功能完备、即插即用的系统。利用Asch生态系统，开发者可以快速迭代他们的Javascript 应用，并发布到系统内置的应用商店中，这些应用可以被平台中的分布式节点下载并执行，并服务于普通用户，整个过程都由诚实安全的Asch 侧链共识网络提供安全保证。
                    </p>
                    <p>
                        Asch系统本身也是一个完全开放的、去中心化的应用，内置有代币，单位为XAS，中文名叫阿希币，总量为1亿，75%的币将通过ICO的方式发行。
                    </p>
                    <p>
                        阿希币可以通过双向楔入的方式与侧链或dapp进行交互，作为所有dapp之间资产转换的桥梁和媒介，这些代币将在系统发布之前以ico的方式预售给投资人。系统一旦发布，Asch最初的核心团队将不再掌控系统的走向，只有系统的权益人和代币的拥有者决定系统将来的发展。
                    </p>
                    <p>
                        从模式上来说，Asch跟以太坊类似，都属于Blockchain As A Service，但实现机制大不相同。Asch的扩展性不是通过交易脚本来实现，而是通过侧链。ASCH系统中存在一个主链和若干个侧链(主要由开发者提供)，但是每条链只支持有限的几种交易类型，交易或者合约的逻辑直接由宿主语言来编写，而不是由交易脚本。这样的好处一是降低了合约编程的难度，二是避免了区块链膨胀，三是每种应用都可以定制个性化的区块链参数。
                    </p>
                    <p>
                        <span>Asch系统采用的共识机制是基于DPOS的，也是使用了委托人选举的制度，但是在算法的后半部分采用了一个优化后的PBFT算法变种，这个算法可以在t</span><span>{" < "}</span><span>n / 3时，以O(n^2)消息复杂度，O(1)的时间复杂度使忠诚的节点达成一致，不会分叉，其中t表示拜占庭节点(即可能发生任意行为的节点，比如网络延迟、停机、恶意攻击等等)的个数，n表示所有节点的个数。</span>
                    </p>
                </div>
                <div className="coin-info-bgc-Image" style={{marginBottom: "50px"}}></div>
            </div>
        )
    }
}