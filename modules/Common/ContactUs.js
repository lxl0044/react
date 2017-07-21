import React from 'react';
import '../../css/ourteam.css';
import TopTitle from './TopTitle'

export default class ContactUs extends React.Component {
 componentDidMount() {
        document.body.scrollTop = 0
    }
 render() {
  return (
   <div>
    <div className="ContactUs">
     <div className="ContactUsMain">
      <TopTitle title="联系我们"/>
      <div>
       <p>
        <span className="show">12链微信公众号：12链网</span>
        <span className="show">新浪微博名称：12链网</span>
        <span className="show">市场合作：QQ3197347266</span>
        <span className="show">公司名称：祥云汇聚网络科技（北京）有限公司</span>
        <span className="show">在线客服: 4001009190</span>
        {/*<span className="show">400电话: 400-100-9190</span>*/}
       </p >
       <p>
       </p >
      </div>
     </div>
    </div>
   </div>
  )
 }
}