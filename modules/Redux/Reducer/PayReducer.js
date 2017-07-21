import moment from 'moment'
import { getBeforeDate } from '../../../tools/utils'
const dateFormat = 'YYYY-MM-DD';


const init = {
	userInfo: {
		uname: '',
		name: '',
		phone: ''
	},
	payWeiChat: {
		show: true,
		img: 'img_holder.png',
   		payMoney:'',
   		orderNumber:''
	},
	weiChatInfo: {
        closeBox: true,
        payStatus: '',
        actual_amount:''
	},
	payAlipay: {
        show: true,
        img: 'img_holder.png',
        payMoney:'',
        orderNumber:''
    },
    alipayInfo: {
        closeBox: true,
        payStatus: '',
        actual_amount:''
    },
    cardInfo: {
    	number: '',
        cardId: '',
        cardList: [],
        isIconShow: ''
    },
    bankTypeList: {
		value: '',
		options: [{
			bankCenterName:"",
			bankUuid:""
		}]
    },
	coinInfo: {
		img: 'img_holder.png',
        address: ''
	},
    rechargeCNYList: {
		lists: [],
		total: 0,
		startTime: moment(getBeforeDate(1), dateFormat),
		endTime: moment(getBeforeDate(), dateFormat),
        rechargeType: 1,
        status: 2
	},
    companyInfo: {
        companyName: '',
        companyBank: '',
        companyBankCardNo: '',
        companyNote: '',
        companyAmount: '',
        companyBankTypeName: '',
        companyBankUrl: '',
        bankCenterName: '',
        show: true
	},
	saveCardInfo: {
    	display: true,
        showCardStatus: true,
        msg: ''
	},
    authConfig: {
        random: '',
        authConfig: {
        	amountHighLimit: '',
        	 amountLowLimit: ''
        }
    }
}

const Pay = (state = init, action) => {
	switch(action.type) {
		case 'USERINFO_IN_PAY':
			return {
				...state,
				userInfo: action.userInfo
			}
		//--------微信支付------------//
		case 'PAY_FOR_WEICHAT_INFO':
			return {
				...state,
				payWeiChat: action.payWeiChat
			}
		case 'WEICHAT_CALLBACK_INFO':
			return {
                ...state,
                weiChatInfo: action.weiChatInfo
			}
		case 'PAY_WEICHAT_CALLBACK_STATUS':
			return {
				...state,
                weiChatInfo: {
                    closeBox: true
				},
                payWeiChat: {
					show: true
				}
			}
		case 'CANCEL_PAY_WEICHAT_STATUS':
        return {
        	...state,
        	payWeiChat: {
                show: true
            }
        }
		//-------支付宝支付--------------//
		case 'PAY_FOR_ALIPAY_INFO':
			return {
				...state,
                payAlipay: action.payAlipay
			}
        case 'ALIPAY_CALLBACK_INFO':
            return {
                ...state,
                alipayInfo: action.alipayInfo
            }
        case 'PAY_ALIPAY_CALLBACK_STATUS':
            return {
                ...state,
                alipayInfo: {
                    closeBox: true
                },
                payAlipay: {
                    show: true
                }
            }
        case 'CANCEL_PAY_ALIPAY_STATUS':
        return {
        	...state,
        	payAlipay: {
                show: true
            }
        }
        //-------银行卡支付--------------//
		case 'GET_BANK_CARD_LIST':
			return {
				...state,
				cardInfo: action.cardInfo
			}
		case 'GET_BANK_TYPE_LIST':
			return {
				...state,
				bankTypeList: {
					options: action.options
				}
			}
		case 'ADD_BANK_STATUS':
			return {
				...state,
				saveCardInfo: action.saveCardInfo
			}
		case 'SHOW_ADD_BACKCARD':
			return {
				...state,
				saveCardInfo: {
        			showCardStatus: true,
					display: false
				}
			}
		case 'HIDE_ADD_BACKCARD':
			return {
				...state,
				saveCardInfo: {
        			showCardStatus: true,
					display: true
				}
			}
        //-------币种地址及二维码------------//
		case 'CURRENT_COIN_INFO':
			return {
				...state,
                coinInfo: action.coinInfo
			}
        //-------充值记录------------//
		case 'RECHARGE_RECORD_LIST':
			return {
				...state,
                rechargeCNYList: action.rechargeCNYList
			}
			//----------公司银行信息-----------//
		case 'COMPANY_BANK_INFO':
			return {
				...state,
				companyInfo: action.companyInfo
			}
		case 'CLOSE_TRANSFER_BOX':
			document.body.style.overflow = 'auto'
			return {
                ...state,
                companyInfo: {
                	show: true
				}
			}
		// 查询用户权限配置
        case 'GET_AUTH_CONFIG':
            return {
                ...state,
                authConfig: action.authConfig
            }
		default:
			return state
	}
}

export default Pay