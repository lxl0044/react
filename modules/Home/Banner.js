// Banner
import React from 'react'
import '../../css/section'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {img} from '../host'
import arrowl from '../../images/arrow_l.png'
import arrowr from '../../images/arrow_r.png'


let token = localStorage.getItem('token')
let uid = localStorage.getItem('uid')
let timer = null//定时器
class Banner extends React.Component {

    state = {
        stretch: true,
        show: true
    }


    clickHandler() {
        this.setState({
            stretch: !this.state.stretch
        })
    }

    scrollHandler = () => {
        let remind = this.refs.remind
        let height = parseInt(getComputedStyle(this.refs.banner, null).height)
        let innerHeight = window.innerHeight
        let scrolHeight = document.body.scrollTop || document.documentElement.scrollTop
        let difHeight = height - innerHeight

        if (innerHeight < height && scrolHeight < difHeight) {
            remind.style.position = 'fixed'
        } else {
            remind.style.position = 'absolute'
        }
    }

    hasRead = () => {
        sessionStorage.setItem('hasRead', 1)
        this.setState({
            show: false
        })
    }

    componentDidMount() {
        let innerHeight = window.innerHeight
        let banner = this.refs.banner
        let remind = this.refs.remind
        //获取banner图的滚动信息
        // let news = this.refs.news
        // let height = parseInt(getComputedStyle(this.refs.banner, null).height)
        // // banner.style.height = innerHeight + 'px'
        // if (innerHeight < height) {
        //     remind.style.position = 'fixed'
        // }
        // let speed = 60;
        // let top = 0;
        // window.addEventListener('scroll', this.scrollHandler)
        // timer = setInterval(function () {
        //     top -= speed;
        //     news.style.transition = 'all .5s linear';
        //     news.style.marginTop = top + "px"
        //     if (top <= -120) {
        //         top = 0;
        //         news.style.transition = null;
        //         news.style.marginTop = top + "px";
        //     }
        // }, 3000)
    }
    componentWillUnmount() {
        clearInterval(timer)
        window.removeEventListener('scroll', this.scrollHandler)
    }


    render() {
        const { show } = this.state
        const hasRead = sessionStorage.getItem('hasRead')

        return (
            <div className="slider-warp">
                <div className="slider"  ref='banner' style={{backgroundImage: `url(${img + '0828-banner.png'})`}}>
                    <div className="slider">
                        <div className={this.state.stretch ? "reminder" : "reminder shrink"} ref="remind">
                            <div className="reminder-box" ref="news">
                                <div className="reminder-box-center">
                                    <span className="warn">12链提醒您</span>
                                    <span>：加密数字货币交易平台不得违反国家有关反洗钱、外汇管理和支付结算等金融法律法规，严格执行实名认证措施，未满18周岁禁止参与本网站交易活动。</span>
                                </div>
                                <div className="reminder-box-center">
                                    <span className="warn">12链提醒您</span>
                                    <span>：加密数字货币交易平台不得违反国家有关反洗钱、外汇管理和支付结算等金融法律法规，严格执行实名认证措施，未满18周岁禁止参与本网站交易活动。</span>
                                </div>
                            </div>
                            <div className="right-box" onClick={this.clickHandler.bind(this)}><img
                                src={this.state.stretch ? arrowr : arrowl} alt=""/></div>
                        </div>
                        {hasRead ? null : <div className={show ? "home-reminder": "home-reminder hide"}>
                            <div className="reminder-cont">
                                <h3>尊敬的用户，</h3>
                                <p>欢迎来到12链。请您在参与交易之前仔细阅读以下提示——</p>
                                <p>
                                    由于数字货币是创新型资产，受诸多因素（如预挖、暴涨暴跌、庄家操控、团队解散、技术缺陷等）影响，存在极大的交易风险。12链在此郑重提示您，在做出交易决策前请理性认知市场风险，做好风险防范准备，谨慎投资。</p>
                                <p>
                                    12链严格遵循《中华人民共和国反洗钱法》、《中华人民共和国中国人民银行法》、《中华人民共和国商业银行法》等相关法律法规，为您构建公平公正的投资环境，但平台不对用户做任何投资承诺，请您在充分理解并认可以上内容的前提下参与交易。</p>
                                <div className="text-center">
                                    <button onClick={this.hasRead}>我已了解以上风险</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>

            </div>
        )
    }
}
export default connect(state => {
    return {
        ...state
    }
})(Banner)