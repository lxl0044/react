import React from 'react';
import {Link} from 'react-router'
import {Badge, Icon, Switch} from 'antd'
import {connect} from 'react-redux'
import {userLogout, requestUserInfo} from '../../Redux/Action/CommonAction'
import logoDark from '../../../images/logo.png'
import logoLight from '../../../images/logo-light.png'

class DealCenterHeader extends React.Component {

    logout = () => {
        const {dispatch} = this.props
        dispatch(userLogout())
        dispatch({type: 'CLEAR_PERSONAL_ACCOUNT'})
    }

    switchTheme = (status) => {
        const {dispatch} = this.props
        if (status) {
            sessionStorage.setItem('theme', 'light')
            dispatch({
                type: 'DEALCENTER_THEME_LIGHT',
                theme: 'light'
            })
        } else {
            sessionStorage.setItem('theme', 'dark')
            dispatch({
                type: 'DEALCENTER_THEME_DARK',
                theme: 'dark'
            })
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')

        const {dispatch} = this.props
        if (!token && !uid) return
        dispatch(requestUserInfo())
    }

    render() {
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        const theme = sessionStorage.getItem('theme')
        const {uname, notice} = this.props
        const {color, boxColor, activeColor} = this.props.style

        return (
            <div className="new-dealcenter-menu clearfix" style={{backgroundColor: `${boxColor}`}}>
                <Link to="/home" className="logo fl" style={{color: `${color}`}}>
                    <img src={theme && theme === 'light' ? logoLight : logoDark} alt=""/>
                    Beta
                </Link>
                <ul className="clearfix">
                    <li>
                        <Link to="/home" style={{color: `${color}`}}>首页</Link>
                    </li>
                    <li>
                        <Link to="/dealcenter"
                              style={{color: `${activeColor}`, borderColor: `${activeColor}`}}>交易中心</Link>
                    </li>
                    <li>
                        <Link to="/delegation" style={{color: `${color}`}}>委托管理</Link>
                    </li>
                    <li>
                        <Link to="/information" style={{color: `${color}`}}>最新动态</Link>
                    </li>
                    <li>
                        <Link to="/personal" style={{color: `${color}`}}>个人中心</Link>
                    </li>
                </ul>
                {!token && !uid ?
                    <div className="new-dealcenter-user-box fr">
                        <Link to="/login">登录</Link>
                        <Link to="/register">注册</Link>
                    </div> :
                    <div className="new-dealcenter-user-info fr">
                        <ul>
                            <li>
                                <Link to="/personal/personalinformation" className="username"
                                      style={{color: `${color}`}}>{uname}</Link>
                            </li>
                            <li>
                                <a href="javascript:;" className="userUid" style={{color: `${color}`}}>UID：{uid}</a>
                            </li>
                            <li>
                                <Link to="/personal/notification" style={{color: `${color}`}}>
                                    <Badge count={notice}
                                           style={{backgroundColor: '#c40000', boxShadow: 'none'}}>
                                        <Icon type="bell" style={{fontSize: '20px'}}/>
                                    </Badge>
                                </Link>
                            </li>
                            <li>
                                <a href="javascript:;" onClick={this.logout.bind(this)} className="logo-out">退出</a>
                            </li>
                        </ul>
                    </div>
                }
                <div className="switch-box">
                    <label htmlFor="" style={{color: `${color}`}}>主题</label>
                    <Switch checkedChildren="暗" unCheckedChildren="亮" onChange={this.switchTheme} defaultChecked={theme && theme === 'light'}/>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.homePage,
        style: state.dealcenterRealtime.style,
        theme: state.dealcenterRealtime.theme
    }
})(DealCenterHeader)