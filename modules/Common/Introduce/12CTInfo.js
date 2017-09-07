import React from 'react';
import '../../../css/currencyintroduce.css'

export default class LskInfo extends React.Component {


    componentDidMount() {
        document.body.scrollTop = 0
    }

    render() {

        return (
            <div className="ct-info">
                <div className="text-center ct-info-title">
                    蝶链币/DLC
                </div>
                <div className="coin-info-bgc-Image" style={{marginTop: "40px"}}></div>
                <div className="ct-info-main">
                    <h5 style={{textIndent:"2em"}}>
                        关于DLC
                    </h5>
                    <p>
                        DLC是祥云汇聚网络科技（香港）有限公司公开发行的数字货币，所有权归祥云香港所有，发行总量最多为580万枚。
                    </p>
                    <h5 style={{textIndent:"2em"}}>
                        DLC代币的发行目的
                    </h5>
                    <p>
                        祥云汇聚（香港）区块链数字资产交易商团队是一支年轻而有活力的创新团队，在现有的资源下，不仅技术实力需要发展，资金上也同样需要一定补充。这部分资金主要用来防止在特殊情况下出现的不可控事件发生，例如网络安全隐患、特殊情况的资产赔付等，以作为应急措施中使用的准备金。
                    </p>
                    <h5>
                        风险提示：
                    </h5>
                    <p>
                        加密数字货币行业还处于发展初期，我们强烈建议您不要在不了解，以及不具备风险承受能力的情况下盲目参与投入。
                    </p>
                    <p>
                        加密数字货币的风险存在多样性，主要体现为市场价格剧烈波动、发行团队停服解散、技术漏洞项目破产等等。
                    </p>
                    <p>
                        我们恳请您在未详细阅读和了解本文的具体内容前，不要轻信他人的鼓动被动参与。一旦参与投入，我们将视为您自愿承担此ICO项目的发行风险，并不再退回。
                    </p>
                </div>
                <div className="coin-info-bgc-Image" style={{marginBottom: "50px"}}></div>
            </div>

        )
    }
}