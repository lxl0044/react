// Banner
import React from 'react'
import '../../css/section'
import {img} from '../host'
import arrowl from '../../images/arrow_l.png'
import arrowr from '../../images/arrow_r.png'


let token = localStorage.getItem('token')
let uid = localStorage.getItem('uid')
let timer = null//定时器
export default class Banner extends React.Component {

    state = {
        stretch: true
    }


    clickHandler() {
        this.setState({
            stretch: !this.state.stretch
        })
    }

    scrollHandler  = () => {
        let remind = this.refs.remind
        let height = parseInt(getComputedStyle(this.refs.banner, null).height)
        let innerHeight = window.innerHeight
        let scrolHeight = document.body.scrollTop || document.documentElement.scrollTop
        let difHeight = height - innerHeight

        if(innerHeight < height && scrolHeight < difHeight) {
            remind.style.position = 'fixed'
        } else {
            remind.style.position = 'absolute'
        }
    }

    componentDidMount() {
        let innerHeight = window.innerHeight
        let banner = this.refs.banner
        let remind = this.refs.remind
        //获取banner图的滚动信息
        let news = this.refs.news
        let height = parseInt(getComputedStyle(this.refs.banner, null).height)
        banner.style.height = innerHeight + 'px'
        if(innerHeight < height) {
            remind.style.position = 'fixed'
        }
        let speed = 60;
        let top = 0;
        window.addEventListener('scroll', this.scrollHandler)
        timer = setInterval(function () {
            top -= speed;
            news.style.transition = 'all .5s linear';
            news.style.marginTop = top + "px"
            if (top <= -180) {
                top = 0;
                news.style.transition = null;
                news.style.marginTop = top + "px";
            }
        },3000)
    }

    componentWillUnmount() {
        clearInterval(timer)
        window.removeEventListener('scroll', this.scrollHandler)
    }


    render() {

        return (
            <div className="slider" ref='banner' style={{backgroundImage: `url(${img + 'app/banner-02.png'})`}}>
                <div className={this.state.stretch ? "reminder" : "reminder shrink"} ref="remind">
                    <div className="reminder-box" ref="news">
                        <div className="reminder-box-center">
                            <span className="warn">12链提醒您</span>
                            <span>：加密数字货币交易平台不得违反国家有关反洗钱、外汇管理和支付结算等金融法律法规，严格执行实名认证措施，未满18周岁禁止参与本网站交易活动。</span>
                        </div>
                        <div className="reminder-box-center">
                            <span className="warn">抽奖活动通知：</span>
                            <span>尊敬的用户，12链平台将于&nbsp;7.12&nbsp;-&nbsp;8.12&nbsp;进行为期一个月的抽奖活动，详情请关注12链微信公众号(公众号：12链网)。</span>
                        </div>
                        <div className="reminder-box-center">
                            <span className="warn">12链提醒您</span>
                            <span>：加密数字货币交易平台不得违反国家有关反洗钱、外汇管理和支付结算等金融法律法规，严格执行实名认证措施，未满18周岁禁止参与本网站交易活动。</span>
                        </div>
                    </div>
                    <div className="right-box" onClick={this.clickHandler.bind(this)}><img
                        src={this.state.stretch ? arrowr : arrowl} alt=""/></div>
                </div>
            </div>
        )
    }
}