// 交易中心 出k线图
const init = {
    cates: {
        current: {
            currentAmount: 0,
            changeRate: 0,
            highPrice: 0,
            lowPrice: 0,
            volume: 0,
            icoUrl: 'img_holder.png',
            currencyName: '',
            currencyNameEn: '12CT',
            currencyId: '2',
            coinFee: 0,
            entrustPriceMin: 0,
            entrustPriceMax: 0,
            amountLowLimit: 0,
            amountHighLimit: 0
        },
        others: []
    },
    chart: [],
    info: {
        currentAmount: 0,
        changeRate: 0,
        highPrice: 0,
        lowPrice: 0,
        volume: 0,
        amount: 0
    },
    detailsBuy: {
        type: 1,
        records: []
    },
    detailsSell: {
        type: 2,
        records: []
    },
    tradingData: [],
    delegateRecord: {
        tradeFail: [],
        tradeSuccess: []
    },
    personalAccount: {
        rmbBalance: 0,
        coinBalance: 0
    },
    pwdStatus: "1",
    validDealPwd: true,
    hasDealPwd: true,
    visible: false
}

let chart = [], detailsBuy, detailsSell, tradingData


function increaseData (pre, next) {
    if(next.length === 0) return next
    if(next.length !== 1) { // 第一次，一次性返回多条数据
        switch (pre) {
            case 0:
                chart = next
                break
            case 1:
                detailsBuy = next
                break
            case 2:
                detailsSell = next
                break
            case 3:
                tradingData = next
                break
        }
        return next
    } else {
        switch (pre) {// 第二次，一次只推一条数据；追加到前一次的数据中并返回追加后的数据
            case 0:
                return chart = chart.concat(next)
            case 1:
                return detailsBuy = detailsBuy.concat(next)
            case 2:
                return detailsSell = detailsSell.concat(next)
            case 3:
                return tradingData = next.concat(tradingData)
        }
    }
}


const dealcenterRealtime = (real = init, action) => {
    switch (action.type) {
        case 'GET_PERSON_DEALPWD':
            return {
                ...real,
                hasDealPwd: action.status
            }
        case 'CLOSE_TIPS_BOX':
            return {
                ...real,
                hasDealPwd: true
            }
        // ------------ 右侧cates ----------------//
        case 'DEAL_CENTER_CATES':
            return {
                ...real,
                cates: action.cates,
                spread: action.spread
            }
        // --------------home charts------------- //
        case 'REAL_TIME_DETAILS':
            if(!action.info) {
                return {
                    ...real
                }
            } else {
                return {
                    ...real,
                    info: action.info
                }
            }
        case 'REAL_TIME_CHART_INFO':
            return {
                ...real,
                chart: increaseData(0, action.chart),
            }
        //----------------交易---------------//
        case 'TRADING_DELEGATE_RECORD':
            return {
                ...real,
                delegateRecord: action.delegateRecord
            }
        case 'REALTIME_PERSONAL_ACCOUNT':
            return {
                ...real,
                personalAccount: action.personalAccount
            }
        case 'PERSONAL_TRADING_PWD_STATUS':
            return {
                ...real,
                pwdStatus: action.pwdStatus
            }
        //---------------交易行情------------//
        case 'DEALCENTER_DELEGATE_DETAILS_BUY':
            return {
                ...real,
                detailsBuy: increaseData(1, action.detailsBuy)
            }
        case 'DEALCENTER_DELEGATE_DETAILS_SELL':
            return {
                ...real,
                detailsSell: increaseData(2, action.detailsSell)
            }
        case 'LASTEST_TRANDING_DATA':
            return {
                ...real,
                tradingData: increaseData(3, action.tradingData)
            }
        //---------------撤单输入交易密码-----------//
        case 'CLOSE_DELEGATE_PWD_BOX':
            return {
                ...real,
                visible: false
            }
        case 'OPEN_DELEGATE_PWD_BOX':
            return {
                ...real,
                visible: true
            }
        default:
            return real
    }

}

export default dealcenterRealtime


