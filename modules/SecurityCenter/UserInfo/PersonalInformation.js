import React from 'react';
import {connect} from 'react-redux'
import {userInfoInSecurityCenter, resetUname} from '../../Redux/Action/SecurityCenterAction'
import TopTitle from '../../Common/TopTitle';
import {Icon, message, Popover} from 'antd';
import {Link} from 'react-router'
import PersonalInformationPageInfo from './PersonalInformationPageInfo'
import axios from 'axios'
import qs from 'qs'
const text = <span>认证等级</span>;
const content = (
    <div>
        <p>KYC0：注册未实名用户，仅限浏览</p>
        <p>KYC1：实名初级认证，初级充提额度单笔1万</p>
        <p>KYC2：实名高级认证，高级充提额度单笔20万</p>
        <p>KYC3：视频认证用户，顶级充提额度单笔200万</p>
    </div>
)
const content1 = (
    <div>
        <p>邮箱绑定</p>
    </div>
)
const content2 = (
    <div>
        <p>实名认证</p>
    </div>
)
const content3 = (
    <div>
        <p>手机号绑定</p>
    </div>
)
const content4 = (
    <div>
        <p>视频认证</p>
    </div>
)
const content5 = (
    <div>
        <p>安全设置</p>
    </div>
)
class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allMoney: '',
            time: '',
            host: ''
        }
    }
    //改变修改名字的时候input框出现
    changeFunc() {
        const {dispatch,uname} = this.props
        //该变的时候把以前的名字带过来
        let name = this.refs.uname
        name.value = uname
        dispatch({type: 'START_RESET_UNAME'})
    }
    //当我点击修改名字的对勾的时候
    changeFunc1() {
        let uname = this.refs.uname.value.trim()
        let reg = /[.~!@#$%\\^\\+\\*&\\\\\\/\\?\\|:\\.{}()\';="]|^\d+$/g
        // 判断用户名
        if (reg.test(uname)) return message.error("昵称为2~30位汉字、数字和字母的组合")
        if (uname.length < 2) return message.error("昵称为2~30位汉字、数字和字母的组合")
        const {dispatch} = this.props
        dispatch(resetUname(dispatch, uname))
    }
    //当我点击重新命名的时候，如果我不想改了，就点击叉号返回
    changeFunc2() {
        const {dispatch} = this.props
        dispatch({type: 'CLOSE_RESET_UNAME'})
    }
    //点击红利钱包的时候
    clickFunc() {
        message.error("本功能暂未开放")
    }
    //点击视频下载的时候
    onDownLoad() {
        sessionStorage.setItem("downLoad", "2")
    }
    //渲染数据
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(userInfoInSecurityCenter())
        //资产详细
        axios.post('/coin/customerCoinAccount')
            .then(function (res) {
                this.setState({
                    data: res.data.attachment.coinList,
                    allMoney: res.data.attachment.allMoney
                })
            }.bind(this))
        // 登录历史
        axios.post('/user/myLogins', qs.stringify({
            type: 2,
            start: 0,
            size: 10
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    this.setState({
                        time: res.data.attachment[0].time,
                        host: res.data.attachment[0].host
                    })
                }
            }.bind(this))
    }
    render() {
        const {time, host} = this.state
        const {uname, isAuth, email, phone, isValidatePass, isValidateEmail, score, change} = this.props
        let item = this.state.data.map((cur, index) => {
            return <div className="CenterList2MainBox clearfix" key={index.toString()}>
                <span className="fl text-center">{cur.currencyName}</span>
                <span className="fl text-center">{cur.amount}</span>
                <span className="fl text-center">{cur.freezeAmount}</span>
                <span className="fl text-center">{cur.cashAmount}</span>
            </div>
        })
        return (
            <div className="PersonalInformation fr clearfix">
                <div className="PersonalInformationInfo fl">
                    <div className="PersonalInformationInfo-warp">
                        <TopTitle title="个人信息"/>
                        <div className="InformationInfoMain clearfix">
                            <div className="InformationInfoList1 fl">
                                <h2 className={change ? 'show' : 'hide'}>{uname}</h2>
                                <input ref="uname" autofocus type="text" id="name" maxLength="30"
                                       className={change ? 'hide' : 'show inlineBlock'}/>
                                {change ?
                                    <Icon type="edit" onClick={this.changeFunc.bind(this)}/> :
                                    <span><Icon type="check" onClick={this.changeFunc1.bind(this)}/>
                                    <Icon type="close" onClick={this.changeFunc2.bind(this)}/></span>
                                }
                                <p>认证等级 ：<span
                                    className="warn">{isAuth == 0 ? "C0" : isAuth == 1 ? "C1" : isAuth == 2 ? "C2" : isAuth == 3 ? "C3" : ""}</span>
                                    <Popover placement="rightTop" title={text} content={content} trigger="hover">
                                        <Icon type="question-circle-o"/>
                                    </Popover>
                                </p>
                                <p>最近登录时间：<span>{time}</span></p>
                                <p>IP <span>{host}</span></p>
                            </div>
                            <div className="InformationInfoList2 fl">
                                <ul className="fr">
                                    <li className="InfoList2-first">电子邮箱：{!email ? "未设置" : email}</li>
                                    <li>手机号码：{!phone ? "未设置" : phone}</li>
                                    <li>交易密码：{isValidatePass == 1 ? <span className="blue">已设置</span> :
                                    <span>未设置</span>}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="InformationInfoIcon clearfix">
                            <div className="fl">
                                <Popover placement="bottom" content={content1} trigger="hover">
                                    <Icon className={isValidateEmail == 1 ? "warn" : " "} type="mail"/>
                                </Popover>
                                <Popover placement="bottom" content={content2} trigger="hover">
                                    <Icon className={isAuth > 0 ? "warn" : " "} type="solution"/>
                                </Popover>
                                <Popover placement="bottom" content={content3} trigger="hover">
                                    <Icon className="warn" type="mobile"/>
                                </Popover>
                                <Popover placement="bottom" content={content4} trigger="hover">
                                    <Icon className={isAuth == 3 ? "warn" : " "} type="video-camera"/>
                                </Popover>
                                <Popover placement="bottom" content={content5} trigger="hover">
                                    <Link to="/personal/settings"><Icon type="setting"/></Link>
                                </Popover>
                            </div>
                            <div className="fr">
                                <Link to="/personal/certification"
                                      onClick={this.onDownLoad.bind(this)}><span>12链视频认证工具下载</span></Link>
                            </div>
                        </div>
                    </div>
                    {/*<div className="InformationInfoBox clearfix">*/}
                        {/*<div className="InformationInfoCenter clearfix">*/}
                            {/*<div className="InfoCenterList1 fl clearfix">*/}
                                {/*<p className="fl">*/}
                                    {/*<span className="show">CNY余额：</span>*/}
                                    {/*<span className="show">￥{this.state.allMoney}</span>*/}
                                {/*</p>*/}
                                {/*<p className="fl">*/}
                                    {/*<span className="show">总积分：</span>*/}
                                    {/*<span className="show">{score}</span>*/}
                                {/*</p>*/}
                                {/*<button onClick={this.clickFunc.bind(this)}>红利钱包</button>*/}
                                {/*<div className="CenterList1Button clearfix">*/}
                                    {/*<Link to="/personal/securitycenterpay">*/}
                                        {/*<button className="fl">充值</button>*/}
                                    {/*</Link>*/}
                                    {/*<Link to="/personal/securitycenterwithdraw">*/}
                                        {/*<button className="fr">提现</button>*/}
                                    {/*</Link>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="InfoCenterList2 fr">*/}
                                {/*<p><Icon type="pie-chart"/><span>资产详情</span></p>*/}
                                {/*<div className="CenterList2Info clearfix">*/}
                                    {/*<span className="fl">币种</span>*/}
                                    {/*<span className="fl">总资产</span>*/}
                                    {/*<span className="fl">冻结资产</span>*/}
                                    {/*<span className="fl">可用资产</span>*/}
                                {/*</div>*/}
                                {/*<div className="CenterList2Main">*/}
                                    {/*{item}*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<PersonalInformationPageInfo/>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}
export default connect(state => {
    return {
        ...state.userInfoDetails,
        ...state.Operation
    }
})(PersonalInformation)