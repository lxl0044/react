// 交易中心 出k线图
let init = {
    cates: {
        current: {
            currentAmount: 0,
            changeRate: 0,
            highPrice: 0,
            lowPrice: 0,
            volume: 0,
            icoUrl: 'img_holder.png',
            currencyName: '',
            currencyNameEn: 'DLC',
            currencyId: '2',
            coinFee: 0,
            entrustPriceMin: 0,
            entrustPriceMax: 0,
            amountLowLimit: 0,
            amountHighLimit: 0,
            pointPrice: 2,
            pointNum: 4,
            buyFee:0,
            sellFee:0
        },
        others: []
    },
    chart: [],
    lists: [],
    info: {
        currentAmount: 0,
        changeRate: 0,
        highPrice: 0,
        lowPrice: 0,
        volume: 0,
        amount: 0,
        positionCount:0,
        positionSum:0,
        avgPosition:0
    },
    homeCharts:[],
    detailsBuy: {
        type: 1,
        records: []
    },
    detailsSell: {
        type: 2,
        records: []
    },
    oldBuyRocords: {
        type: 1,
        records: []
    },
    oldSellRocords: {
        type: 2,
        records: []
    },
    sellFinish: false,
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
    visible: false,
    hash: sessionStorage.getItem('currencyNameEn') ? sessionStorage.getItem('currencyNameEn').toLocaleLowerCase() : 'dlc',
    buyPrice: 0,
    sellPrice: 0,
    dealBuyPrice:{
        type:1,
        price:""
    },
    dealSellPrice:{
        type:2,
        price:""
    },
    style: chooseTheme(),
    theme: sessionStorage.getItem('theme') ? sessionStorage.getItem('theme') : 'dark',
    realTimeMartketIcon:{
        text:"蝶链币/DLC",
        src:"https://source.12lian.com/12ct_logo_small.png",
        currencyId:2
    }
}

let chart = [], detailsBuy, detailsSell,oldBuyRocords,oldSellRocords, tradingData = [], homeCharts

function chooseTheme () {
    let theme = sessionStorage.getItem('theme') || 'dark'
    if(theme === 'dark') {
        return {
            color: '#e5e5e5',
            bgc: '#202226',
            boxColor: '#282b30',
            boxTopColor: '#36393f',
            activeColor: '#fff',
            borderColor: '#414141'
        }
    }
    return {
        color: '#333',
        bgc: '#ededed',
        boxColor: '#fcfcfc',
        boxTopColor: '#f7f7f7',
        activeColor: '#da161a',
        borderColor: '#e5e5e5'
    }
}

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
                oldBuyRocords = next
                break
            case 4:
                oldSellRocords = next
                break
        }
        return next
    } else {
        switch (pre) {// 第二次，一次只推一条数据；追加到前一次的数据中并返回追加后的数据
            case 0:
                if(chart.length >= 200) {
                    chart.shift()
                    chart = chart.concat(next)
                }
                return chart
                // return chart = chart.concat(next)
            case 1:
                return detailsBuy = detailsBuy.concat(next)
            case 2:
                return detailsSell = detailsSell.concat(next)
            case 3:
                return oldBuyRocords = oldBuyRocords.concat(next)
            case 4:
                return oldSellRocords = oldSellRocords.concat(next)
        }
    }
}

let trade = '2'
function increaseTrading(next) {
    if(trade !== next.coinId) {
        trade = next.coinId
        tradingData = next.data.concat([])
    } else {
        tradingData = next.data.concat(tradingData)
    }

    if(tradingData.length > 100) {
        tradingData = tradingData.slice(0, 100)
    }

    return tradingData
}


// 更新首页多币种行情数据
function increaseHomeData (data) {
    if(data.type === 1) {
        homeCharts = data.attachment
    } else {
        let coinCode = data.attachment.coinCode
        homeCharts.forEach((item, index) => {
            item.update = false
            if(item.coinCode === coinCode) {
                homeCharts[index] = data.attachment
                homeCharts[index].update = true
            }
        })
    }
    return JSON.parse(JSON.stringify(homeCharts))
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
        case 'CLEAR_PERSONAL_ACCOUNT':
            return {
                ...real,
                personalAccount: {
                    rmbBalance: 0,
                    coinBalance: 0
                }
            }
        // 首页 coin/coins
        case 'REAL_TIME_CATES':
            return {
                ...real,
                lists: action.lists
            }
        // ------------ 右侧cates ----------------//
        case 'DEAL_CENTER_CATES':
            return {
                ...real,
                cates: action.cates
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
        case 'HOME_REAL_TIME_CHARTS_RETURN':
            return {
                ...real,
                homeCharts: increaseHomeData(action.homeRealTimeCharts)
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
        case 'LASTEST_TRADING_BUY_PRICE':
            return {
                ...real,
                buyPrice: action.buyPrice
            }
        case 'LASTEST_TRADING_SELL_PRICE':
            return {
                ...real,
                sellPrice: action.sellPrice
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
        //    旧版交易中心数据
        case 'BUY_DETAILS_FOR_OLD_DEALCENTER':
            return {
                ...real,
                oldBuyRocords: increaseData(3, action.oldBuyRocords)
            }
        case 'SELL_DETAILS_FOR_OLD_DEALCENTER':
            return {
                ...real,
                oldSellRocords: increaseData(4, action.oldSellRocords)
            }
        case 'LASTEST_TRANDING_DATA':
            return {
                ...real,
                tradingData: increaseTrading(action.tradingData)
            }
        case 'INIT_TRADING_DATA':
            return {
                ...real,
                tradingData: function () {
                    tradingData = []
                    return []
                }()
            }
        case 'SELL_PRICE_INIT_FINISH':
            return {
                ...real,
                sellFinish: true
            }
        case 'RESET_TRADING_STACK':
            return {
                ...real,
                sellFinish: false
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
        // --------------------交易中心切换iframe--------------//
        case 'INITIAL_CURRENT_INFO':
            return {
                ...real,
                hash: action.hash
            }
        case 'CHANGE_IFRAME_HASH':
            return {
                ...real,
                hash: action.hash
            }
        // ------------------点击委托单的时候把价格带过去 ------//
        case 'GET_DEAL_CENTER_ITEM_BUY_PRICE':
            return {
                ...real,
                dealBuyPrice: action.dealBuyPrice
            }
        case 'GET_DEAL_CENTER_ITEM_SELL_PRICE':
            return {
                ...real,
                dealSellPrice: action.dealSellPrice
            }
        case 'CLEAR_INPUT_VALUE':
            return {
                ...real,
                dealBuyPrice: {
                    type: 1,
                    price: ''
                },
                dealSellPrice: {
                    type: 2,
                    price: ''
                }
            }
        case 'DEALCENTER_THEME_LIGHT':
            return {
                ...real,
                style: chooseTheme(),
                theme: action.theme
            }
        case 'DEALCENTER_THEME_DARK':
            return {
                ...real,
                style: chooseTheme(),
                theme: action.theme
            }
        case 'CHANGE_REAL_TIME_MARKET_ICON':
            return {
                ...real,
                realTimeMartketIcon: action.realTimeMartketIcon
            }
        default:
            return real
    }

}

export default dealcenterRealtime


