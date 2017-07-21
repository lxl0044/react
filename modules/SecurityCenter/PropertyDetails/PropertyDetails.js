import React from 'react';
import { Icon,message } from 'antd';
import { connect } from 'react-redux'
import {Link} from 'react-router'
import './css/propertydetails.css'
import TopTitle from '../../Common/TopTitle';
import moneyBag from '../../../images/moneyBag.png'
import { getPropertyDetails } from '../../Redux/Action/PropertyDetailsAction'
import { formatNumber } from '../../../tools/utils'
import PersonalInformationPageInfo from './PropertyDetailsTable/PersonalInformationPageInfo'


class PropertyDetails extends React.Component {

    //点击红利钱包的时候
    clickFunc() {
        message.error("本功能暂未开放")
    }
    componentDidMount () {
        const { dispatch } = this.props
        dispatch(getPropertyDetails(dispatch))
        document.body.scrollTop = 0
    }

    render() {
        const { points } = this.props
        const { allMoney,data } = this.props.allMoney
        let item = data.map((cur, index) => {
            return <ul className="CenterList2MainBox clearfix" key={index.toString()}>
                <li>{cur.currencyName}/{cur.currencyNameEn}</li>
                <li>{formatNumber(cur.amount,4)}</li>
                <li>{formatNumber(cur.freezeAmount,4)}</li>
                <li>{formatNumber(cur.cashAmount,4)}</li>
                {cur.currencyId == 1 ? <li>
                    <Link to="/personal/securitycenterpay" className="warn">充值</Link>
                    <Link to="/personal/securitycenterwithdraw" className="blue">提现</Link>
                </li> : <li>
                    <Link to="/personal/paycoin" className="warn">充币</Link>
                    <Link to="/personal/securitycenterwithdraw" className="blue">提币</Link>
                </li>}
            </ul>
        })
        return (
            <div className="property-details-box fr">
                <div className="property-details">
                    <TopTitle title="资产详情"/>
                    <div className="property-details-money clearfix">
                        <div className="property-details-icon fl">
                            <img src={moneyBag}/>
                        </div>
                        <div className="property-details-cny fl clearfix">
                            <div className="fl">
                                <span>人民币资产</span>
                                <p className="warn"><span>￥</span>{formatNumber(allMoney,4)}</p>
                            </div>
                            <div className="fl">
                                <span>总积分</span>
                                <p>{points}</p>
                            </div>
                        </div>
                        <div className="property-details-btn fr">
                            <button onClick={this.clickFunc.bind(this)}>红利钱包</button>
                        </div>
                    </div>
                    <div className="property-details-table">
                        <div className="property-details-table-title">
                            <ul className="clearfix">
                                <li>币种</li>
                                <li>总资产</li>
                                <li>冻结资产</li>
                                <li>可用资产</li>
                                <li>操作</li>
                            </ul>
                        </div>
                        <div className="property-details-table-main">
                            {item}
                        </div>
                    </div>
                </div>
                <PersonalInformationPageInfo />
            </div>
        )
    }
}

export default connect(state => {
    return {
        ...state.PropertyDetails,
        points: state.homePage.points
    }
})(PropertyDetails)

