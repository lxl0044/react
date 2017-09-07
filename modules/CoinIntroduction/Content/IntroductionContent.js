import React from 'react'


export default class IntroductionContent extends React.Component {
    componentDidUpdate () {
        let content = this.refs.content
        const { persentationContent } = this.props
        content.innerHTML = persentationContent
    }

    render () {
        const props = this.props

        return (
            <div className="introduce-coins-content">
                <div className="introduce-coin-msg clearfix">
                    <ul>
                        <li>中文名：{ props.currencyNameCh }</li>
                        <li>英文名：{ props.currencyNameEn }</li>
                        <li>英文简称：{ props.currencyNameEnShort }</li>
                        <li>国家：{ props.persentationReserved }</li>
                    </ul>
                    <ul>
                        <li>核心算法：{ props.coreArithmetic }</li>
                        <li>区块时间：{ props.blockTime }</li>
                        <li>开发者：{ props.developer }</li>
                    </ul>
                    <ul>
                        <li>货币总量：{ props.currencyTotal }</li>
                        <li>官方地址：{ props.officalLink }</li>
                        <li>区块链浏览器：{ props.blockLink }</li>
                        <li>白皮书下载链接：{ props.whitePaperDownloadLink }</li>
                    </ul>
                </div>
                <div className="introduce-coin-introduction">
                    <h3>简介：</h3>
                    <div className="coin-introduction" ref="content">

                    </div>
                </div>
            </div>
        )
    }
}


