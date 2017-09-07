import React from 'react'
import CoinItem from './DealCenterCoinItem'
import {
    emitMsgForCates,
    offMsgForCates,
    lisntenPersonalTradingPrice,
    personalDelegateRecord,
    offPersonalTradingPrice
} from '../../Redux/Action/DealCenterAction'

let timer, counter = 0


export default class DealCenterCoins extends React.Component {

    // 发送信息
    emitForCate = () => {
        const currencyId = sessionStorage.getItem('currencyId') || '2'
        const {dispatch} = this.props
        dispatch(emitMsgForCates(dispatch, currencyId))
    }


    componentDidMount() {
        // 第一次加载 k线 右侧数据
        const {dispatch} = this.props
        const currencyId = sessionStorage.getItem('currencyId') || '2'

        this.emitForCate()
        timer = setInterval(() => {
            ++counter
            if (counter % 2) {
                this.emitForCate()
            } else {
                const token = localStorage.getItem('token')
                const uid = localStorage.getItem('uid')

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

    render () {
        const { style } = this.props
        const {others} = this.props.cates
        const { boxColor, color, boxTopColor } = this.props.style

        let lists = others.map(function (item, index) {
            return <CoinItem {...item} { ...style } key={`cate${index}`} dispatch={this.props.dispatch}/>
        }.bind(this))

        return (
            <div className="new-dealcenter-top-part">
                <h3 style={{color: `${color}`, backgroundColor: `${boxTopColor}`}}>选择币种</h3>
                <ul className="new-dealcenter-coin-lists clearfix" style={{backgroundColor: `${boxColor}`}}>
                    { lists }
                </ul>
            </div>
        )
    }
}