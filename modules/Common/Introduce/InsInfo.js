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
                    印链/INS
                </div>
                <div className="coin-info-bgc-Image" style={{marginTop: "40px"}}></div>
                <div className="rts-info-main">
                    <p>
                        印链是由重庆印链科技有限公司发起，并主导开发的一个定位于区块链商业 应用底层平台的公有链项目，印链的初衷是利用区块链技术打击假冒产品，为品 牌商家提供最具公信力的技术以保护商家的品牌形象。印链项目于 2016 年 12 月正式启动，截至 2017 年 4 月，印链已完成区块链底层设计和开发，完成通用 的防伪溯源业务流程，基于印链公链的第一个应用防伪溯源应用平台也已发布公 测，所有人均可体验。
                    </p>
                    <p>
                        印链是第一个专业的商用区块链应用生态平台，从底层架构身份认证管理分 级系统，签订双私钥的多重签名注册绑定管理。这一系统结合管理中介和印链拟 订开发的高级仲裁系统一起，满足去中心网络的去中心监管和政府准入性商业级 监管要求。
                    </p>
                    <p>
                        印链的区块数据采用链式结构进行存储，所有区块都带有上一区块的指针引 用，保证数据不被篡改。印链采用 sha256 函数对数据进行哈希散列，采用 ecc 非对称加密算法进行身份认证，采用 aes 加密算法加密私钥，采用 Merkle 数验 证和存储交易。
                    </p>
                    <p>
                        印链的节点交互用的是 nio socket，用 dns 方法和程序内置方式加载种子 节点。所有节点启动后会进行自检，处于公网下的节点会主动上报自己的 ip 和 端口到网络中，其它节点会对其上报的信息进行验证，如果验证通过，所有节点 会将可用节点的 ip 地址和端口存储到本地，下次启动会直接连接无需再次探测; 若验证多次不通过(会有一个规则，每 10 分钟探测一次，当失败次数超过曾经 成功连接次数的 10 时，会触发)，该节点可能已经下线，将从存储队列里面删 除。当连接节点数量过少时，会主动向已连接节点询问获取更多可用节点。
                    </p>
                    <p>
                        印链通过打洞穿透的方式，让处于内网的节点间能进行互联互通，利用已验证通过的节点作为连接桥梁，帮助处于 nat 背后的节点握手并完成连接。
                    </p>
                    <p>
                        印链没有采用现有的共识机制，是因为印链的商业定位，会成为用户流量和 tps 最大的公有链，同时在商业环境中找到一个价值纽带，poc 就此而生。这也 算是印链的一种”硬创新”，在兼顾性能的同时，兼顾维护效率，下面会有 poc 详细的介绍。
                    </p>
                    <p>
                        印链的代币有 10%用于共识奖励，因为印链独特的共识机制，性能不受节 点数量的影响，所以印链的共识节点没有设置上限，并且是动态变化的，任何人 都可以随时加入赚取奖励。
                    </p>
                    <p>
                        目前印链的合约层仅是简单的脚本代码，防伪码的验证脚本、共识保证金的 赎回脚本，都是一个个小小的智能合约。印链的定位是商业应用平台，故印链会 采取与其它智能合约平台不同的方式进行公有链生态整合和促进成型。印链会招 募第三方团队基于印链打造更多接地气、具有实用性的落地应用项目，前端的受 众人群将会是普通大众，进而为印链积累沉淀大批用户。印链计划于 2018 年开 发图灵完备的虚拟机，以提供更高的灵活性，前提是印链有一定庞大的用户基数 之后，在这之前印链的目标和方向非常明确。
                    </p>
                    <p>
                        因为印链的共识无需节点之间频繁来回的通讯即可达成共识(下面有介绍)， 所以印链的性能是不受共识节点多少影响的，100 个节点和 1000 个节点的性能 几乎一样。故印链采用创新的浮动保证金机制来平衡共识节点的收益。
                    </p>
                    <p>
                        印链具有自己的系统代币INS，总量 1 亿。 ICO 分发:60%;
                    </p>
                    <p>
                        前期推广:5%;
                    </p>
                    <p>
                        社区基金:15%;
                    </p>
                    <p>
                        节点奖励:10%;
                    </p>
                    <p>
                        团队:10%。
                    </p>
                </div>
                <div className="coin-info-bgc-Image" style={{marginBottom: "50px"}}></div>
            </div>
        )
    }
}