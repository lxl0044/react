import React from 'react';
import { connect } from 'react-redux'
import OnlineRightSide from './OnlineRightSide'
import OnlineFullPage from './OnlineFullPage'
import CateItem from './CateItem'
import { img } from '../../host'
import full from '../../../images/fullpage_btn.png'

class DealCenterOnline extends React.Component {

    state = {
        show: false
    }

    switchToFullpage = () => {
        const { show } = this.state
        if(show) {
            document.body.style.overflow = 'auto'
        } else {
            document.body.style.overflow = 'hidden'
        }
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const { show } = this.state
        const { hash } = this.props
        const {others} = this.props.cates

        let lists = others.map(function (item, index) {
            return <CateItem {...item} key={`cate${index}`} dispatch={this.props.dispatch}/>
        }.bind(this))

        return (
			<div className="dealcenter-online" style={{backgroundImage: `url(${img}charts_bg.png)`}}>
                <div className="dealcenter-nav">
                    <ul className="clearfix">
                        {lists}
                    </ul>
                </div>
				<div className="dealcenter-online-cont">
                    {/*<div className="toggle-fullpage" onClick={this.switchToFullpage}>*/}
                        {/*<img src={full} alt=""/>*/}
                        {/*全屏交易*/}
                    {/*</div>*/}
                    { show ?
                        <OnlineFullPage /> :
                        <div className="dealcenter-online-box clearfix">
                            <iframe src={`https://plugin.bimao.com/12lian2/#12lian_${hash}`}  frameBorder="0" width="854px" height="524px"></iframe>
                            <OnlineRightSide { ...this.props }/>
                        </div>
                    }
				</div>
			</div>
        )
    }
}

export default connect(state => {
    return {
        ...state.dealcenterRealtime,
        hash: state.dealcenterRealtime.hash
    }
})(DealCenterOnline)
