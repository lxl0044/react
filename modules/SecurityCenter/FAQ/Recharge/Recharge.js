import React from 'react';
import {Pagination} from 'antd';
//常见问题
const dataList = [{
    id: 1,
    cont: '提现',
    text: "进入“个人中心”的 “资产管理”进行提现，请选择您所需要的提现方式后进行提现操作。"
}, {
    id: 2,
    cont: '人民币提现',
    text: "进入“人民币提现”页面，填写您的银行卡号、充值金额、交易密码及验证码信息，提交提现订单。请注意：最低提现金额为100元，当前每日最高金额为1,000,000元。提现手续费为0.2%。"
}, {
    id: 3,
    cont: '提取数字货币',
    text: '在“提现”中选择所要提取的币种，提交提现地址、提现数量（最少数量为1个）、交易密码、提现手续费等信息。提交申请后30分钟内审核通过，待网络确认后即可到账。'
}, {
    id: 4,
    cont: '人民币提现未到账怎么办？',
    text: "请将您的注册邮箱或手机号、UID及提现截图发送邮件至kefu@12lian.com，客服人员将尽快处理并回复。"
}, {
    id: 5,
    cont: '虚拟货币提现未到账怎么办？',
    text: '请将注册邮箱或UID、交易流水号、提币截图发送邮件至kefu@12lian.com，客服人员将尽快处理并回复。'
}]


export default class Recharge extends React.Component {
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