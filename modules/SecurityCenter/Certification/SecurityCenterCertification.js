// SecurityCenterCertification 实名认证父盒子
import React from 'react';
import { connect } from 'react-redux'
import { requestCertificationInfo } from '../../Redux/Action/CertificationAction'
import TopTitle from '../../Common/TopTitle'
import CertificationContent from './CertificationContent'
import CertficationAideo from './CertficationAideo'
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class SecurityCenterCertification extends React.Component {

    callback = (key) => {
          // console.log(key);
    }

	componentDidMount() {
        const { dispatch } = this.props
        dispatch(requestCertificationInfo())
    }

    componentWillUnmount () {
        sessionStorage.removeItem("downLoad")
    }
    //这是第一层 在这里拿到用户等级，和等级对应的相应状态，传下去
	render() {
        const downLoad = sessionStorage.getItem('downLoad')
		return (
			<div className="certification fr">
				<TopTitle title="实名认证"/>
                <Tabs defaultActiveKey={!downLoad ? "1" : downLoad} onChange={this.callback}>
                    <TabPane tab="身份认证" key="1">
                        <div className="certification-box">
                            <CertificationContent { ...this.props } dispatch={ this.props.dispatch }/>
                        </div>
                    </TabPane>
                    <TabPane tab="视频认证(KYC3)" key="2">
                        <CertficationAideo { ...this.props }  dispatch={ this.props.dispatch }/>
                    </TabPane>
                </Tabs>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        ...state.CertificationInfo
    }
}


export default connect(mapStateToProps)(SecurityCenterCertification)
