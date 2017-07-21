import React from 'react';
import {Pagination} from 'antd';
//常见问题
//
const dataList = [{
    id: 1,
    cont: '名词解释',
    text: "(1) 对冲",
    text1:"对冲指特意减低另一项投资的风险的投资。它是一种在减低商业风险的同时仍然能在投资中获利的手法。一般对冲是同时进行两笔行情相关、方向相反、数量相当、盈亏相抵的交易。在虚拟合约市场，买入相同数量方向不同的头寸，当方向确定后，平仓掉反方向头寸，保留正方向获取盈利。",
    text2:"(2) 利好",
    text3:"指数字货币获得主流媒体关注，或者某项技术应用有突破性进展，刺激价格上涨的消息，都称为利好。",
    text4: "(3) 利空",
    text5:"促使币价下跌的消息，数字货币技术问题，央行打压等。",
    text6:"(4) 牛市",
    text7:"牛市也叫多头市场，是指币价的基本趋势持续上升时形成的投机者不断买进，需求大于供给的市场现象。",
    text8:"(5) 熊市",
    text9:"空头市场（Bear Market）亦称熊市，价格走低的市场。当部分投资人开始恐慌，纷纷卖出手中数字货币，保持空仓观望。此时，空方在市场中是占主导地位的，做多(看好后市)氛围严重不足，一般就称为空头市场。",
    text10:"(6) 成交量",
    text11:"反映成交的数量多少和买卖的人的多少。一般可用成交币数和成交金额来衡量。",
    text12:"(7) 放量",
    text13:"即成交量比前一段时间明显成交放大。",
    text14:"(8) 反弹",
    text15:"数字货币价格在下跌趋势中因下跌过快而回升的价格调整现象。回升幅度一般小于下跌幅度。",
    text16: "(9) 盘整",
    text17:"通常指价格变动幅度较小，比较稳定，最高价与最低价相差不大的行情。",
    text18: "(10) 洗盘",
    text19:"是主力操纵币市，故意压低币价的一种手段，具体做法是,为了拉高币价获利出货，先有意制造卖压，迫使低价买进者卖出币，以减轻拉升压力，通过这种方法可以使币价容易拉高。",
    text20: "(11) 建仓",
    text21:"建仓也叫开仓，投资者买入币和做空币的行为。"
}]
const dataList2 = [{
    id: 1,
    cont: '名词解释',
    text: "(12) 平仓",
    text1:"做多的投资者在市场上卖出币的行为，或者做空的投资者在市场买入币的行为。",
    text2:"(13) 回调",
    text3:"在多头市场上，币价涨势强劲，但因过快而出现回跌，称回调。",
    text4:"(14) 护盘",
    text5:"护盘是对盘口的保护，护盘行为一般是主力和矿工的作为，由于主力的筹码较多，当行情低落时，大量购买比特币，防止币价持续下挫。",
    text6:"(15) 散户",
    text7:"投资额度较小的数字货币玩家。",
    text8:"(16) 踏空",
    text9:"投资者因看淡后市，卖出币后，该币价却一路上扬，或未能及时买入，因而未能赚得利润。",
    text10:"(17) 跳水",
    text11:"币价快速下挫，幅度很大的下跌",
    text12:"(18) 诱多",
    text13:"币价盘旋已久，下跌可能性渐大，'空头'大都已卖出币后，突然'空方'将币拉高，误使'多方'以为币价会向上突破，纷纷加码，结果'空头'由高价惯压而下，使'多头误入陷阱'而'套牢'，称为'诱多'。",
    text14:"(19) 诱空",
    text15:"即'主力多头'买进币后，再故意将币价做软，使'空头'误信币价将大跌，故纷纷抛出币错过获利机会，形成误入'多头'的陷，称为'诱空'。",
    text16:"(20) 死多",
    text17:"无论发生什么事情，坚信数字货币可以成功，长期持有数字货币的玩家。",
    text18:"(21) 死空",
    text19:"对数字货币没有信心，觉得数字货币会消失的玩家。",
    text20:"(22) 割肉",
    text21:"在买入数字货币后，币价下跌，投资者为避免损失扩大而低价(赔本)卖出币的行为。"
}]
const dataList3 = [{
    id: 1,
    cont: '名词解释',
    text: "(23) 套牢",
    text1:"套牢是指预期币价上涨，不料买入后币价下跌或者预期币价下跌，卖出币后币价一路上涨，前者是多头套牢，后者是空头套牢。",
    text2:"(24) 搬砖",
    text3:"把现金充值到A平台，然后买入币；然后从A平台上提现到B平台；充值的币到B平台后，马上卖掉，收到的现金马上提现，然后重复步骤。",
    text4:"(25) 交割",
    text5:"虚拟合约交割是指虚拟合约到期时，交易双方通过该虚拟合约所载商品所有权的转移，了结到期末平仓合约的过程。",
    text6:"(26) 阻力位",
    text7:"阻力位又称压力位，是指对价格的上涨产生阻碍的位置，价格在此停止上涨甚至回落。",
    text8:"(27) 支撑位",
    text9:"和阻力位相反，对价格的下跌产生支撑的位置，价格在此停止下跌甚至回升。",
    text10:"(28) 止损",
    text11:"开立订单后，价格朝亏损的方向运行时，为了防止进一步亏损，平仓停止亏损的行为称为止损。",
    text12:"(29) 止盈",
    text13:"开立订单后，价格朝盈利的方向运行时，担心价格反转回吐利润而平仓了解的行为称为止盈。",
    text14:"(30) 仓位",
    text15:"指投资者的总持仓数额占本金的比例。",
    text16:"(31) 趋势",
    text17:"指价格运行的方向，持续性的上涨成为多头趋势，持续性的下称为空头趋势。",
    text18:"(32) 反弹",
    text19:"在空头趋势中，由于价格的下跌动力暂时消失，导致价格的短暂性的上涨称为反弹。",
    text20:"(33) 反转",
    text21:"价格在牛市或者熊市的末期，价格开始转向，打破原有的运行趋势称为反转。",
    text20:"(34) 超买",
    text21:"价格在连续的上涨后，买入力量减弱导致价格停止上涨的现象。",
    text20:"(35) 超卖",
    text21:"价格在连续的下跌后，卖出力量减弱导致的停止下跌的现象。"
}]
export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    //监听页数发生改变的时候显示当前对应的内容
    onChange(pageNumber) {
        if (pageNumber == 1) {
            this.setState({
                dataList: dataList
            })
        } else if (pageNumber == 2) {
            this.setState({
                dataList: dataList2
            })
        } else {
            this.setState({
                dataList: dataList3
            })
        }
        
    }

    componentDidMount() {
        this.setState({
            dataList: dataList
        })
        document.body.scrollTop = 0
    }

    render() {
        let list = this.state.dataList.map(list => {
                return <li key={list.id.toString()} className="TabsTabLi">
                <a href="javascript:;">{list.cont}</a>
                <p>{list.text}</p>
                <p>{list.text1}</p>
                <p>{list.text2}</p>
                <p>{list.text3}</p>
                <p>{list.text4}</p>
                <p>{list.text5}</p>
                <p>{list.text6}</p>
                <p>{list.text7}</p>
                <p>{list.text8}</p>
                <p>{list.text9}</p>
                <p>{list.text10}</p>
                <p>{list.text11}</p>
                <p>{list.text12}</p>
                <p>{list.text13}</p>
                <p>{list.text14}</p>
                <p>{list.text15}</p>
                <p>{list.text16}</p>
                <p>{list.text17}</p>
                <p>{list.text18}</p>
                <p>{list.text19}</p>
                <p>{list.text20}</p>
                <p>{list.text21}</p>
            </li>
        })
        return (
            <div className="Problem">
                <ul>
                    {list}
                </ul>
                <div className="MyIntegralPages"><Pagination defaultCurrent={1} total={30}
                                            onChange={this.onChange.bind(this)}/></div>
            </div>
        )
    }
}