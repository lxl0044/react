import React from 'react';
import TopTitle from '../../Common/TopTitle';
import { Pagination } from 'antd';
import { requestUserInviteDetails } from '../../Redux/Action/SecurityCenterAction'

const base = 'data:image/png;base64,'

export default class InviteCode extends React.Component {

    //点击复制按钮1
    copyFunc1 () {
        let addressOne = this.refs.addressOne
        addressOne.focus();
        addressOne.setSelectionRange(0, addressOne.value.length);
        document.execCommand("Copy", true)
    }
    //点击复制按钮2
    copyFunc2 () {
        let addressTwo = this.refs.addressTwo
        addressTwo.focus();
        addressTwo.setSelectionRange(0, addressTwo.value.length);
        document.execCommand("Copy", true)
    }
    //分页
    onChange (page) {
        const {dispatch} = this.props
        let info = {
            size:21,
            page:page
        }
        dispatch(requestUserInviteDetails(info))
    }
    render() {
        const { count, inviteId, ratio,baseImg,unameList } = this.props.invite
        let inviteList = unameList.map((cur,index,arr) => {
            return <li className="text-center">{arr[index]}</li>
        })
        return (
            <div className="invite-code-box">
                <TopTitle title="职业经理人"/>
                <p className="invite-code-person"><span>成功邀请：</span><span className="warn">{count}人</span></p>
                <div className={count === 0 ? "invite-code-person-list hide" : "invite-code-person-list show"}>
                    <span className="invite-code-person-list-square"></span>
                    <span className="invite-code-person-list-transparent"></span>
                    <ul className="clearfix">
                        {inviteList}
                    </ul>
                    <div className="invite-code-person-list-pages text-center">
                        <Pagination defaultCurrent={1} defaultPageSize={21} onChange={this.onChange.bind(this)} total={count}/>
                    </div>
                </div>
                <div className="invite-award">邀请奖励</div>
                <div className="invite-award-box">
                    <p>可获得受邀用户交易手续费的<span className="warn">{ratio * 100}%</span>作为返佣。</p>
                    <span className="show">案例：</span>
                    <div className="invite-award-box-main clearfix">
                        <div className="fl invite-award-box-main-left">
                            <p>
                                我邀请Jack注册了12lian，Jack每个月交易手续费在<span className="warn">￥100</span>左右。
                            </p>
                            <p>
                                我每月可获得<span className="warn">￥20</span>的返佣。
                            </p>
                        </div>
                        <div className="fl clearfix invite-award-box-main-right">
                            <div className="fl"><span>我</span></div>
                            <div className="fl invite-award-arrows">
                                <p>邀请</p>
                                <div className="invite-award-arrows-line">
                                    <b className="invite-award-arrows-line-right"><i className="right-arrow1"></i><i className="right-arrow2"></i></b>
                                </div>
                            </div>
                            <div className="fl"><span>Jack</span></div>
                        </div>
                    </div>
                </div>
                <div className="invite-award">邀请方式</div>
                <div className="invite-way-box">
                    <p className="invite-way-box-one">邀请方式一：复制您的链接推荐给您的好友</p>
                    <div>
                        <span>专属链接</span><input type="text" value={`https://www.12lian.com/register/${inviteId}`} ref="addressOne" /><button onClick={this.copyFunc1.bind(this)}>复制</button>
                    </div>
                    <p className="invite-way-box-two">邀请方式二：复制您的邀请码给您的好友</p>
                    <div>
                        <span>专属邀请码</span><input type="text" value={inviteId} ref="addressTwo"/><button onClick={this.copyFunc2.bind(this)}>复制</button>
                    </div>
                    <p className="invite-way-box-three">邀请方式三：邀请二维码</p>
                    <div className="invite-award-code" style={{marginLeft:"124px"}}>
                        <img src={base + baseImg}/>
                    </div>
                </div>
            </div>
        )
    }
}