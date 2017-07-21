import React from 'react';
import {Pagination} from 'antd';
//常见问题
const dataList = [{
    id: 1,
    cont: '12链提供什么服务',
    text: "12链是安全、稳定、可信的数字货币交易平台,我们采用ssl、冷存储、gslb、分布式服务器等先进技术，确保交易的安全、快捷、稳定。"
}, {
    id: 2,
    cont: '12链如何确保交易安全、快捷、稳定',
    text: "12链参考了银行的安全技术设计，采用了很多先进的计算机技术，比如ssl加密传输、数字货币离线存储、广域网负载均衡、分布式服务器集群、短信认证等等。"
}, {
    id: 3,
    cont: '12链交易时间',
    text: "12链平台提供7x24小时交易服务，遇到节假日，我们也会安排人员值班，保证网站可以交易，充值，提现。"
},{
    id: 4,
    cont: '登录密码是什么？忘记密码怎么办？',
    text: "登录密码是您登录12链平台的重要信息，是保障您在12链财产安全的重要凭证，请不要泄露给任何人，不要设置的过于简单，不要设置和其它平台一样的登录密码。如果您忘记登录密码：1.绑定手机号、邮箱的用户，点击登录界面的“忘记密码”通过手机号、邮箱找回。2.如果由于其它原因造成你不能通过以上方式找回登录密码，请联系客服帮你解决。",
},{
    id: 5,
    cont: '交易密码是什么？忘记密码怎么办？',
    text: "交易密码是您在12链平台进行交易时需输入的密码，是确认交易操作是您本人操作的唯一验证方法。新注册的用户请到“个人中心-安全设置”里，交易密码处，设置交易密码。如果您忘记交易密码了，首先登录你的账户，在安全设置里，交易密码处，点击“忘记交易密码”可以修改交易密码。如果由于其它原因造成你不能通过以上方式找回登录密码，请联系12链客服。"
}, {
    id: 6,
    cont: '如何进行人民币充值？人民币充值多久到账？手续费是多少？',
    text: "目前人民币充值需要用户给我们汇款，经过确认后，充值到账。在账户里选择“人民币充值”，根据网站的提示一步步的操作，在我们收到汇款后，会和用户提交的汇款信息匹配，信息没有问题，十五分钟内充值到账。如果信息有问题，我们会尽快和用户取得联系，核对好并充值到账。人民币充值是不收取手续费的。部分银行转账汇款会收取手续费，这个是银行收取的转账服务费，由于每家收费标准不一样，具体请咨询你的汇出银行，如有疑问，请查看充值教程。12链目前仅支持提现到银行的储蓄卡，而且是用户实名认证的姓名开户的银行卡。人民币提现一般是24小时处理好，什么时候到账，每家银行处理汇款的速度不一样，所以不能保证到账时间。人民币最低提现是100元，手续费是提现金额的0.2%-0.5%，最少收取1元。"
}]

export default class Basis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            pageNumber:1
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
            </li>
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