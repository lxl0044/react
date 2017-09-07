import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import homePage from './CommonReducer'
import CertificationInfo from './CertificationReducer'
import userInfoDetails from './SecurityCenterReducer'
import Pay from './PayReducer'
import WithDraw from './WithDrawReducer'
import dealCenter from './DealCenterReducer'
import delegation from './DelegationReducer'
import dealcenterRealtime from './DealCenterForRealTimeReducer'
import PropertyDetails from './PropertyDetailsReducer'
import PayCoin from './PayCoinReducer'
import WithDrawCoin from './WithDrawCoinReducer'
import CurrencyIntroduce from './CurrencyIntroduceReducer'
import InstationTrunCoinInfo from './InstationTrunCoinReducer'
import Intro from './CoinIntroduceReducer'


const reducer = combineReducers({
		CertificationInfo,
		homePage,
		userInfoDetails,
		Pay,
    	WithDraw,
    	dealCenter,
    	dealcenterRealtime,
    	delegation,
    	PropertyDetails,
    	PayCoin,
    	WithDrawCoin,
    	CurrencyIntroduce,
    	InstationTrunCoinInfo,
    	Intro,
		routing
	})

export default reducer