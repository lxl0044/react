import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getTotalUser} from '../Redux/Action/CommonAction'
import {changeCoinInfoIntroduce} from '../Redux/Action/CurrencyIntroduceAction'
import {img} from '../host'
import '../../css/footer';
import {Icon} from 'antd'
import weChatCode from '../../images/weChatCode.png'
import chrome from '../../images/chrome.png'
import firefox from '../../images/firefox.png'
import safety from '../../images/360.png'
import reference from '../../images/reference.png'
import axios from 'axios';

const base = 'data:image/png;base64,'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base64AndroidUrl: '',
            base64IosUrl: ''
        }
    }


    //点击币种介绍的时候跳转
    coinInfoMessage() {
        const {dispatch} = this.props
        dispatch(changeCoinInfoIntroduce(dispatch, 0))
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getTotalUser())
        axios.post('/downloadapp/updateLocation')
            .then(function (res) {
                this.setState({
                    base64AndroidUrl: res.data.attachment.base64AndroidUrl,
                    base64IosUrl: res.data.attachment.base64IosUrl
                })
            }.bind(this))
    }

    //在组件卸载的时候清除定时器
    componentWillUnmount = () => {
        clearInterval(this.state.timer)
    }

    render() {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        let isHome = parseInt(sessionStorage.getItem('isHome'))

        const {total} = this.props

        return (
            <div className="footer">
                <div className="footerMain clearfix">
                    <div className="footerMain-center clearfix">
                        <ul className="footerMainList clearfix">
                            <li className="footerMainListFirst">
                                <h4 className="headline">专注安全交易</h4>
                                <div className="lineOne"></div>
                                <ul>
                                    <li>多重认证与审核体系</li>
                                    <li className="footer-top">完善的资金冷藏机制</li>
                                    <li className="footer-top">严密的安全监测手段</li>
                                </ul>
                            </li>
                            <li className="cutOffLine footerBackgroundColor"></li>
                            <li className="footerMainListSec">
                                <h4 className="headline">打造极致体验</h4>
                                <div className="lineOtherOne"></div>
                                <ul>
                                    <li className="text-center">交易流程便捷流畅</li>
                                    <li className="footer-top text-center">操作界面简单友好</li>
                                    <li className="footer-top text-center">交易服务贴心优质</li>
                                </ul>
                            </li>
                            <li className="cutOffLine footerBackgroundColor"></li>
                            <li className="footerMainListThr">
                                <h4 className="headline text-center">推荐使用的浏览器</h4>
                                <div className="lineTwo"></div>
                                <ul>
                                    <li className="text-center">使用以下浏览器体验更佳</li>
                                    <li className="IconMargin clearfix">
                                        <a href="https://www.google.cn/chrome/browser/desktop/index.html"
                                           target="_blank" className="fl">
                                            <img src={chrome}/>
                                            <span>谷歌</span>
                                        </a>
                                        <a href="http://www.mozilla.org/firefox/new/" target="_blank" className="fl">
                                            <img src={firefox}/>
                                            <span>火狐</span>
                                        </a>
                                        <a href="http://chrome.360.cn/" target="_blank" className="fl">
                                            <img src={safety}/>
                                            <span>360极速</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="cutOffLine footerBackgroundColor"></li>
                            <li className="footerMainListFiv clearfix">
                                <h4 className="headline text-center">APP下载</h4>
                                <div className="lineThree"></div>
                                <ul className="clearfix">
                                    <li className="fl">
                                        <em className="show text-center"><Icon
                                            style={{fontSize: "20px", color: "#2ec4f7"}} type="apple"/><span
                                            style={{marginLeft: "5px"}}>IOS</span></em>
                                        <img src={base + this.state.base64IosUrl}/>
                                    </li>
                                    <li className="fl">
                                        <em className="show text-center"><Icon
                                            style={{fontSize: "20px", color: "#7cba59"}} type="android"/><span
                                            style={{marginLeft: "5px"}}>Android</span></em>
                                        <img src={base + this.state.base64AndroidUrl}/>
                                    </li>
                                </ul>
                            </li>
                            <li className="cutOffLine footerBackgroundColor"></li>
                            <li className="fr footerMainListFou">
                                <h4 className="headline">服务平台</h4>
                                <div className="lineFour"></div>
                                <span className="show">微信公众号</span>
                                <img src={weChatCode} className="show"/>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="footerComMain-bottom" style={{backgroundColor: "#000119"}}>
                    <div>
                        <div className="footerComMain clearfix">
                            <div className="footer-div-top clearfix">
                                <p className="fl">数字货币交易有风险，投资需谨慎!</p>
                                <p className="fr">注册人数<span>00{total}</span>人<img src={reference}/><span>京公网安备 11010102002019号</span>
                                </p>
                            </div>
                            <div className="footer-div-bot clearfix">
                                <p className="fl"><Link to="/aboutus" className="footerCompanyInfoFir">关于我们</Link> |
                                    <Link
                                        to="/contactus">联系我们</Link>|
                                    <Link to="/legalnotice">法律声明与风险提示</Link> | <Link
                                        to={token && uid ? "/personal/faq" : "/login"}>常见问题</Link> | <Link
                                        to="/currencyintroduce"
                                        onClick={this.coinInfoMessage.bind(this)}>币种介绍</Link>
                                </p>
                                <p className="fr">
                                <span><a href="http://www.miitbeian.gov.cn/"
                                         target="_blank">京ICP备17020871号</a>&nbsp;&nbsp;&nbsp;
                                    {/*祥云汇聚网络科技（北京）有限公司&nbsp;*/}
                                </span> | &nbsp;
                                    <span>Copyright &copy;
                                        2017, 12lian 祥云汇聚网络科技 (北京) 有限公司</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.homePage
    }
})(Footer)




