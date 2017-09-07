import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { getIntroCoin, queryCoinInfo } from '../Redux/Action/CoinIntroduceAction'
import Coin from './Top/Coin'
import Details from './Detail/CoinDetails'
import Content from './Content/IntroductionContent'
import './introduce.css'

let timer = null, counter = 1
class CoinIntroduction extends React.Component {

    state = {
        showL: true,
        showR: false
    }

    showNext = () => {
        let lists = this.refs.lists
        let left = parseInt(getComputedStyle(lists, null).left)
        let width = parseInt(getComputedStyle(lists, null).width)
        this.setState({
            showR: true
        })
        if (left <= -width) return
        counter++
        if(width / 1200 <= counter) {
            this.setState({
                showL: false
            })
            counter = 1
        }
        lists.style.left = `${left - 1200}px`
    }

    showPrev = () => {
        let lists = this.refs.lists
        let left = parseInt(getComputedStyle(lists, null).left)
        let width = parseInt(getComputedStyle(lists, null).width)

        this.setState({
            showL: true
        })
        if (left >= 0) return
        counter++
        if(width / 1200 <= counter) {
            this.setState({
                showR: false
            })
            counter = 1
        }
        lists.style.left = `${left + 1200}px`
    }

    componentDidMount () {
        document.body.scrollTop = 0

        const { dispatch } = this.props
        dispatch(getIntroCoin())
        dispatch(queryCoinInfo())
        timer = setInterval(() => {
            dispatch(getIntroCoin())
        }, 5000)
    }

    componentWillUnmount () {
        clearInterval(timer)
    }


    render () {
        const { others } = this.props.details
        const { showL, showR } = this.state

        let coins = others.map((item, index) => {
            return <Coin {...item} key={`introduce-coin${index}`} dispatch={this.props.dispatch}/>
        })

        return (
            <div className="introduce-container">
                <div className="introduce-coins">
                    <div className="introduce-coins-top">
                        { showL ? <Icon type="left" onClick={this.showNext}/> : null}
                        <div className="introduce-coins-lists">
                            <ul ref="lists" style={{width: `${others.length * 240}px`}}>
                                { coins }
                            </ul>
                        </div>
                        { showR ? <Icon type="right" onClick={this.showPrev}/> : null}
                    </div>
                    <Details { ...this.props.details.current } />
                    <Content { ...this.props.info } />
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.Intro,
    }
})(CoinIntroduction)

