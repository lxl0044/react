import React from 'react'
import { connect } from 'react-redux'
import CateItemSpread from './CateItemSpread'
import {emitMsgForCates} from '../../Redux/Action/DealCenterAction'

let timer
class OnlineRightSide extends React.Component {

    // 发送信息
    emitForCate = (coinCode) => {
        const {dispatch} = this.props
        dispatch(emitMsgForCates(dispatch, coinCode))
    }


    componentDidMount () {
        // 第一次加载 k线 右侧数据
        this.emitForCate()
        timer = setInterval(() => {
            this.emitForCate()
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(timer)
    }

    render () {
        const { others } = this.props.cates

        let cates = others.map(function (item, index) {
            return <CateItem { ...item } key={`cate${index}`} dispatch={this.props.dispatch}/>
        }.bind(this))

        return (
            <div className="dealcenter-online-cate">
                <div className="cate-item-spread">
                    <ul>
                        <CateItemSpread { ...this.props }/>
                    </ul>
                </div>
                <ul>
                    {cates}
                </ul>
            </div>
        )
    }
}


export default connect(state => {
    return {
        ...state.dealcenterRealtime,
        spread: state.homePage.spread
    }
})(OnlineRightSide)



