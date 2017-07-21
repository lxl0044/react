import React from 'react';
import {Link} from 'react-router';
import {Menu, Icon} from 'antd';
import '../../css/securitycenter'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

let key = ['1'];

export default class SecurityCenterMenu extends React.Component {

    handleClick = (e) => {
        let hash = SecurityCenterMenu.getNewsid()
        this.checkHash(hash)
    }

    static getNewsid () {
        var arr = window.location.href.split('/')
        return arr[arr.length - 1]
    }

    componentDidMount() {
        let hash = SecurityCenterMenu.getNewsid()
        this.checkHash(hash)
    }

    checkHash (hash) {
        switch(hash) {
            case 'personal':
                key = ['1']
                break;
            case 'personalinformation':
                key = ['1']
                break;
            case 'settings':
                key = ['2']
                break;
            case 'certification':
                key = ['3']
                break;
            case 'securitycenterpay':
                key = ['4']
                break;
            case 'paycoin':
                key = ['5']
                break;
            case 'securitycenterwithdraw':
                key = ['6']
                break;
            case 'withdrawcoin':
                key = ['7']
                break;
            case 'propertydetails':
                key = ['8']
                break;
            case 'integral':
                key = ['9']
                break;
            case 'faq':
                key = ['10']
                break;
            case 'feedback':
                key = ['11']
                break;
            case 'notification':
                key = ['12']
                break;
        }
    }

    componentDidUpdate() {
        let hash = SecurityCenterMenu.getNewsid()
        this.checkHash(hash)
    }

    render() {
        let hash = SecurityCenterMenu.getNewsid()
        this.checkHash(hash)

        return (
            <div className="SecurityCenterMenu fl">
                <Menu
                    onClick={this.handleClick}
                    style={{width: 280, borderRadius: 4}}
                    defaultSelectedKeys={key}
                    selectedKeys={key}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5']}
                    mode="inline"
                > 
                    <SubMenu className="sub1" key="sub1" title={<span>个人账户</span>}>
                            <Menu.Item key="1"><Link to="/personal/personalinformation">个人信息</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu className="sub1" key="sub2" title={<span>安全中心</span>}>
                            <Menu.Item key="2"><Link to="/personal/settings">安全设置</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/personal/certification">实名认证</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu className="sub1" key="sub3" title={<span>资产管理</span>}>
                        <Menu.Item key="4"><Link to="/personal/securitycenterpay">充值</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="/personal/paycoin">充币</Link></Menu.Item>
                        <Menu.Item key="6"><Link to="/personal/securitycenterwithdraw">提现</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/personal/withdrawcoin">提币</Link></Menu.Item>
                        <Menu.Item key="8"><Link to="/personal/propertydetails">资产详情</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/personal/integral">积分</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu className="sub1" key="sub4" title={<span>支持</span>}>
                        <Menu.Item key="10"><Link to="/personal/faq">FAQ</Link></Menu.Item>
                        <Menu.Item key="11"><Link to="/personal/feedback">问题反馈</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu className="sub1" key="sub5" title={<span>通知</span>}>
                        <Menu.Item key="12"><Link to="/personal/notification">通知</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}