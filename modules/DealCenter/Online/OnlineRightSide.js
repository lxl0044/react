import React from 'react'
import CateItemSpread from './CateItemSpread'
import {
    emitMsgForCates,
    offMsgForCates,
    lisntenPersonalTradingPrice,
    personalDelegateRecord,
    offPersonalTradingPrice
} from '../../Redux/Action/DealCenterAction'

let timer, counter = 0

export default class OnlineRightSide extends React.Component {

    // 发送信息
    emitForCate = () => {
        const currencyId = sessionStorage.getItem('currencyId') || '2'
        const {dispatch} = this.props
        dispatch(emitMsgForCates(dispatch, currencyId))
    }


    componentDidMount() {
        // 第一次加载 k线 右侧数据
        const {dispatch} = this.props
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')
        this.emitForCate()
        timer = setInterval(() => {
            ++counter
            if (counter % 2) {
                this.emitForCate()
            } else {
                if (!token && !uid) return
                dispatch(lisntenPersonalTradingPrice())
                dispatch(personalDelegateRecord())
            }
        }, 1000)
    }

    componentWillUnmount() {
        const {dispatch} = this.props
        clearInterval(timer)
        dispatch(offMsgForCates())
        dispatch(offPersonalTradingPrice())
    }

    render() {

        return (
            <div className="dealcenter-online-cate">
                <div className="cate-item-spread">
                    <ul>
                        <CateItemSpread {...this.props}/>
                    </ul>
                </div>
            </div>
        )
    }
}




