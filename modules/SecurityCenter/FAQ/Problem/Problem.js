import React from 'react';
import {Pagination} from 'antd';
//常见问题
const dataList = [{
    id: 1,
    cont: '如何注册账号？',
    text: "登录首页，点击“注册”跳转至注册页面。使用手机号进行注册，按提示填写好所需信息，即可完成注册。"
}, {
    id: 2,
    cont: '如何找回密码？',
    text: "第一步： 验证身份。在登录页点击“找回密码”填写账户信息，之后进入“身份验证”页面，选择验证类型，完成手机或邮箱验证。",
    text1: "第二步：重置密码。设置新密码，设置完毕后即可重新登录。"
}, {
    id: 4,
    cont: '如何进行安全设置？',
    text: "在首页点击 “个人中心”—“安全设置”，进入设置页面。根据安全设置提示绑定账号（包括邮箱绑定和手机号绑定），提高账号的安全等级。"
},{
    id: 5,
    cont: '如何反馈意见？',
    text: "在首页点击“个人中心”—“问题反馈”—“提问”，将您在充值、交易、提现等平台操作过程中遇到的问题和意见提交至表格中，之后可在“查看问题”页面查看回复。"
},  {
    id: 6,
    cont: '12链网提供哪些服务？',
    text: "网站1.0版本只提供注册与抽奖活动，2.0版本将提供安全优质的数字货币交易服务。"
}, {
    id: 7,
    cont: '12链网通过哪些方式为用户提供服务？',
    // text: "12链网目前的服务方式有：QQ客服（4001009190）、400电话（400-100-9190）和微信公众号（12链网），未来，我们将建立更多方式为客户提供服务。"
    text: "12链网目前的服务方式有：QQ客服（4001009190）和微信公众号（12链网），未来，我们将建立更多方式为客户提供服务。"
}, {
    id: 8,
    cont: '如何获得币种基本知识？',
    text: "在首页点击“交易中心”进入交易页，即可在“预热小课堂”中获得各种币种信息。"
},{
    id:9,
    cont:'如何修改个人信息？',
    text:'请将您的原手机号/姓名/身份证号，身份证正、反面照片，本人手持身份证照片，及修改后的手机号/姓名/身份证号发送邮件至kefu@12lian.com，客服人员将尽快处理并回复。'
}]


export default class Problem extends React.Component {
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