// 关于我们
import React from 'react';
import '../../css/ourteam.css'
import TopTitle from './TopTitle'

export default class AboutUs extends React.Component {
 componentDidMount() {
        document.body.scrollTop = 0
    }
 render() {
  return (
   <div>
    <div className="AboutUs" ref="cont">
     <div className="AboutUsMain">
      <TopTitle title="关于我们"/>
      <div>
       <p>12链由祥云汇聚网络科技（北京）有限公司自主开发，是集数字货币及资产交易、行业资讯于一体的综合服务平台。该平台着眼于全球化金融战略，并严格遵守国际商业行为准则，致力于为数字金融构建最专业合规的安全保障，是中国区块链资产交易领域的先锋力量。</p >
       <p>12链的核心团队由资深研发人员、金融顾问、网络安全专家以及专业客服人员组成，综合实力赶超国际一流交易平台，12链的到来将为推动中国数字经济全球化产生深远影响！</p >
      </div>
     </div>
    </div>
   </div>
  )
 }
}