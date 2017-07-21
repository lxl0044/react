import React from 'react';
import axios from 'axios'
import qs from 'qs'
import {Icon} from 'antd';
import chrome from '../../../../images/chrome.png'
let token = localStorage.getItem("token")
let uid = localStorage.getItem("uid")
let value = null;//保存多选框的值
export default class BankCardPayAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: chrome,
            imgShow: this.props.imgShow,
            bankCard: true,//验证添加银行卡的弹框的select的值
            cardNumber: true,//验证添加银行卡的弹框的input的值
            options: [],//保存银行卡options
            msg:'',//保存状态码返回的错误信息
        }
    }
    //点击插号传给父级一个参数
    clickHandler() {
        let cardNumber = this.refs.cardNumber
        cardNumber.value = ""
        //给父级传一个参数，让弹框消失
        this.props.onChildAlert(true)
        document.body.style.overflow = 'auto'
    }
    // 选择开户行的时候
    onChangeValue(e) {
        value = e.target.value
        this.setState({
            bankCard: true
        })
    }
    //确认添加银行卡
    sureCardFunc() {
        let bankValue = value;
        let bankName = this.refs.bankName.innerHTML
        let cardNumber = this.refs.cardNumber.value.trim()
        let getBtn = this.refs.getBtn
        //去除空格
        let replaceCardNumber = cardNumber.replace(/\s+/g, "");
        // 判断select框
        if (!bankValue) {
            this.setState({
                bankCard: false
            })
            return false
        } else {
            this.setState({
                bankCard: true
            })
        }
        getBtn.setAttribute('disabled', 'disabled')
        getBtn.style.backgroundColor = '#ccc';
        getBtn.style.border = "1px solid #ccc"
        // 这里发送请求成功让弹框消失
        axios.post('/cardSave', qs.stringify({
            token: token,
            uid: uid,
            bankUuid: bankValue,
            bankCardNo: replaceCardNumber,
            bankCustomerName: bankName
        }))
            .then(function (res) {
                getBtn.style.backgroundColor = '#fff';
                getBtn.style.border = "1px solid #da161a"
                getBtn.removeAttribute('disabled', 'disabled')
                if (res.data.status == 200) {
                    this.props.onChildAlert(true)
                    document.body.style.overflow = 'auto'
                    window.location.reload()
                } else {
                    this.setState({
                        cardNumber:false,
                        msg:res.data.message
                    })
                }
            }.bind(this))
    }
    componentDidMount() {
        //获取银行卡列表
        axios.post('/bankTypeList', qs.stringify({
            token: token,
            uid: uid
        }))
            .then(function (res) {
                if (res.data.status == 200) {
                    // 开户行列表
                    this.setState({
                        options: res.data.attachment
                    })
                }
                //默认银行value是中国工商银行
                value = '08d3ffc37f0a4518958d40f1b2bc29bf'
            }.bind(this))
    }
    //输入银行卡号的时候每位添加一个空格
    inputFunc () {
        let cardNumber = this.refs.cardNumber
        let value = cardNumber.value
        if(/\S{5}/.test(value)){
            cardNumber.value = value.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        }
    }
    render() {
        let option = this.state.options.map((cur, index, arr) => {
            return <option key={index.toString()} value={`${cur.bankUuid}`}>{cur.bankCenterName}</option>
        })
        return (
            <div className={this.props.show ? "hide bankCardPayAlert" : "show bankCardPayAlert"}>
                <div className="bankCardPayCardAddInfoBox">
                    <div className="bankCardPayCardAddInfoBoxCenter">
                        <div className="AddInfoBoxCenterTop"></div>
                        <div className="bankCardPayTopTtileIcon clearfix">
                            <span className="fl warn">银行转账充值</span><span className="fr warn"><Icon type="close-circle-o"
                                                                                                   onClick={this.clickHandler.bind(this)}/></span>
                        </div>
                        <div className="AddInfoBoxCenterMain">
                            <div className="AddInfoBoxCenterMainName">
                                <span>姓名：</span>
                                <span ref="bankName" className="font-weight">{this.props.name}</span>
                                <span>（仅支持您本人银行卡充值）</span>
                            </div>
                            <div className="AddInfoBoxCenterMainOpen">
                                <span>开户行：</span>
                                <select placeholder="选择开户银行" onChange={this.onChangeValue.bind(this)}>
                                    {option}
                                </select>
                                {this.state.bankCard ? "" : <span className="warn show">*开户行信息不能为空</span>}
                            </div>
                            <div className="AddInfoBoxCenterMainCard">
                                <span>银行卡号：</span><input type="text" maxLength="30"
                                                         ref="cardNumber" placeholder="请填写银行号码" onInput={this.inputFunc.bind(this)}/>
                                {this.state.cardNumber ? "" : <span className="warn show"><em>*</em>{this.state.msg}</span>}
                            </div>
                            <div className="AddInfoBoxCenterMainLogin">
                                <span>注册手机号：</span>
                                <span>{this.props.phone}</span>
                            </div>
                            <div className="AddInfoBoxCenterMainButton">
                                <button className="warn" ref="getBtn" onClick={this.sureCardFunc.bind(this)}>确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}