// 关于我们
import React from 'react';
import '../../css/coinvote.css'
import {message} from 'antd';
import {connect} from 'react-redux'
import {Link} from 'react-router'
import { CoinVoteList,SupportCoinVote } from '../Redux/Action/CommonAction'
import { userInfoInSecurityCenter } from '../Redux/Action/SecurityCenterAction'
import {img} from '../host'


const style = {
    disabled:"disabled",
    backgroundColor:"#ccc"
}
class CoinVote extends React.Component {
    //支持
    support (id,index) {
        const { dispatch,isAuth } = this.props
        let info = {
            currencyId:id
        }
        //获取点击的按钮
        let list = this.refs.list
        let btn = list.children[index].children[0].children[3]
        if (isAuth > 0) {
            dispatch(SupportCoinVote(dispatch,info,btn))
        } else {
            message.error("KYC1(初级实名认证)后方可进行投票")
        }
    }

    componentDidMount() {
        document.body.scrollTop = 0
        const { dispatch } = this.props
        dispatch(CoinVoteList(dispatch))
        dispatch(userInfoInSecurityCenter())
    }
    render() {
        const { list } = this.props.CoinVoteList
        let coinVote = list.map((cur,index) => {
            return <li className="clearfix">
                <div className="fl">
                    <img src={img + cur.icoUrl} className="show"/>
                    <p className="text-center">{cur.currencyName}</p>
                    <p className="text-center">{`已有${cur.voteCount}人支持`}</p>
                    <button className="show" style={cur.hasVote === 1 ? style : {}} onClick={this.support.bind(this,cur.id,index)}>支持</button>
                </div>
                <div className="fr">
                    <img src={cur.url}/>
                </div>
            </li>
        })
        return (
            <div className="coin-vote">
                <div className="coin-vote-title text-center">
                    推荐币投票
                </div>
                <div className="coin-vote-text">
                    <p className=" warn" style={{textIndent:"2em"}}>币种上线活动已进入投票阶段，投票通道现已开启！自2017年8月21日起至2017年8月31日期间内，您可在下方10种代币中进行选择投票。投票活动结束后，支持数排名前三的币种将在12链网上线，感谢您的参与！</p>
                    <p style={{margin:"20px 0"}}>注意事项：</p>
                    <p style={{textIndent:"2em",margin:"5px 0"}}>1. KYC1(初级实名认证)后方可进行投票。<Link to="/personal/certification" className="blue">去认证</Link></p>
                    <p style={{textIndent:"2em",margin:"5px 0"}}>2. 12链网注册会员可有三次投票机会，投票后不可取消。</p>
                    <p style={{textIndent:"2em",margin:"5px 0"}}>3. 对于恶意刷票的项目，12链网将强制下线。</p>
                    <p style={{textIndent:"2em",margin:"5px 0"}}>4. 对人气高的项目，12链网会主动接洽，进行客观中立的尽职调查，达到最终审核标准后可在12链上线交易。</p>
                </div>
                <div className="coin-vote-coins">
                    <ul ref="list">
                        {coinVote}
                    </ul>
                </div>
            </div>
        )
    }
}
export default connect(state => {
    return {
        CoinVoteList:state.homePage.CoinVoteList,
        isAuth:state.userInfoDetails.isAuth
    }
})(CoinVote)