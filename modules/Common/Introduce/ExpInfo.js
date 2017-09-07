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
                    Expanse/EXP
                </div>
                <div className="coin-info-bgc-Image" style={{marginTop: "40px"}}></div>
                <div className="rts-info-main">
                    <p>
                        Expanse是一个分散的加密信息，应用和合同平台。这是公平分配，民主控制和社区管理的第一个。通过使用智能合同和分散式封锁技术，它不是由任何一个人或团体运行，而是由Expanse本身的用户运行。该项目通过一个分散的组织进行组织，管理和运营，利用对平台及其未来的直接影响，最重要的是：我们的社区。扩大平台和组织的新功能，整合和核心修改可以根据集体意见提名，投票并实施。
                    </p>
                    <p>
                        Expanse 是一个基于新一代区块链的，公平去中心化的、集直观信息、存储等应用 及智能合约于一体的自治平台。团队成员实力不俗，均为hero member，且发展公开透明。其中之一是franko的开发者。团队在开始锁定了11m EXP，后期供社区支配，凡是持有EXP的用户就有分配权。论坛有人拿EXP和以太坊相提并论，并认为exp的构成更为合理公平。
                    </p>
                    <p>
                        算法机制: Dagger
                    </p>
                    <p className="ct-info-point">
                        区块奖励: 8
                    </p>
                    <p className="ct-info-point">
                        总量极限: 31415926
                    </p>
                    <p className="ct-info-point">
                        区块时间: 60s
                    </p>
                    <p className="ct-info-point">
                        Listen Port: 42786
                    </p>
                    <p className="ct-info-point">
                        RPC Port: 9656
                    </p>
                    <p className="ct-info-point">
                        预留锁定: 11 M (由社区持币用户分配管理)
                    </p>
                </div>
                <div className="coin-info-bgc-Image" style={{marginBottom: "50px"}}></div>
            </div>
        )
    }
}