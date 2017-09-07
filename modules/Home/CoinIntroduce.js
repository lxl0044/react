// Partner
import React from 'react';
import '../../css/coinintroduce.css';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { changeCoinInfoIntroduce } from '../Redux/Action/CurrencyIntroduceAction'
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
    text:"ELC"
},{
    img:coinins,
    text:"INS",
},{
    img:coin12ct,
    text:"DLC",
},{
    img:coinlsk,
    text:"LSK"
},{
    img:cointlc,
    text:"TLC"
},{
    img:coinrts,
    text:"RTS"
},{
    img:coinbtc,
    text:"BTC",
},{
    img:coineth,
    text:"ETH"
},{
    img:coinltc,
    text:"LTC",
},{
    img:coinexp,
    text:"EXP",
},{
    img:coinxas,
    text:"XAS",
},{
    img:coinicoin,
    text:"iCoin",
}]

class CoinIntroduceInfo extends React.Component {

    //点击币种的时候调到对应的币种介绍
    coinInfoIntroduce (id) {
        const { dispatch } = this.props
        dispatch(changeCoinInfoIntroduce(dispatch,parseInt(id)))
    }

    render() {
        let item = data.map((cur,index,arr) => {
            return  <li key={index.toString()}>
                <Link to="/currencyintroduce" className="show" onClick={this.coinInfoIntroduce.bind(this,index)}>
                    <img src={cur.img} alt=""/>
                    <p>{cur.text}</p>
                </Link>
            </li>
        })
        return (
            <div className="coin-introduce-boxes">
                <ul className="clearfix">
                    {item}
                </ul>
            </div>
        )
    }
}
export default connect(state => {
    return {
        ...state.CurrencyIntroduce
    }
})(CoinIntroduceInfo)