import React from 'react'
import {Link} from 'react-router'


export default class DealCenterFooter extends React.Component {

    render() {

        const {boxColor} = this.props.style
        const token = localStorage.getItem('token')
        const uid = localStorage.getItem('uid')

        return (
            <div className="dealcenter-footer" style={{backgroundColor: `${boxColor}`}}>
                <ul className="clearfix fl">
                    <li>
                        <Link to="/aboutus">关于我们</Link>
                        <span>|</span>
                    </li>
                    <li>
                        <Link to="/contactus">联系我们</Link>
                        <span>|</span>
                    </li>
                    <li>
                        <Link to="/legalnotice">法律声明与风险提示</Link>
                        <span>|</span>
                    </li>
                    <li>
                        <Link to={token && uid ? "/personal/faq" : "/login"}>常见问题</Link>
                    </li>
                </ul>
                <p>数字货币交易有风险，投资需谨慎！</p>
                <div className="fr">
                    <span>Copyright &copy;
                        2017, 12lian 祥云汇聚网络科技 (北京) 有限公司</span>
                    &nbsp; | &nbsp;
                    <span>
                        <a href="http://www.miitbeian.gov.cn/" target="_blank">京ICP备17020871号</a>&nbsp;
                            祥云汇聚网络科技 (北京) 有限公司
                    </span>
                </div>
            </div>
        )
    }
}
