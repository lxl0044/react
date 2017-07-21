import React from 'react';
import {Pagination} from 'antd';
//常见问题
const dataList = [{
    id: 1,
    cont: '充值',
    text: "进入“个人中心”-“资产管理”进行充值，选择需要充值的币种。其中人民币充值可以通过微信、支付宝以及银行卡三种方式进行，请选择您所需要的充值方式。"
}, {
    id: 2,
    cont: '微信充值',
    text: "进入人民币充值下的“微信”充值页面，输入充值金额并完成充值订单，之后登录微信支付订单，完成充值。请注意：微信充值将于10分钟内到账，为保障资金安全，微信充值单笔最低充值金额为100元，最高为20,000元。"
}, {
    id: 3,
    cont: '支付宝充值',
    text: '进入人民币充值下的“支付宝”充值页面，输入充值金额并完成充值订单，之后登录支付宝支付订单，完成充值。请注意：支付宝充值将于10分钟内到账，为了您的财产安全，请使用本人支付宝账号充值。'
},{
    id: 4,
    cont: '银行转账充值',
    text: "进入人民币充值下的“银行转账充值”页面，输入充值金额与汇款人银行卡号提交汇款单，之后登陆网银支付订单，完成充值。请注意：由于银行的处理时间限制，银行转账的到账时间为40分钟，且夜间充值可能会延迟。农业银行和交通银行的充值将在第二天到账。"
}, {
    id: 5,
    cont: '12CT充值',
    text: "进入“12CT”充值页面，将您的 12CT转入到钱包地址中。"
},{
    id: 6,
    cont: '人民币充值未到账怎么办？',
    text: "请将您的12lian账号、手机号、汇款人姓名、汇款时间、金额，以及汇款成功截图（包括短信通知和汇款明细，支付宝充值应提供支付宝账号）发送邮件至kefu@12lian.com，客服人员将尽快处理并回复。"
},{
    id: 7,
    cont: '数字货币充值未到账怎么办？',
    text: "请将注册邮箱或UID、交易流水号、充币截图发送邮件至kefu@12lian.com，客服人员将尽快处理并回复。"
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