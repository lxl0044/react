export const hasClass = (el, cls) => {
    return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

export const removeClass = function (el, cls) {
    if (hasClass(el, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
    }
}

export const addClass = function (el, cls) {
    if (!hasClass(el, cls)) el.className += " " + cls
}
export const addMarketClass = function (el, cls) {
    if (!hasClass(el, cls)) el.className += cls
}

export const toggleClass = (el, cls) => {
    if (hasClass(el, cls)) {
        removeClass(el, cls)
    } else {
        addClass(el, cls)
    }
}

export const siblings = function (elem) {
    var nodes = []
    var previ = elem.previousSibling
    while (previ) {
        if (previ.nodeType === 1) {
            nodes.push(previ)
        }
        previ = previ.previousSibling
    }
    nodes.reverse()
    var nexts = elem.nextSibling
    while (nexts) {
        if (nexts.nodeType === 1) {
            nodes.push(nexts)
        }
        nexts = nexts.nextSibling
    }
    return nodes
}

/*处理时间格式
有四种时间格式
1 Y-M-D，年-月-日
2 Y/M/D，年/月/日
3 Y-M-D H:M:S:0 年-月-日 时00:分00:秒00
4 Y-M-D H:M:S:1 年-月-日 时23:分59:秒59
*/
export const getDate = function (time) {

    let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = "00",
        f = "00",
        s = "00",
        h1 = "23",
        f1 = "59",
        s1 = "59",
        nowDay = null;
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    switch (time != null) {
        case "Y-M-D" == time:
            nowDay = y + '-' + m + '-' + d
            break;
        case "Y/M/D" == time:
            nowDay = y + '/' + m + '/' + d
            break;
        case "Y-M-D H:M:S:0" == time:
            nowDay = y + '-' + m + '-' + d + " " + h + ":" + f + ":" + s;
            break;
        case "Y-M-D H:M:S:1" == time:
            nowDay = y + '-' + m + '-' + d + " " + h1 + ":" + f1 + ":" + s1;
            break;
    }
    return nowDay
}
/*
处理时间，接受一个参数，参数从0开始
返回值：当前时间的第n天
*/
export const getBeforeDate = function (n) {
    let num = n || 0,
        d = new Date(),
        year = d.getFullYear(),
        mon = d.getMonth() + 1,
        day = d.getDate(),
        s = null;
    if (day <= num) {
        if (mon > 1) {
            mon = mon - 1;
        }
        else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - num);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
}


/**
 *
 * @param price 需要被格式化的数值 10.0000
 * @param number 需要保留的小数点位数
 */
function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

export const formatNumber = function (number, num) {
    if(number === '敬请期待') return '敬请期待'
    if(!number) return '0.00'
    let index = parseInt(num);
    if (/\./.test(`${number}`)) {
        let arr = `${number}`.split('.'), result = toThousands(arr[0])
        if (arr[1].length >= index) {
            return number = `${result}.` + `${arr[1]}`.slice(0, index)
        }

        let prics = arr[1]
        for (let i = 0; i < index - arr[1].length; i++) {
            prics += '0'
        }
        return number = `${result}.${prics}`
    }
    let result = toThousands(number)
    number = `${result}.`
    for (let j = 0; j < index; j++) {
        number += '0'
    }
    return number
}

export const initNumber = function (number, num) {
    if(number === '敬请期待') return '敬请期待'
    if(!number) return '0.00'
    let index = parseInt(num);
    if (/\./.test(`${number}`)) {
        let arr = `${number}`.split('.')
        if (arr[1].length >= index) {
            return number = `${arr[0]}.` + `${arr[1]}`.slice(0, index)
        }

        let prics = arr[1]
        for (let i = 0; i < index - arr[1].length; i++) {
            prics += '0'
        }
        return number = `${arr[0]}.${prics}`
    }

    number = `${number}.`
    for (let j = 0; j < index; j++) {
        number += '0'
    }
    return number
}

/**
 *
 * @param time 时间戳
 * @param str 格式化类型 -> 'YYYY-MM-DD'
 * @returns {string} 格式化的事件
 */
export const formatDate = function (time, str) {
    if(!time) return
    let N,M,D,h,m,s,date;
    let dateFormat = time.split('-').join('/')
    N = new Date(dateFormat).getFullYear()
    M = new Date(dateFormat).getMonth() + 1
    D = new Date(dateFormat).getDay()
    h = new Date(dateFormat).getHours()
    m = new Date(dateFormat).getMinutes()
    s = new Date(dateFormat).getSeconds()
    switch (str) {
        case 'YYYY-MM-DD':
            return date = `${N}-${M >= 10 ? M : '0' + M}-${D >= 10 ? D : '0' + D}`
        case 'YYYY-MM-DD hh-mm-ss':
            return date = `${N}-${M >= 10 ? M : '0' + M}-${D >= 10 ? D : '0' + D} ${h >= 10 ? h : '0' + h}:${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`
    }
}














