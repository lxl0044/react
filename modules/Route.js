import React from 'react';
import {render} from 'react-dom';
import {message} from 'antd'
import {Router, Route, browserHistory, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {syncHistoryWithStore, routerMiddleware, push} from 'react-router-redux'
import reducer from './Redux/Reducer'
import thunk from 'redux-thunk'
import Index from './Home/Index'
import Home from './Home/Home'
import Register from './Common/Register'
import Information from './Information/Information'
import InformationMain from './Information/InformationMain'
import Announcement from './Information/AnnouncementList'
import AnnouncementPreview from './Information/AnnouncementPreview'
import Message from './Information/Message'
import DealCenter from './DealCenter/DealCenter'
import SecurityCenter from './SecurityCenter/SecurityCenter'
import SecurityCenterMain from './SecurityCenter/SecurityCenterMain/SecurityCenterMain';
import SecurityCenterCertification from './SecurityCenter/Certification/SecurityCenterCertification';
import SecurityCenterFaq from './SecurityCenter/FAQ/SecurityCenterFaq';
import PropertyDetails from './SecurityCenter/PropertyDetails/PropertyDetails';
import PayCoin from './SecurityCenter/PayCoin/PayCoin';
import WithDrawCoin from './SecurityCenter/WithDrawCoin/WithDrawCoin';
import SecurityCenterFeedback from './SecurityCenter/FeedBack/SecurityCenterFeedback';
import SecurityCenterInform from './SecurityCenter/Notice/SecurityCenterInform';
import PersonalInformation from './SecurityCenter/UserInfo/PersonalInformation';
import Integral from './SecurityCenter/Integral/MyIntegral';
import SecurityCenterWithdraw from './SecurityCenter/WithDraw/SecurityCenterWithdraw';
import SecurityCenterPay from './SecurityCenter/Pay/SecurityCenterPay';
import FeedbackLook from './SecurityCenter/FeedBack/FeedbackLook';
import ResetPwd1 from './ResetPwd/ResetPwd1';
import ResetPwd2 from './ResetPwd/ResetPwd2';
import ResetPwd3 from './ResetPwd/ResetPwd3';
import ResetPwd4 from './ResetPwd/ResetPwd4';
import Login from './Common/Login';
import AboutUs from './Common/AboutUs';
import Agreement from './Common/Agreement';
import ContactUs from './Common/ContactUs';
import RateExplain from './Common/RateExplain';
import LegalNotice from './Common/LegalNotice';
import Delegation from './Delegation/Delegation';
import axios from 'axios';
import qs from 'qs'
import {Host} from './host';
import NotFound from "./404/NotFound";

require('normalize.css');
require('../css/common.css');
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('babel-polyfill');

axios.defaults.baseURL = Host;

const middleware = routerMiddleware(browserHistory)

const store = createStore(
    reducer,
    applyMiddleware(middleware),
    applyMiddleware(thunk)
)
const history = syncHistoryWithStore(browserHistory, store)

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    const uid = localStorage.getItem('uid')
    if(!token && !uid) return config
    if (config.method === 'post') {
        let data = qs.parse(config.data)

        config.data = qs.stringify({
            ...data,
            token: token,
            uid: uid
        })
    } else if (config.method === 'get' || config.method === 'delete') {
        config.params = {
            ...config.params,
            token: token,
            uid: uid
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})

let preTime = +new Date()
axios.interceptors.response.use(function (res) {
    let status = res.data.status
    if (status == 9999) {
        let nowTime = +new Date()
        localStorage.removeItem('token')
        localStorage.removeItem('uid')
        if (nowTime - preTime > 600000) {
            preTime = nowTime
            message.error('登录超时，请重新登录')
        }
        store.dispatch(push('/login'))
    }
    return res
})

const enterHome = () => {
    sessionStorage.setItem('isHome', 1)
}

const leaveHome = () => {
    sessionStorage.removeItem('isHome')
}

const enterCheck = () => {
    const token = localStorage.getItem('token')
    const uid = localStorage.getItem('uid')
    if(!token && !uid) {
        store.dispatch(push('/login'))
    }
}


const route = (
    <Router history={history}>
        <Route path="/" component={Home}>
            <IndexRedirect from='/' to='home'/>
            <Route path="home" component={Index} onEnter={enterHome} onLeave={leaveHome}/>
            <Route path="login" component={Login}/>
            <Route path="register" component={Register}/>
            <Route path="resetpwd1" component={ResetPwd1}/>
            <Route path="resetpwd2" component={ResetPwd2}/>
            <Route path="resetpwd3" component={ResetPwd3}/>
            <Route path="resetpwd4" component={ResetPwd4}/>
            <Route path="information" component={Information}>
                <IndexRoute component={InformationMain}/>
                <Route path="/information/preview/:newsid" component={Message}/>
                <Route path="/information/announcement" component={Announcement}/>
                <Route path="/announce/preview/:announceId" component={AnnouncementPreview}/>
            </Route>
            <Route path="dealcenter" component={DealCenter}/>
            <Route path="personal" component={SecurityCenter} onEnter={enterCheck}>
                <IndexRoute component={PersonalInformation}/>
                <Route path="/personal/personalinformation" component={PersonalInformation}/>
                <Route path="/personal/settings" component={SecurityCenterMain}/>
                <Route path="/personal/certification" component={SecurityCenterCertification}/>
                <Route path="/personal/faq" component={SecurityCenterFaq}/>
                <Route path="/personal/propertydetails" component={PropertyDetails}/>
                <Route path="/personal/paycoin" component={PayCoin}/>
                <Route path="/personal/withdrawcoin" component={WithDrawCoin}/>
                <Route path="/personal/feedback" component={SecurityCenterFeedback}/>
                <Route path="/personal/securitycenterwithdraw" component={SecurityCenterWithdraw}/>
                <Route path="/personal/securitycenterpay" component={SecurityCenterPay}/>
                <Route path="/personal/feedback/preview/:id" component={FeedbackLook}/>
                <Route path="/personal/notification" component={SecurityCenterInform}/>
                <Route path="/personal/integral" component={Integral}/>
            </Route>
            <Route path="delegation" component={Delegation} onEnter={enterCheck}/>
            <Route path="aboutus" component={AboutUs}/>
            <Route path="contactus" component={ContactUs}/>
            <Route path="legalnotice" component={LegalNotice}/>
            <Route path="agreement" component={Agreement}/>
            <Route path="rateexplain" component={RateExplain}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
)

render(
    <Provider store={store}>
        {route}
    </Provider>
    , document.getElementById('app')
)