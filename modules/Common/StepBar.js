import React from 'react';
import {Steps, Icon} from 'antd';
const Step = Steps.Step;

export default class StepBar extends React.Component {
    render() {
        return (
            <Steps>
                <Step status="finish" title="确认账户" icon={<Icon type="user" className="action"/>}/>
                <Step status="wait" title="安全认证" icon={<Icon type="safety"/>}/>
                <Step status="wait" title="重置密码" icon={<Icon type="lock"/>}/>
                <Step status="wait" title="完成" icon={<Icon type="smile-o"/>}/>
            </Steps>
        )
    }
}