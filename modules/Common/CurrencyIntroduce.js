import React from 'react';
import '../../css/currencyintroduce.css';
import { Icon } from 'antd'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import LskInfo from './Introduce/LskInfo'
import CTInfo from './Introduce/12CTInfo'
import TlcInfo from './Introduce/TlcInfo'
import RtsInfo from './Introduce/RtsInfo'
import ElcInfo from './Introduce/ElcInfo'
import BtcInfo from './Introduce/BtcInfo'
import EthInfo from './Introduce/EthInfo'
import LtcInfo from './Introduce/LtcInfo'
import XasInfo from './Introduce/XasInfo'
import InsInfo from './Introduce/InsInfo'
import ExpInfo from './Introduce/ExpInfo'
import IcoinInfo from './Introduce/IcoinInfo'

import { changeCoinInfoIntroduce } from '../Redux/Action/CurrencyIntroduceAction'
import { addClass,removeClass } from '../../tools/utils'
import coin12ct from '../../images/coin-introduce-12ct.png'
import coinlsk from '../../images/coin-introduce-lsk.png'
import cointlc from '../../images/coin-introduce-tlc.png'
import coinrts from '../../images/coin-introduce-rts.png'
import coinbtc from '../../images/coin-introduce-btc.png'
import coinexp from '../../images/coin-introduce-exp.png'
import coinelc from '../../images/coin-introduce-elc.png'
import coineth from '../../images/coin-introduce-eth.png'
import coinins from '../../images/coin-introduce-ins.png'
import coinltc from '../../images/coin-introduce-ltc.png'
import coinxas from '../../images/coin-introduce-xas.png'
import coinicoin from '../../images/coin-introduce-icoin.png'


const data = [{
    img:coinelc,
    text:"投票链/ELC"
},{
    img:coinins,
    text:"印链/INS",
},{
    img:coin12ct,
    text:"蝶链币/DLC",
},{
    img:coinlsk,
    text:"应用链/LSK"
},{
    img:cointlc,
    text:"藏宝大陆/TLC"
},{
    img:coinrts,
    text:"瑞资链/RTS"
},{
    img:coinbtc,
    text:"比特币/BTC",
},{
    img:coineth,
    text:"以太坊/ETH"
},{
    img:coinltc,
    text:"莱特币/LTC",
},{
    img:coinexp,
    text:"Expanse/EXP",
},{
    img:coinxas,
    text:"阿希币/XAS",
},{
    img:coinicoin,
    text:"iCoin/iCoin",
}]



class CoinIntroduce extends React.Component {

    //点击切换币种信息
    changeCoinInfo (id) {
        const { dispatch } = this.props
        let ulList = this.refs.list

        data.map((cur,index,arr) => {
            if (index === id){
                addClass(ulList.children[id].children[1], 'warn')
                addClass(ulList.children[id], 'inset-box-shadow')
            } else{
                removeClass(ulList.children[index].children[1], 'warn')
                removeClass(ulList.children[index], 'inset-box-shadow')
            }
        })
        dispatch(changeCoinInfoIntroduce(dispatch,parseInt(id)))
    }

    componentDidMount() {
        document.body.scrollTop = 0
    }
    render() {
        const { coinIntroduce } = this.props
        let item = data.map((cur,index,arr) => {
            return  <li key={index.toString()} onClick={this.changeCoinInfo.bind(this,index)} className={coinIntroduce === index ? "inset-box-shadow" : ""}>
                    <img src={cur.img} alt=""/>
                    <p className={coinIntroduce === index ? "warn text-center" : "text-center"}>{cur.text}</p>
            </li>
        })
        return (
            <div className="currency-introduce">
                <div className="currency-introduce-center">
                    <div className="currency-introduce-return">
                        <Link to="/home"><Icon type="arrow-left" /><span>返回首页</span></Link>
                    </div>
                    <div className="currency-introduce-main clearfix">
                        <div className="currency-introduce-slider fl">
                            <ul ref="list">
                                {item}
                            </ul>
                        </div>
                        <div className="currency-introduce-box fr">
                            {coinIntroduce === 0 ? <ElcInfo/> :
                                coinIntroduce === 1 ? <InsInfo/> :
                                    coinIntroduce === 2 ? <CTInfo/> :
                                        coinIntroduce === 3 ? <LskInfo/> :
                                            coinIntroduce === 4 ? <TlcInfo/> :
                                                coinIntroduce === 5 ? <RtsInfo/> :
                                                    coinIntroduce === 6 ? <BtcInfo/> :
                                                        coinIntroduce === 7 ? <EthInfo/> :
                                                            coinIntroduce === 8 ? <LtcInfo/> :
                                                                coinIntroduce === 9 ? <ExpInfo/> :
                                                                    coinIntroduce === 10 ? <XasInfo/> :
                                                                        coinIntroduce === 11 ? <IcoinInfo/> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default connect(state => {
    return {
        ...state.CurrencyIntroduce
    }
})(CoinIntroduce)