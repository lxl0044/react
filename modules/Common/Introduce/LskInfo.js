import React from 'react';
import '../../../css/currencyintroduce.css'

export default class LskInfo extends React.Component {


    componentDidMount() {
        document.body.scrollTop = 0
    }

    render() {

        return (
            <div className="lsk-info">
                <div className="text-center lsk-info-title">
                    应用链/LSK
                </div>
                <div className="coin-info-bgc-Image" style={{marginTop:"40px"}}></div>
                <div className="lsk-info-main">
                    <p>
                        Lisk是一个基于Node.js与Javascript，建立于区块链技术之上的区块链应用平台，开发者可以通过官方提供的SDK，使用JavaScript语言在Lisk平台内开发自已的Blockchain
                        APP，我们认为，未来必定是中心化应用与去中心化应用共存的时代，Lisk提供这么一种简单，易行的方式，让开发者可以很快速的在区块链上建立自己的应用，相对于Dapp，Blockchain
                        APP对于去中心化的应用有一些不同的理解，Dapp是把程序和数据一起放在区块链内进行去中心化，而Blockchain
                        APP则是通过侧链的方式，为中心化的应用程序提供去中心化的区块数据，通过提供API接口的方式，方便所有程序使用，调用区块链的内容。
                    </p>
                    <p>
                        Lisk的区块链分成主链和侧链两部分，打个不恰当的比喻，就像一条蜈蚣，主链就是蜈蚣的主干，而侧链就是蜈蚣身上的那数量众多的足，侧链通过受托人节点接入主链的主干网络，由主链负责保障整体网络的安全性，也用于保障侧链网络的安全性，而由侧链来提供功能，其于此原理，主链保持了精简，高效，不受侧链影响，侧链用于提供功能，由主链保障安全性，侧链的任何问题都不会影响到主链。这样即保证了无限的功能扩展，也保证了网络的安全。
                    </p>
                    <p>
                        我们相信未来的世界必定是中心化与去中心化相共存的世界，并不是所有的东西都需要去中心化，对于用户感知来说，并没有所谓的去中心化与中心化的区别，基于此，我们的愿景是为中心化的应用程序提供去中心化的解决方案，通俗一点说，有可能的是，以后某款手机APP里面，可能有些内容是中心化的，比如APP里面存储的图片，或者是APP的程序代码，而另外的一些东西可能是去中心化的从区块链里面读取的，比如用户帐户信息。
                    </p>
                    <p>
                        Lisk的团队是由分别来自德国，英国，美国的经验丰富的专家组成，CEO是来自德国的Max
                        Kordek，来自亚琛工业大学，在区块链行业有多年的经验，对于区块链行业的发展有自已独特的见解，Max最终成功地为Lisk项目筹集了14000多个BTC。核心开发者是来自英国的Oliver
                        Beddows，具有15年的软件开发经验，另一位核心开发者François-Xavier Thoorens，以及其它还有多位开发者与多位在各自领域具备丰富经验的顾问团。
                    </p>
                </div>
                <div className="coin-info-bgc-Image" style={{marginBottom:"50px"}}></div>
            </div>

        )
    }
}