// LoginHistory 登录历史
import React from 'react';
import TopTitle from '../../Common/TopTitle'
import axios from 'axios'
import qs from 'qs'

export default class LoginHistory extends React.Component {
    state = {
        once: true,
        tenth: false,
        userLoginRecord: [{
            host: "",
            location: "",
            time: ""
        }]
    }

    clickHandlerOnce() {
        this.setState({
            once: true,
            tenth: false
        })
    }

    clickHandlerTenth() {
        this.setState({
            once: false,
            tenth: true
        })
    }

    componentDidMount() {
        axios.post('/user/myLogins', qs.stringify({
            type: 2,
            start: 0,
            size: 10
        }))
            .then(function (res) {
                if (res.data.status === 200) {
                    this.setState({
                        userLoginRecord: res.data.attachment
                    })
                }
            }.bind(this))
    }


    render() {
        let {userLoginRecord} = this.state, histories
        if (this.state.once) {
            histories = <tr style={{height: '30px'}}>
                <td>{userLoginRecord[0].time}</td>
                <td>{userLoginRecord[0].host}</td>
                <td>{userLoginRecord[0].location}</td>
            </tr>
        } else {
            histories = userLoginRecord.map((item, index) => {
                return <tr key={index.toString()} style={{height: '30px'}}>
                    <td>{item.time}</td>
                    <td>{item.host}</td>
                    <td>{item.location}</td>
                </tr>
            })
        }
        return (
            <div className="login-history">
                <TopTitle title="登录历史"/>
                <div className="login-cont">
                    <div className="login-type clearfix">
                        <ul>
                            <li>
                                <a href="javascript:;"
                                   className={this.state.once ? "active" : ""}
                                   onClick={this.clickHandlerOnce.bind(this)}
                                >最近登录</a>
                                <div className={this.state.once ? "underline show" : ""}></div>
                            </li>
                            <li>
                                <a href="javascript:;"
                                   className={this.state.tenth ? "active" : ""}
                                   onClick={this.clickHandlerTenth.bind(this)}
                                >最近十次</a>
                                <div className={this.state.once ? "underline hide" : "underline show"}></div>
                            </li>
                        </ul>
                    </div>
                    <div className="login-table">
                        <table>
                            <thead>
                            <tr>
                                <th>登录时间</th>
                                <th>登录IP</th>
                                <th>所在地</th>
                            </tr>
                            </thead>
                            <tbody>
                            {histories}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

