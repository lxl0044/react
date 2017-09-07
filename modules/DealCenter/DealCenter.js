import React from 'react';
import Tips from '../Common/Tips/Tips'
import DealCenterOnline from './Online/DealCenterOnline'
import TradingCoin from './Trading/TradingCoin'
import TradingDetails from './TradingDetails/TradingDetails'
import '../../css/dealcenter'

export default class DealCenter extends React.Component {

    render() {
        return (
            <div className="dealcenter">
                {/*<Tips/>*/}
                <DealCenterOnline {...this.props}/>
                <TradingCoin {...this.props}/>
                <TradingDetails {...this.props}/>
                {/*<ChatRoom { ...this.props }/>*/}
            </div>
        )
    }
}
