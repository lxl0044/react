import React from 'react';
import { Link } from 'react-router'
import { Steps, Icon } from 'antd'
import './tips.css'
const Step = Steps.Step


export default class Tips extends React.Component {
	
	state = {
		scroll: true
	}

	spreadHandler =  () => {
		let box = this.refs.box
		
		if(this.state.scroll) {
			box.style.height = 220 + 'px'
		} else {
			box.style.height = 0
		}
		
		this.setState({
			scroll: !this.state.scroll
		})
	}

	render () {
		
		let { scroll } = this.state

		return (
			<div className="dealcenter-warp">
				<div className="dealcenter-top">
					<div className="dealcenter-top-box" ref="box">
						<div className="dealcenter-tips text-center">
							<span className="warn">TIPS</span>
							<span>进行交易前您需要进行</span><Link to="/personal/securitycenterpay">充值</Link>
						</div>
						<div className="steps">
							<Steps>
								<Step title="注册" status="process"/>
								<Step title="实名认证" status="process"/>
								<Step title="充值" status="process"/>
								<Step title="设置资金密码" status="process"/>
								<Step title="交易" status="process"/>
							</Steps>
						</div>
					</div>
					<div className="arrow-top text-center" ref="arrow">
                        {scroll ?
							<Icon type="down" onClick={this.spreadHandler}/> :
							<Icon type="up" onClick={this.spreadHandler}/>}
					</div>
				</div>
			</div>
		)
	}
}