const init = {
    klineRealTime: [
        [0,0,0,0,0]
    ],
    klineOne: [
        [0,0,0,0,0,0,0,0,0]
    ],
    klineFive: [
        [0,0,0,0,0,0,0,0,0]
    ],
    klineTen: [
        [0,0,0,0,0,0,0,0,0]
    ],
    klineThirty: [
        [0,0,0,0,0,0,0,0,0]
    ],
    klineHours: [
        [0,0,0,0,0,0,0,0,0]
    ],
    klineDay: [
        [0,0,0,0,0,0,0,0,0]
    ],
    status: false,
    index: 1
}

let klineRealTime = [], klineOne = [], klineFive = [], klineTen = [], klineThirty = [], klineHours = [], klineDay = []

/**
 *
 * @param pre 前一次数据
 * @param next 后一次数据
 * @returns {*} 返回新增数据
 */
function increaseData (pre, next) {
    if(next.length === 0) return next
    if(next.length !== 1) { // 第一次，一次性返回多条数据
        switch (pre) {
            case 0:
                klineRealTime = next
                break
            case 1:
                klineOne = next
                break
            case 2:
                klineFive = next
                break
            case 3:
                klineTen = next
                break
            case 4:
                klineThirty = next
                break
            case 5:
                klineHours = next
                break
            case 6:
                klineDay = next
                break
        }
        return next
    } else {
        switch (pre) {// 第二次，一次只推一条数据；追加到前一次的数据中并返回追加后的数据
            case 0:
                return klineRealTime = klineRealTime.concat(next)
            case 1:
                if(!klineOne.length) return
                if(next[0][0] === klineOne[klineOne.length - 1][0]) {
                    klineOne.pop()
                    return klineOne = klineOne.concat(next)
                }
                return klineOne = klineOne.concat(next)
            case 2:
                if(!klineFive.length) return
                if(next[0][0] === klineFive[klineFive.length - 1][0]) {
                    let del = klineFive.pop()
                    next[0][7] = del[7]
                    next[0][8] = del[8]
                    return klineFive = klineFive.concat(next)
                }
                return klineFive = klineFive.concat(next)
            case 3:
                if(!klineTen.length) return
                if(next[0][0] === klineTen[klineTen.length - 1][0]) {
                    let del = klineTen.pop()
                    next[0][7] = del[7]
                    next[0][8] = del[8]
                    return klineTen = klineTen.concat(next)
                }
                return klineTen = klineTen.concat(next)
            case 4:
                if(!klineThirty.length) return
                if(next[0][0] === klineThirty[klineThirty.length - 1][0]) {
                    let del = klineThirty.pop()
                    next[0][7] = del[7]
                    next[0][8] = del[8]
                    return klineThirty = klineThirty.concat(next)
                }
                return klineThirty = klineThirty.concat(next)
            case 5:
                if(!klineHours.length) return
                if(next[0][0] === klineHours[klineHours.length - 1][0]) {
                    let del = klineHours.pop()
                    next[0][7] = del[7]
                    next[0][8] = del[8]
                    return klineHours = klineHours.concat(next)
                }
                return klineHours = klineHours.concat(next)
            case 6:
                if(!klineDay.length){
                    let newArr = new Array(next[0])
                    return klineDay = newArr
                }
                if(next[0][0] === klineDay[klineDay.length - 1][0]) {
                    let del = klineDay.pop()
                    next[0][7] = del[7]
                    next[0][8] = del[8]
                    return klineDay = klineDay.concat(next)
                }
                return klineDay = klineDay.concat(next)
        }
    }
}

const dealCenter = (info = init, action) => {
    switch(action.type) {
        // --------------- kline ---------------//
        case 'DEAL_CENTER_KLINE_REALTIME':
            return {
                ...info,
                klineRealTime: increaseData(0, action.klineRealTime),
                status: action.status,
                index: action.index
            }
        case 'DEAL_CENTER_KLINE_ONE':
            return {
                ...info,
                klineOne: increaseData(1, action.klineOne),
                status: action.status,
                index: action.index
            }
        case 'DEAL_CENTER_KLINE_FIVE':
            return {
                ...info,
                klineFive: increaseData(2, action.klineFive),
                status: action.status,
                index: action.index
            }
        case 'DEAL_CENTER_KLINE_TEN':
            return {
                ...info,
                klineTen: increaseData(3, action.klineTen),
                status: action.status,
                index: action.index
            }
        case 'DEAL_CENTER_KLINE_THIRTY':
            return {
                ...info,
                klineThirty: increaseData(4, action.klineThirty),
                status: action.status,
                index: action.index
            }
        case 'DEAL_CENTER_KLINE_HOURS':
            return {
                ...info,
                klineHours: increaseData(5, action.klineHours),
                status: action.status,
                index: action.index
            }
        case 'DEAL_CENTER_KLINE_DAY':
            return {
                ...info,
                klineDay: increaseData(6, action.klineDay),
                status: action.status,
                index: action.index
            }
        case 'SHOW_DEALCENTER_LODING':
            return {
                ...info,
                status: false
            }
        default:
            return info
    }
}

export default dealCenter