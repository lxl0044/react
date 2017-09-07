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
                    莱特币/LTC
                </div>
                <div className="coin-info-bgc-Image" style={{marginTop: "40px"}}></div>
                <div className="rts-info-main">
                    <p>
                        莱特币受到了比特币(BTC)的启发，并且在技术上具有相同的实现原理，莱特币的创造和转让基于一种开源的加密协议，不受到任何中央机构的管理。
                    </p>
                    <p>
                        Litecoin旨在改进比特币，与其相比，Litecoin具有三种显著差异。
                    </p>
                    <p>
                        第一，Litecoin网络每2.5分钟(而不是10分钟)就可以处理一个块，因此可以提供更快的交易确认。
                    </p>
                    <p>
                        第二，Litecoin网络预期产出8400万个Litecoin，是比特币网络发行货币量的四倍之多。
                    </p>
                    <p>
                        第三，Litecoin在其工作量证明算法中使用了由Colin Percival首次提出的scrypt加密算法，这使得相比于比特币，在普通计算机上进行Litecoin挖掘更为容易。
                    </p>
                    <p>
                        每一个Litecoin被分成100,000,000个更小的单位，通过八位小数来界定。
                    </p>
                    <p>
                        由一个类似于比特币的点对点网络，通过Scrypt工作量证明方案来处Litecoin交易、结余以及发行（当一个足够小的哈希值被发现时，一个块就会被创建，此时Litecoin就会被发行，而发现这个哈希值和创建块的过程被称作“挖矿”）。
                    </p>
                    <p>
                        Litecoin的发行速率按照等比数列，每四年（每840,000个块）减少一半，最终达到总量8400万个LTC。不同于比特币，Scrypt所具有的内存密集特性让Litecoin更适合用图形处理器（GPU）进行“挖矿”。为Scrypt实施的FPGA（现场可编辑逻辑门阵列）和ASIC（专用集成电路），相比于比特币使用的sha256，更为昂贵。
                    </p>
                    <p>
                        Litecoin当前可以交换法定货币以及比特币，大多数通过线上交易平台。可撤销的交易（比如用信用卡进行的交易）一般不用于购买Litecoin，因为Litecoin的交易是不可逆的，因此带来了退款风险。截止到2013年4月25日，一个Litecoin价值大约3.97美元或者0.028比特币。这使得Litecoin成为市值最高约35,000,000美元的第二大电子货币。
                    </p>
                    <p>
                        莱特币是需要通过“矿工挖矿“产生的，挖矿是通过计算机显卡进行哈希运算，如果计算到”爆矿“的值，则系统会一次性奖励50个莱特币。
                    </p>
                </div>
                <div className="coin-info-bgc-Image" style={{marginBottom: "50px"}}></div>
            </div>
        )
    }
}