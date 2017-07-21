import React from 'react'
import {Icon, message} from 'antd'
import {Link} from 'react-router'
import './asset.css'
import { img } from '../../host'

export default class Asset extends React.Component {

    state = {
        spread: false
    }

    showAsset = () => {
        let asset = this.refs.asset
        asset.addEventListener('click', (e) => {
            e.stopPropagation()
            this.setState({
                spread: !this.state.spread
            })
        })
    }


    profitHandler = () => {
        message.error('本功能暂未开放')
    }

    componentDidMount () {
        this.showAsset()
    }

    render() {
        const { points } = this.props
        const { data, allMoney } = this.props.coinAccount
        let lists = data.map((item, index) => {
            return  <tr key={`asset${index}`}>
                        <td><img src={item.icoUrl ? `${img + item.icoUrl}` : `${img}img_holder.png`}/>{item.currencyName}</td>
                        <td>{item.amount}</td>
                        <td>{item.cashAmount}</td>
                        <td>{item.freezeAmount}</td>
                    </tr>
        })

        return (
            <div className="asset">
                <a href="javascript:;" ref="asset">
                    <span>资产</span>
                    {this.state.spread ? <Icon type="caret-up"/> : <Icon type="caret-down"/>}
                </a>
                <div className={this.state.spread ? "asset-info spread" : "asset-info"}>
                    <div className="asset-header">
                        <dl>
                            <dt>CNY余额</dt>
                            <dd className="warn">{allMoney}</dd>
                        </dl>
                        <dl>
                            {/*<dd>净资产：￥<span>2000</span></dd>*/}
                            <dt>积分</dt>
                            <dd className="warn">{points}</dd>
                            {/*<dd>提现总资产：￥<span>2000</span></dd>*/}
                        </dl>
                    </div>
                    <div className="asset-table">
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>总资产</th>
                                <th>可用资产</th>
                                <th>冻结资产</th>
                            </tr>
                            </thead>
                            <tbody>
                                {lists}
                            </tbody>
                        </table>
                    </div>
                    <div className="user-operate clearfix">
                        <Link to="/personal/securitycenterpay">充值</Link>
                        <Link to="/personal/securitycenterwithdraw">提现</Link>
                        <a href="javascript:;" onClick={this.profitHandler}>红利红包</a>
                    </div>
                </div>
            </div>
        )
    }
}