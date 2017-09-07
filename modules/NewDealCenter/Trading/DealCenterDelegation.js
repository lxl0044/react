import React from 'react'
import {Link} from 'react-router'
import { Modal, message } from 'antd'
import Finish from "./DelegationFinish"
import { formatNumber } from '../../../tools/utils'
import { cancelTradingOrder } from '../../Redux/Action/DealCenterAction'
let md5 = require('../../../tools/MD5.js')
const dealSalt = "dig?F*ckDa2g5PaSsWOrd&%(13lian0160630).";

let orderNo
export default class DealCenterDelegation extends React.Component {

    state = {
        finished: false
    }

    // 展示输入交易密码
    handleCancel = (e) => {
        const { dispatch } = this.props
        dispatch({type: 'CLOSE_DELEGATE_PWD_BOX'})
    }

    // 点击撤单
    delHandler (index) {
        const { pwdStatus, dispatch } = this.props
        const { currencyId } = this.props.cates.current

        let info = {
            currencyId: currencyId,
            orderNo: index,
            fdPassword: '',
            source: 1
        }

        if(pwdStatus === "2") { // 无需交易密码
            return dispatch(cancelTradingOrder(dispatch, info))
        }
        orderNo = index
        dispatch({type: 'OPEN_DELEGATE_PWD_BOX'})
    }

    // 输入密码，确定撤单
    submitHandler = () => {
        const uid = localStorage.getItem('uid')
        let dealpwd = md5(this.refs.dealpwd.value.trim() + dealSalt + uid)
        if(!this.refs.dealpwd.value) return message.error('请输入交易密码')

        const { dispatch } = this.props
        const { currencyId } = this.props.cates.current
        let info = {
            currencyId: currencyId,
            orderNo: orderNo,
            fdPassword: dealpwd,
            source: 1
        }
        dispatch(cancelTradingOrder(dispatch, info, this.refs.dealpwd))
    }


    goDelegation = () => {
        const {dispatch} = this.props
        const {currencyId} = this.props.cates.current
        dispatch({type: 'CHOOSE_ACTIVE_TAB', id: currencyId})
    }

    switchToWaiting = () => {
        this.setState({
            finished: false
        })
    }

    switchToFinish = () => {
        this.setState({
            finished: true
        })
    }

    render() {
        const {boxColor, color, boxTopColor} = this.props.style
        const {finished} = this.state
        const { tradeFail } = this.props.delegateRecord
        const { pointPrice, pointNum } = this.props.cates.current
        const {visible} = this.props

        const items = tradeFail.map((item, index) => {
            return <ul className="clearfix" key={`delegate${index}`} style={index % 2 === 0 ? {backgroundColor: `${boxTopColor}`, color: `${color}`} : {backgroundColor: 'transparent', color: `${color}`}}>
                <li className={item.buyOrSell === 1 ? 'green' : 'warn'}>{item.buyOrSell === 1 ? '买入' : '卖出'}</li>
                <li>{formatNumber(item.price, pointPrice)}</li>
                <li>{formatNumber(item.num, pointNum)}</li>
                <li>{item.status === 2 ?
                    <span>已完成</span> : item.status === 1 ?
                        <span>部分成交</span> : <span>未成交</span>
                }</li>
                <li><a href="javascript:;" onClick={this.delHandler.bind(this, item.orderNo)}>撤销</a></li>
            </ul>
        })


        return (
            <div className="new-personal-delegation">
                <div className="new-personal-delegation-cont" style={{backgroundColor: `${boxColor}`}}>
                    <div className="new-delegation-cont-title">
                        <ul className="clearfix">
                            <li className={finished ? "" : "selected"} style={{color: `${color}`, backgroundColor: `${boxTopColor}`}}
                                onClick={this.switchToWaiting}
                            >
                                未成交委托
                            </li>
                            <li  className={finished ? 'selected' : ""} style={{color: `${color}`, backgroundColor: `${boxTopColor}`}}
                                 onClick={this.switchToFinish}
                            >
                                成交记录</li>
                            <li><Link to="/delegation" onClick={this.goDelegation}>更多</Link></li>
                        </ul>
                    </div>
                    <div className="new-delegation-cont-box">
                        {finished ?
                            <Finish { ...this.props } /> :
                            <div className="new-delegation-waiting">
                                <div className="new-delegation-waiting-head">
                                    <ul className="clearfix">
                                        <li>类型</li>
                                        <li>委托价格</li>
                                        <li>委托数量</li>
                                        <li>状态</li>
                                        <li>操作</li>
                                    </ul>
                                </div>
                                <div className="new-delegation-waiting-body">
                                    { items }
                                </div>
                            </div>
                        }
                        <Modal title={'确认交易密码'}
                               visible={visible}
                               onCancel={this.handleCancel}
                               footer={null}>
                            <div className="alert-cont">
                                <div className="input-area">
                                    <label htmlFor="">交易密码</label>
                                    <div className="input-box" style={{width: '200px'}}>
                                        <input type="password" ref="dealpwd" placeholder="设置交易密码"/>
                                    </div>
                                </div>
                                <div className="input-area">
                                    <button style={{width: '200px', marginLeft: '110px'}}
                                            onClick={this.submitHandler}
                                    >确定</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}
