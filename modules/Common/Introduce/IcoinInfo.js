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
                    iCoin/iCoin
                </div>
                <div className="coin-info-bgc-Image" style={{marginTop: "40px"}}></div>
                <div className="rts-info-main">
                    <p>
                        ICO SMART智能合约系统发行的系统代币为iCoin，ICO SMART合约系统将接入众多合作方。其中核心设计是为项目方提供智能合约功能。第一个功能为“权益燃烧兑换合约”。
                    </p>
                    <p>
                        每个持有iCoin的人都享有用手中iCoin兑换ICO SMART加密货币池里加密货币的权益，请注意，这是一个自愿的币币兑换过程，持有iCoin本身不具有任何分红权益。当选择兑换数字货币池里对应比例的数字货币后，用户手中的iCoin将被销毁，并从1.5亿代币总量中扣除，因此是否兑换取决于个人判断或喜好。此加密货币池的兑换功能将在代币发行后持续开放3年，3年后将关闭；同时只有已发行并流通的iCoin可以参与兑换，未发行或者冻结的不参与计算，用户销毁所持有iCoin兑换池中加密货币时，兑换多少取决于持有的iCoin占当前流通总量的比例以及池中加密货币的总量。第一个接入该“权益燃烧兑换合约”的项目为ICO.COM，ICO.COM将通过捐赠加密货币池来支持ICO SMART社区，从而深度参与ICO SMART系统生态。随着越来越多的项目方加入ICO SMART系统的“权益燃烧兑换合约”，加密货币池里的兑换权益将不断提高，整个生态系统和支持者手中的iCoin代币的价值也将不断提高。
                    </p>
                </div>
                <div className="coin-info-bgc-Image" style={{marginBottom: "50px"}}></div>
            </div>
        )
    }
}