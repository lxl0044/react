// ResetPwd1
import React from 'react';
import {Link} from 'react-router';
import TopTitle from '../Common/TopTitle'
import {Steps, Icon} from 'antd';
import '../../css/resetPwd'
const Step = Steps.Step;

export default class ResetPwd4 extends React.Component {
    render() {
        return (
            <div className="reset-pwd">
                <TopTitle title="重置登录密码"/>
                <div className="reset-box">
                    <Steps>
                        <Step status="finish" title="确认账户" icon={<Icon type="user" className="action"/>}/>
                        <Step status="finish" title="安全认证" icon={<Icon type="safety"/>}/>
                        <Step status="finish" title="重置密码" icon={<Icon type="lock"/>}/>
                        <Step status="finish" title="完成" icon={<Icon type="smile-o"/>}/>
                    </Steps>
                    <div className="form-box">
                        <div className="input-body tips">
                            恭喜您密码已修改成功
                        </div>
                        <div className="input-body text-center">
                            <Link to="/login">去登录</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}