import React from 'react';
import {Pagination} from 'antd';
//常见问题
const dataList = [{
    id: 1,
    cont: '实名认证',
    text: "实名认证由身份认证、视频认证两大部分组成，其中身份认证分为初级认证(KYC1)与高级认证(KYC2)，在网页端以及手机客户端均可进行。只有完成身份认证才可进行视频认证(KYC3)，且视频认证目前仅可从手机客户端完成。"
}, {
    id: 2,
    cont: '初级认证(KYC1)',
    text: "网页端：在认证页面提交姓名、国籍、证件类型以及证件号码等个人信息。在信息无误的情况下该认证提交之后可立即认证成功，且认证成功后不予修改和解除。",
    text1: "手机端：登录手机客户端主界面，进入“身份认证”页面，完成初级认证(KYC1)。"
}, {
    id: 4,
    cont: '高级认证(KYC2)',
    text: "网页端/手机端：提交个人性别、民族、职业、出生年月、常住地址，以及身份证正反面照片和手持身份证照片，完成认证。"
},{
    id: 5,
    cont: '视频认证(KYC3)',
    text: "由于视频认证仅限在手机端进行，请在网页端点击“认证下载”链接下载相应的手机客户端进行操作。"
}]


export default class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        }
    }

    //监听页数发生改变的时候显示当前对应的内容
    onChange(pageNumber) {
        this.setState({
            dataList: dataList
        })
    }

    componentDidMount() {
        this.setState({
            dataList: dataList
        })
        document.body.scrollTop = 0
    }

    render() {
        let list = this.state.dataList.map(list => {
            if (list.text1) {
                return <li key={list.id.toString()} className="TabsTabLi">
                <a href="javascript:;">{list.cont}</a>
                <p>{list.text}</p>
                <p>{list.text1}</p>
            </li>
            } else {
                return <li key={list.id.toString()} className="TabsTabLi">
                <a href="javascript:;">{list.cont}</a>
                <p>{list.text}</p>
            </li>
            } 
            
        })
        return (
            <div className="Problem">
                <ul>
                    {list}
                </ul>
            </div>
        )
    }
}