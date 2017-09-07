import React from 'react';
import {Icon} from 'antd';
import '../../../css/certficationaideo'
import androidCode from '../../../images/androidCode.png'
import firefox from '../../../images/firefox.png'
import help from '../../../images/help.png'
import axios from 'axios';
const base = 'data:image/png;base64,'
export default class CertficationAideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgShow1: true,
            imgShow2: true,
            text: 2,
            base64AndroidUrl:'',
            base64IosUrl:'',
            androidUrl:''
        }
    }


    // 点击ios下载
    iosFunc() {
        this.setState({
            imgShow1: false
        })
        document.body.style.overflow = 'hidden'
    }

    // 点击安卓下载
    androidFunc() {
        this.setState({
            imgShow2: false
        })
        document.body.style.overflow = 'hidden'
    }

    // 点击让二维码消失
    hideBox1() {
        this.setState({
            imgShow1: true
        })
        document.body.style.overflow = 'auto'
    }

    //点击图片和容器不消失
    hide(e) {
        e.stopPropagation()
        this.setState({
            imgShow2: false
        })
    }

    // 点击让二维码消失
    hideBox2() {
        this.setState({
            imgShow2: true
        })
        document.body.style.overflow = 'auto'
    }
    componentDidMount() {
        axios.post('/downloadapp/updateLocation')
            .then(function (res) {
                this.setState({
                    base64AndroidUrl:res.data.attachment.base64AndroidUrl,
                    base64IosUrl:res.data.attachment.base64IosUrl,
                    androidUrl:res.data.attachment.androidUrl
                })
            }.bind(this))
    }

    //每次输入的金额改变的时候，计算总数
    numFunc (e) {
        let poundage = this.refs.poundage.innerHTML,
            money = e.target.value

        let sum = money - (poundage * money * 0.01)
        this.setState({
            sum:sum.toFixed(2)
        })

    }
    render() {
        return (
            <div className="CertficationAideo">
                <div className="CertficationAideoHint">
                    <p>根据央行反洗钱法律规定，我们会对用户身份进行合法性审查，为保证您的账户安全和拥有优质交易体验，我们会要求</p>
                    <p>您进行“视频认证”以获得更高的安全保障。</p>
                </div>
                <div className="AideoStatus">
                    <span>认证状态：</span>{this.props.isAuthVideo == 0 ?
                    <button>未认证</button> : this.props.isAuthVideo == 1 ? <button className="warn">认证中...</button> :
                        this.props.isAuthVideo == 2 ?
                            <button className="green">已认证</button> : this.props.isAuthVideo == -1 ?
                            <button className="warn">认证失败</button> : ""}
                </div>
                <div className={this.state.text == 1 ? "show AideoStatusRefuse" : "hide AideoStatusRefuse"}>
                    <p>根据央行反洗钱法律规定，我们会对用户身份进行合法性审查，为保证您的账户安全和拥有优质交易体验，我们会要求</p>
                </div>
                <div className={this.props.isAuthVideo == -1 ? "show aideo-fail" : "hide aideo-fail"}>
                    <p className="warn"><span>认证失败提示：</span><span>{this.props.auth_fail_reason}</span></p>
                </div>
                <div className="AideoDownLoad">
                    <span>认证工具下载</span>
                </div>
                <div className="AideoIconDownLoad clearfix">
                    <div className="fl text-center" onClick={this.iosFunc.bind(this)}>
                        <Icon type="apple" style={{color:"#2ec4f7"}}/><span> IOS</span>
                    </div>
                    <div className="fr text-center" onClick={this.androidFunc.bind(this)}>
                        <Icon type="android" style={{color:"#7cba59"}}/><span> Android</span>
                    </div>
                </div>
                <div className="clearfix AideoAlertBox-warp">
                    <div className="AideoAlertBox fl" onClick={this.hideBox1.bind(this)}>
                        <div className="AideoAlertBoxCenterIos">
                            <img className="show" src={base + this.state.base64IosUrl}/>
                        </div>
                    </div>
                    <div className="AideoAlertBox fl" onClick={this.hideBox2.bind(this)}>
                        <div className="AideoAlertBoxCenter" onClick={this.hide.bind(this)}>
                            <img className="show" src={base + this.state.base64AndroidUrl} onClick={this.hide.bind(this)}/>
                            <div className="download-place">
                                <a className="text-center warn show"
                                   href={this.state.androidUrl}>下载到本地</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Aideo-help">
                    <span>Android扫描教程</span>
                </div>
                <div className="Aideo-help-img">
                    <ul className="clearfix">
                        <li className="fl">
                            <p className="text-center warn">
                                第一步
                            </p>
                            <p className="text-center">
                                打开手机浏览器，点击搜索处扫一扫
                            </p>
                        </li>
                        <li className="fl">
                            <p className="text-center warn">
                                第二步
                            </p>
                            <p className="text-center">
                                扫描二维码
                            </p>
                        </li>
                        <li className="fl">
                            <p className="text-center warn">
                                第三步
                            </p>
                            <p className="text-center">
                                点击安全下载后安装
                            </p>
                        </li>
                    </ul>
                    <div>
                        <img src={help}/>
                    </div>
                </div>
                <div className="AideoFlow">
                    <span>认证流程</span>
                </div>
                <div className="AideoStep">
                    <p>一、下载安装12链官方视频认证工具12链APP</p>
                    <p>二、按步骤进行认证</p>
                    <p>
                        <span className="show">三、认证须知：</span>
                    </p>
                </div>
                <div className="AideoAttention">
                    <p>*特别注意:如果您拍摄的照片属于以下情况,我们将拒绝您的认证申请</p>
                </div>
                <div className="AideoRefuse">
                    <p>1.非本人</p>
                    <p>2.性别错误</p>
                    <p>3.戴帽子</p>
                    <p>4.戴墨镜</p>
                    <p>5.抽烟</p>
                    <p>6.赤裸上身</p>
                    <p>7.照片过亮,过暗或模糊不清,辨别不清</p>
                    <p>8.非正面照</p>
                    <p>9.表情过分夸张</p>
                    <p>10.有任何物件遮挡住五官</p>
                    <p>11.照片里面不止一个人</p>
                </div>
                {/*<div className={this.state.imgShow1 ? "hide AideoAlert" : "show AideoAlert"}>*/}
                    {/*<div className="AideoAlertBox" onClick={this.hideBox1.bind(this)}>*/}
                        {/*<div className="AideoAlertBoxCenterIos">*/}
                            {/*<img src={base + this.state.base64IosUrl}/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<div*/}
                    {/*className={this.state.imgShow2 ? "hide AideoAlert AideoAlert-box" : "show AideoAlert AideoAlert-box"}>*/}
                    {/*<div className="AideoAlertBox" onClick={this.hideBox2.bind(this)}>*/}
                        {/*<div className="AideoAlertBoxCenter" onClick={this.hide.bind(this)}>*/}
                            {/*<img src={base + this.state.base64AndroidUrl} onClick={this.hide.bind(this)}/>*/}
                            {/*<div className="download-place">*/}
                                {/*<a className="text-center warn show"*/}
                                   {/*href={this.state.androidUrl}>下载到本地</a>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        )
    }
}