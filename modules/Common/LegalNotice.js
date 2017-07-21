import React from 'react';
import '../../css/ourteam.css';
import TopTitle from './TopTitle'
import {Pagination} from 'antd';

export default class LegalNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }


    componentDidMount() {
        document.body.scrollTop = 0
    }


    onChange(page) {
        this.setState({
            page: page
        })
    }
    render() {
        return (
            <div>
                <div className="LegalNotice">
                    <div className="LegalNoticeMain">
                        <TopTitle title="法律声明与风险提示"/>
                        <div className={this.state.page === 1 ? "show" : "hide"}>
                            <span className="show">法律声明</span>
                            <p>
                                凡以任何方式登陆本网站或直接、间接使用本网站服务的用户，视为自愿接受本网站声明的约束，具体条款为：
                            </p>
                            <span className="show">第一条</span>
                            <p>
                                本网站的宗旨是在不违反中华人民共和国法律法规的前提下，尽可能地为广大数字货币爱好者及投资者提供专业的、国际化水准的交易平台和金融服务。禁止使用本网站从事洗钱、走私、商业贿赂等一切非法交易活动，若发现此类事件，本站将冻结账户，并立即报送公安及监管机关。
                            </p>
                            <span className="show">第二条</span>
                            <p>
                                当公安机关、检察院、法院等有权机关出示相应的调查文件要求本站配合对指定用户进行调查，或对用户账户采取查封、冻结或者划转措施时，本站将按照公安机关的要求协助提供相应的用户数据，或进行相应的操作。由此对用户造成的损失以及用户信息的泄露、账户不能操作等问题，本站将不承担任何责任。
                            </p>
                            <span className="show">第三条</span>
                            <p>
                                本网站使用者因为违反本声明的规定而触犯中华人民共和国法律的，本站作为服务的提供方，有义务对平台的规则及服务进行完善，
                                但本站并无触犯中华人民共和国法律的动机和事实，对使用者的行为不承担任何连带责任。
                            </p>
                            <span className="show">第四条</span>
                            <p>
                                本声明未涉及的问题参见中华人民共和国有关法律法规，当本声明与中华人民共和国法律法规冲突时，以中华人民共和国法律法规为准。本网站使用者因违反本声明的规定而触犯中华人民共和国法律的，一切后果均由本人自行承担，本网站不承担任何责任。
                            </p>
                            <span className="show">风险提示</span>
                            <p>
                                根椐央行等监管机构的相关规定通知，数字货币行业目前存在很多不确定性及不可控的风险因素，导致交易具有极高的风险。12链网站作为数字货币资产交易平台，对于交易资产的来源、价值的保值等因素，网站不承担任何审查、担保、赔偿的法律责任。 用户需注意以下事项：
                            </p>
                        </div>
                        <div className={this.state.page === 2 ? "show" : "hide"}>
                            <p>
                                1. 数字货币作为一种虚拟商品，具有极高的风险，用户需做到理性、谨慎投资，不轻信任何非官方渠道消息的宣传。
                            </p>
                            <p>
                                2. 根据《中华人民共和国反洗钱法》等有关法律规定，严格禁止利用平台进行洗钱、恐怖融资等违法犯罪活动。
                            </p>
                            <p>
                                3. 数字货币和数字积分等虚拟商品所对应的实物财产和持有者享有的权利存在因发行方等义务相关方破产，关闭或违法犯罪等其他经营风险导致无法兑现的风险。
                            </p>
                            <p>
                                4. 注册用户应保证注册身份信息的真实、准确，保证待交易的数字资产来源合法。因信息不真实造成的任何问题，12链网站不承担任何责任。
                            </p>
                            <p>
                                5. 若因国家法律、法规及政策性文件的制定和修改，导致数字货币等虚拟资产的交易被暂停或禁止，由此导致的用户经济损失及产生的一切后果，12链网站不承担相关责任。
                            </p>
                            <p>
                                6. 用户应结合自身风险偏好与经济承受能力进行理性投资，以免发生超出本人预期的损失。
                            </p>
                        </div>
                        <div className="text-center agreement-page">
                            <Pagination defaultCurrent={1} onChange={this.onChange.bind(this)}
                                        total={20}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}