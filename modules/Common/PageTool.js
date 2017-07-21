import React from 'react';
import {Icon, BackTop} from 'antd';

export default class PageTool extends React.Component {

    render() {
        return (
            <div className="page-tool">
                <div className="message" style={{bottom: '200px'}}>
                    <a target="_blank" href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001009190&aty=1&a=1&curl=&ty=1">在线客服</a>
                    <Icon type="message"/>
                </div>
                <div className="message" style={{bottom: '142px'}}>
                    <a href="javascript:;">400-100-9190</a>
                    <Icon type="phone" />
                </div>
                <div className="message" style={{bottom: '85px'}}>
                    <a href="javascript:;" className="text-left">
                        <span>QQ：3197347266</span>
                        <br/>
                        <span>邮箱：huodong@12lian.com</span>
                    </a>
                    <em>
                        <span>市场</span>
                        <br/>
                        <span>合作</span>
                    </em>
                </div>
                <div className="message">
                    <a href="javascript:;">&nbsp;660099</a>
                    <em>VIP群</em>
                </div>

                <BackTop visibilityHeight="100"/>
            </div>
        )
    }
}
