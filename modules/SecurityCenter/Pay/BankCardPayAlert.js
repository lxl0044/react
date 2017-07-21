import React from 'react';
import {Icon} from 'antd';
import phoneBank from '../../../images/phone-bank.png'
import Ebank from '../../../images/E-bank.png'
import {getBeforeDate} from '../../../tools/utils'
import {queryRechargeRecord} from '../../Redux/Action/PayAction'
// 保存当前时间
let beginTime = getBeforeDate(1),//保存开始时间
    createTimeEnd = getBeforeDate();//保存结束时间
let token = localStorage.getItem("token")
let uid = localStorage.getItem("uid")

export default class BankCardPayAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: phoneBank,
            imgShow: true
        }
    }

    //点击插号传给父级一个参数
    clickHandler = () => {
        const {dispatch} = this.props
        dispatch({type: 'CLOSE_TRANSFER_BOX'})
        //点击取消订单的时候重新调取列表
        let params = {
            status: 0,
            start: 1,
            size: 10,
            screateTimeBegin: beginTime,
            createTimeEnd: createTimeEnd,
            //修改这里是为了隐藏微信和支付宝支付，以后再改成1
            rechargeType: 3
        }
        dispatch(queryRechargeRecord(dispatch, params))
    }

    //当划入网银转账教学的时候
    onMouseOver1() {
        this.setState({
            img: Ebank,
            imgShow: false
        })
    }

    // 当划出网银转账教学的时候
    onMouseOut1() {
        this.setState({
            imgShow: true
        })
    }

    //当划入手机银行转账教学的时候
    onMouseOver2() {
        this.setState({
            img: phoneBank,
            imgShow: false
        })
    }

    //当划出手机银行转账教学的时候
    onMouseOut2() {
        this.setState({
            imgShow: true
        })
    }

    render() {
        const {show, companyName, companyBank, companyBankCardNo, companyNote, companyAmount, bankCenterName, companyBankUrl} = this.props.companyInfo

        return (
            <div className={show ? "hide bankCardPayAlert" : "show bankCardPayAlert"}>
                <div className="bankCardPayCenetr">
                    <div className="bankCardPayBox">
                        <div className="bankCardPayTop"></div>
                        <div className="bankCardPayTopTtile">
                            <div className="bankCardPayTopTtileIcon clearfix">
                                <span className="fl warn">银行转账充值</span><span className="fr warn"><Icon
                                type="close-circle-o" onClick={this.clickHandler}/></span>
                            </div>
                            <div
                                className={this.state.imgShow ? "bankCardPayInfoWarp show" : "bankCardPayInfoWarp hide"}>
                                <p>请将充值金额转账至以下账户</p>
                                <p><span>银行账户：</span><span className="font-weight">{companyBankCardNo}</span></p>
                                <p><span>开户行：</span><span className="font-weight">{companyBank}</span></p>
                                <p><span>户名：</span><span className="font-weight">{companyName}</span></p>
                            </div>
                            <div className={this.state.imgShow ? "bankCardPayInfoBag show" : "bankCardPayInfoBag hide"}>
                                <p className="font-weight">汇款信息</p>
                                <p><span>汇款金额：¥</span><span
                                    className="font-weight">{companyAmount}</span><span className="warn"> (*为快速到账，请按此处显示的金额转账)</span>
                                </p>
                                <p><span>备注附言：</span><span className="font-weight">{companyNote}</span><span
                                    className="font-weight"> (区分大小写)</span></p>
                                <p><span>注意：</span><span
                                    className="font-weight">为了快速准确到账，转账时请在附言中填写备注，请不要在填加备注以外的其他信息。</span></p>
                            </div>
                            {/*<div className={this.state.imgShow ? "bankCardPayBoxBtn show" : "bankCardPayBoxBtn hide"}>*/}
                                {/*<a href={companyBankUrl} target="_blank">*/}
                                    {/*<button className="warn">进入{bankCenterName}转账</button>*/}
                                {/*</a>*/}
                            {/*</div>*/}
                            {/*<div className={this.state.imgShow ? "hide internetBank" : "show internetBank"}>*/}
                                {/*<div>*/}
                                    {/*<img src={this.state.img}/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div>*/}

                            {/*</div>*/}
                            {/*<div className="bankCardPayFooter">*/}
                                {/*<div className="bankCardPayFooterBox clearfix">*/}
                                    {/*<p className="inlineBlock fl">*/}
                                        {/*<span>有疑问请</span>*/}
                                        {/*<a target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001009190&aty=1&a=1&curl=&ty=1">联系客服</a>*/}
                                    {/*</p>*/}
                                    {/*<p className="inlineBlock fr">*/}
                                        {/*<span>或查看</span>*/}
                                        {/*<span onMouseOver={this.onMouseOver1.bind(this)}*/}
                                              {/*onMouseOut={this.onMouseOut1.bind(this)}>网银转账教学</span>*/}
                                        {/*<span>／</span>*/}
                                        {/*<span onMouseOver={this.onMouseOver2.bind(this)}*/}
                                              {/*onMouseOut={this.onMouseOut2.bind(this)}>手机银行转账教学</span>*/}
                                    {/*</p>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}