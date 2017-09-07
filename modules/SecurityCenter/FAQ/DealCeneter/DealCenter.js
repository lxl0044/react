import React from 'react';
import {Pagination} from 'antd';
//常见问题
const dataList = [{
    id: 1,
    cont: '交易规则',
    text: "(1) k线",
    text1:"K线图的画法包含四个数据，即开盘价、最高价、最低价、收盘价，所有的k线都是围绕这四个数据展开，反映大势的状况和价格信息。假如当日或某一周期的收盘价较开盘价为高（即低开高收），我们便以绿色来表示。如果当日或某一周期的收盘价较开盘价为低（即高开低收），我们则以红色表示。",
    text2:"(2) 交易时间",
    text3:"7x24小时",
    text4:"(3) 如何进行委托挂单",
    text5:"买入：",
    text6:"在买入区域内输入价格、数量即可（金额在输入价格、数量后默认计算出来），或输入价格后拖动数量比例条进行数量输入。",
    text7:"价格、数量输入完毕后输入交易密码（交易密码可在个人中心-安全设置中关闭），点击买入按钮完成委托。",
    text8:"卖出：",
    text9:"在卖出区域内输入价格、数量即可（金额在输入价格、数量后默认计算出来），或输入价格后拖动数量比例条进行数量输入。",
    text10:"价格、数量输入完毕后输入交易密码（交易密码可在个人中心-安全设置中关闭），点击卖出按钮完成委托。",
    text11:"(4) 输入规则",
    text12:"价格上限：参考官方公告",
    text13:"价格下限：参考官方公告",
    text14:"数量上限：10万等值人民币",
    text15:"数量下限：10元等值人民币",
    text16: "(5) 如何查看委托单",
    text17:"可在买卖区域下方委托单列表中查看（委托单列表默认展示前30条委托单），或在买卖区域右侧个人委托列表中未成交委托或成交记录中查看。也可点击导航栏进入委托管理页面进行查看。",
    text18: "(6) 如何撮合",
    text19:"竞价原则：价格优先、时间优先。价格较高的买进委托优先于价格较低买进委托，价格较低卖出委托优先于较高的卖出委托；同价位委托，则按时间顺序优先",
}]
const dataList1 = [{
    id: 1,
    cont: '交易规则',
    text: "具体成交原则举例如下：盘口数据如下：",
    text1:"卖五:14.00 100",
    text2:"卖四:13.00 100",
    text3:"卖三:12.00 100",
    text4:"卖二:11.00 200",
    text5:"卖一:10.00 200",
    text6:"买一:9.00 300",
    text7:"买二:8.00 100",
    text8:"买三:7.00 200",
    text9:"买四:6.00 200",
    text10:"买五:5.00 200",
    text11:"如果这个时候有人打出15.00买入500手,不考虑其它因素,最后的成交价是多少呢？成交原则：",
    text12:"1、如果以大于等于卖一的价格挂可全部成交的买一单，则买一吃掉卖一，结算按照卖一价格结算，最新价格展示按照卖一价格展示",
    text13:"2、如果以小于等于买一的价格挂可全部成交的卖一单，则卖一吃掉买一，结算按着买一价格结算，最新价格展示按照买一价格展示",
    text14:"3、如果以高于卖五的价格挂买单，卖一数量不够，依次用卖二、卖三补……此时依次按卖一、卖二、卖三……价格结算，最新价格展示顺序为：卖一价格、卖二价格、卖三价格……",
    text15:"4、如果以低于买五的价格挂卖单，买一的数量不够，依次用买二、买三补……此时按买一、买二、买三……结算，最新价格展示顺序为：买一价格、买二价格、买三价格……",
    text16:"所以，该用户以高于卖五的价格挂单要买，则以10元成交200手、以11元成交200手、以12元成交100手。",
    text17:"如果此时有人以8元卖出350手，那么如何成交呢？首先买一9元的300手会完全成交，其次买二以8元成交50手，谁先挂单谁先成交。",
    text18: "(7) 如何撤单",
    text19:"可在买卖区域右侧个人委托列表中未成交委托中进行撤单操作。也可点击导航栏中进入委托管理页面撤单。",
}]


export default class Deposit extends React.Component {
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
        } else{
            this.setState({
                dataList: dataList1
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
                <div className="MyIntegralPages"><Pagination defaultCurrent={1} total={20}
                                                             onChange={this.onChange.bind(this)}/></div>
            </div>
        )
    }
}