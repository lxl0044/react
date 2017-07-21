import React from 'react';
import {Pagination} from 'antd';
//常见问题
const dataList = [{
    id: 1,
    cont: '非加密货币和加密货币的区别',
    text: "非加密货币是由公司或者私人自我发行的，可无限发行，不需要通过计算机的显卡CPU运算程序解答方程式获得",
    text1:"知名的非加密货币如百度公司的百度币、腾讯公司的Q币，Q点、盛大公司的点券，新浪推出的微币（用于微游戏、新浪读书等），因为其依据市场需求可无限发行，所以其不具备收藏以及升值的价值。",
    text2:"加密货币是依据全世界的计算机运算一组方程式开源代码，通过计算机的显卡、CPU大量的运算处理产生，并使用密码学的设计来确保货币流通各个环节安全性。基于密码学的设计可以使加密货币只能被真实的拥有者转移或支付。",
    text3:"加密货币与其他非加密虚拟货币数量不同。加密货币总数量有限，具有极强的数量稀缺性。因为这一组方程式开源代码总量是有限的，如果想获得，就必须通过计算机显卡CPU的运算才可以获得。而非加密货币可以无限量发行，因而不具有增值属性。"
}, {
    id: 2,
    cont: '加密货币的价值',
    text: "正因为加密货币总量有限，具有稀缺性，所以开采的越多，币升值的越高，就好像地球上埋在地里的黄金，数量有限，永不贬值。我们计算机运算方程式代码的这一个运算过程就好比在金矿挖矿，所以才形象的比喻成挖矿。",
}, {
    id: 3,
    cont: '加密货币是什么？',
    text: "通过挖矿开采出来后，加密货币是一串代码，跟人民币左下角的那一串序列号一样，谁拥有这一串序列号，谁就拥有这一加密货币的使用权。"
},{
    id: 4,
    cont: '加密货币的优点',
    text: "相比于纸币，省去纸币本身印刷、数据审核、防伪、押运流通、保险库保管等等各方面的成本。",
    text1: "完全去中心化，没有发行机构，不可能操纵发行数量。外部任何相关行业和机构无权利，也无法关闭它，加密货币价格可能有所波动。拥有加密货币的人，以及用加密货币来交易流通的人，永不会消失，因为它也是具有价值的信用货币。",
    text2: "无国界。跨境，跨国汇款，会经过层层外汇管制机构，而且交易记录会被多方记录在案。但如果用加密货币交易，直接输入账户地址，点一下鼠标，等待网络确认交易后，大量资金就过去了。不经过任何管控机构，也不会留下任何跨境交易记录，方便快捷，纸币无与伦比。",
    text3: "任何商店使用加密货币交易，可省去税收以及资金监管大量手续费的成本。全球流通非常方便，是全球老百姓、商户都非常受欢迎的货币交易模式。",
    text4: "加密数字货币完全可以抵御通货膨胀的压力，让老百姓的财富保值，并且增值。因为发行数量恒定，物以稀为贵且不受央行管控。"
}]


export default class Basis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    //监听页数发生改变的时候显示当前对应的内容
    onChange(pageNumber) {
        this.setState({
            dataList: dataList
        })
    }

    componentDidMount() {
        this.setState({
            dataList: dataList
        })
        document.body.scrollTop = 0
    }

    render() {
        let list = this.state.dataList.map(list => {
            if (list.text1) {
                return <li key={list.id.toString()} className="TabsTabLi">
                <a href="javascript:;">{list.cont}</a>
                <p>{list.text}</p>
                <p>{list.text1}</p>
                <p>{list.text2}</p>
                <p>{list.text3}</p>
                <p>{list.text4}</p>
            </li>
            } else {
                return <li key={list.id.toString()} className="TabsTabLi">
                <a href="javascript:;">{list.cont}</a>
                <p>{list.text}</p>
            </li>
            } 
            
        })
        return (
            <div className="Problem">
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}