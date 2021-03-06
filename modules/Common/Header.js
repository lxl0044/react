import React from 'react'
import {Link} from 'react-router'
import {Badge, Icon} from 'antd'
import { connect } from 'react-redux'
import { requestUserInfo, userLogout, customerCoinAccount } from '../Redux/Action/CommonAction'
import  Asset from './Asset/Asset'
import { toggleClass } from '../../tools/utils'
import '../../css/header.css'
import Headerbg from '../../images/header_bg.png'
const homeStyle = {
    position: 'fixed',
    backgroundColor: 'transparent'
}
const otherStyle = {
    backgroundColor: '#000119',
    position: 'relative',
    borderBottom: 'none'
}

let header
class Header extends React.Component {
    logout() {
        const { dispatch } = this.props
        dispatch(userLogout())
    }

    scrollHandlerInMobile = () => {
        let isHome = parseInt(sessionStorage.getItem('isHome'))
        let body = document.querySelector('body')
        if(window.location.pathname.match("/dealcenter") || !isHome) return
        let height = body.scrollTop ? body.scrollTop : document.documentElement.scrollTop
        header.style.transition = 'none'
        header.style.top = height + 'px'
        if (height >= 94) {
            header.style.backgroundColor = 'rgba(0,0,25,.7)'
        } else {
            header.style.backgroundColor = 'transparent'
        }
    }
    //pc端设备监听scroll事件
    scrollHandlerPc = () => {
        let isHome = parseInt(sessionStorage.getItem('isHome'))
        if(window.location.pathname.match("/dealcenter") || !isHome) return
        let body = document.querySelector('body')
        let height = body.scrollTop ? body.scrollTop : document.documentElement.scrollTop
        if (height >= 94) {
            header.style.backgroundColor = 'rgba(0,0,25,.7)'
        } else {
            header.style.backgroundColor = 'transparent'
        }
    }
    // 滚动事件
    scrollHandler() {
        let isHome = parseInt(sessionStorage.getItem('isHome'))
            // 判断访问设备类型，改变header定位方式
            // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && isHome) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if(isHome) {
                    header.style.position = 'absolute'
                    window.addEventListener('scroll', this.scrollHandlerInMobile)
                } else {
                    header.style.top = 0
                    window.removeEventListener('scroll', this.scrollHandlerInMobile)
                }
            } else { // pc端设备
                if(isHome) {
                    window.addEventListener('scroll', this.scrollHandlerPc)
                } else {
                    window.removeEventListener('scroll', this.scrollHandlerPc)
                }
            }

    }
    // mouseEnter
    activeHandler() {
        let isHome = parseInt(sessionStorage.getItem('isHome'))
        if (isHome) {
            header.style.backgroundColor = 'rgba(0,0,25,.7)'
        }

    }
    // mouseLeave
    leaveHandler() {
        let isHome = parseInt(sessionStorage.getItem('isHome'))
        if (isHome) {
            let body = document.querySelector('body')
            let height = body.scrollTop ? body.scrollTop : document.documentElement.scrollTop
            if (height < 94) {
                header.style.backgroundColor = 'transparent'
            }
        }

    }
    // 控制下划线
    showUnderline() {
        let list = this.refs.lists.children
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function () {
                for (let j = 0; j < list.length; j++) {
                    list[j].className = ''
                }
                this.className = 'selected'
            })
        }
    }
    // 确定刷新页面后，导航下划线的位置
    confirmUnderline() {
        let home = this.refs.home
        let information = this.refs.information
        let dealcenter = this.refs.dealcenter
        let personal = this.refs.personal
        let delegation = this.refs.delegation
        let lists = this.refs.lists.children
        let pathname = window.location.pathname
        Array.prototype.forEach.call(lists, function (list) {
            list.className = ''
        })
        if (pathname.indexOf('home') != -1) {
            home.className = 'selected'
        } else if (pathname.indexOf('/information') != -1) {
            information.className = 'selected'
        } else if (pathname.indexOf('/announce') != -1) {
            information.className = 'selected'
        }else if (pathname.indexOf('dealcenter') != -1) {
            dealcenter.className = 'selected'
        } else if (pathname.indexOf('personal') != -1) {
            personal.className = 'selected'
        } else if(pathname.indexOf('delegation') != -1) {
            delegation.className = 'selected'
        }
    }

    // 显示侧边条
    // showAside = () => {
    //     let wrapper = document.createElement('div')
    //     let aside = document.querySelector('#aside')
    //     toggleClass(aside, 'pull-left')
    //     wrapper.id = 'wrapper'
    //     document.body.appendChild(wrapper)
    //     document.body.style.overflow = 'hidden'
    //     wrapper.addEventListener('click', () => {
    //         document.body.removeChild(wrapper)
    //         toggleClass(aside, 'pull-left')
    //         document.body.style.overflow = 'auto'
    //     })
    // }
    componentDidMount() {
        header = this.refs.header
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        const currencyId = sessionStorage.getItem('currencyId') || '2'
        const { dispatch } = this.props
        this.confirmUnderline()
        this.scrollHandler()
        this.showUnderline()
        if (!token && !uid) return
        dispatch(customerCoinAccount())
        dispatch(requestUserInfo())
    }

    componentDidUpdate() {
        this.confirmUnderline()
        this.scrollHandler()
    }

    render() {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        const {uname, notice } = this.props
        let isHome = parseInt(sessionStorage.getItem('isHome'))
        return (
            <div className="header" ref='header' style={isHome ? homeStyle : otherStyle}
                 onMouseEnter={this.activeHandler.bind(this)}
                 onMouseLeave={this.leaveHandler.bind(this)}
            >
                <div className="header-box">
                    <Link to="/home" className="logo fl">12lian</Link>
                    <a href="javascript:;" className="fl">Beta版</a>
                    <ul ref='lists'>
                        <li ref="home">
                            <Link to="/home"><span>首页</span></Link>
                            <div className="underline"></div>
                        </li>
                        <li ref="dealcenter">
                            <Link to="/dealcenter"><span>交易中心</span></Link>
                            <div className="underline"></div>
                        </li>
                        <li ref="delegation">
                            <Link to="/delegation"><span>委托管理</span></Link>
                            <div className="underline"></div>
                        </li>
                        <li ref="information">
                            <Link to="/information"><span>最新动态</span></Link>
                            <div className="underline"></div>
                        </li>
                        <li ref="personal">
                            <Link to="/personal"><span>个人中心</span></Link>
                            <div className="underline"></div>
                        </li>
                    </ul>
                    { !token && !uid ?
                        <div className="user-box fr">
                            <Link to="/login">登录</Link>
                            <Link to="/register">注册</Link>
                        </div> :
                        <div className="user-info fr">
                            <dl className="clearfix">
                                <dd className="fl">
                                    <Link to="/personal/personalinformation" className="username">{uname}</Link>
                                    <a href="javascript:;" className="userUid">UID：{uid}</a>
                                    {/*<Asset  {...this.props}/>*/}
                                    {/*<Link to="/personal/notification" onClick={this.showAside}>*/}
                                        {/*<Badge count={notice}*/}
                                               {/*style={{backgroundColor: '#c40000', boxShadow: 'none'}}>*/}
                                            {/*<Icon type="bell" style={{fontSize: '20px'}}/>*/}
                                        {/*</Badge>*/}
                                    {/*</Link>*/}
                                    <a href="https://source.12lian.com/12chaintoken_qt_for_win.rar" className="download-pack">DLC钱包下载</a>
                                </dd>
                                <dd className="fr"><a href="javascript:;" onClick={this.logout.bind(this)}>退出</a></dd>
                            </dl>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
export default connect(state => {
    return {
        uname: state.homePage.uname,
        points: state.homePage.points,
        notice: state.homePage.notice,
        coinAccount: state.homePage.coinAccount,
        random: Math.random(),
    }
})(Header)