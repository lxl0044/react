// SecurityCenterMain 个人信息
import React from 'react';
import { connect } from 'react-redux'
import TopTitle from '../../Common/TopTitle'
import LoginHistory from './LoginHistory'
import { userInfoInSecurityCenter } from '../../Redux/Action/SecurityCenterAction'
import SecurityCenterMainResAddress from './SecurityCenterMainResAddress'
import SecurityCenterMainResPhone from './SecurityCenterMainResPhone'
import SecurityCenterMainResEmail from './SecurityCenterMainResEmail'
import SecurityCenterMainResPwd from './SecurityCenterMainResPwd'
import SecurityCenterMainResDealPwd from './SecurityCenterMainResDealPwd'
import SecurityCenterMainSetDealPwd from './SecurityCenterMainSetDealPwd'

class SecurityCenterMain extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(userInfoInSecurityCenter())
    }
    render() {
        return (
            <div className="SecurityCenterMain fr">
                <div className="security-setting">
                    <TopTitle title="安全设置"/>
                    <div className="setting-items">
                        <ul>
                            <SecurityCenterMainResPwd { ...this.props } dispatch={this.props.dispatch}/>
                            <SecurityCenterMainResEmail { ...this.props }/>
                            <SecurityCenterMainResPhone { ...this.props }/>
                            <SecurityCenterMainResAddress { ...this.props }/>
                            <SecurityCenterMainResDealPwd { ...this.props }/>
                            <SecurityCenterMainSetDealPwd { ...this.props }/>
                        </ul>
                    </div>
                </div>
                <LoginHistory/>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        ...state.userInfoDetails
    }
}


export default connect(mapStateToProps)(SecurityCenterMain)
