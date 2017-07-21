// realtime config
export const HomeChartsOptions = (data) => {
    return {
        tooltip: {
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '1.5%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: data.time,
                min: 'dataMin',
                max: 'dataMax',
                splitNumber: 20,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 10,
                    textStyle: {
                        color: 'rgba(88, 105, 119, .5)',
                        fontSize: 12
                    },
                    margin: 26
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                position: 'right',
                axisLine: {
                    show: false
                },
                scale: true,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgba(88, 105, 119, .5)',
                        fontSize: 16
                    },
                    margin: 70
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
        ],
        series: [
            {
                name: '实时行情',
                type: 'line',
                symbol: 'none',
                areaStyle: {
                    normal: {
                        // color: {
                        //     type: 'linear',
                        //     x: 0,
                        //     y: 0,
                        //     x2: 0,
                        //     y2: 1,
                        //     colorStops: [{
                        //         offset: 0, color: '#d0413c' // 0% 处的颜色
                        //     }, {
                        //         offset: 1, color: '#e97b77' // 100% 处的颜色
                        //     }],
                        //     globalCoord: false // 缺省为 false
                        // },
                        color: '#e97b77',
                        opacity: '0.3'
                    }
                },
                lineStyle: {
                    normal: {
                        color: '#da161a'
                    }
                },
                data: data.current,
                markLine: {
                    data: [
                        {yAxis: Math.max.apply(Math, data.current), name: '最新成交价格'}
                    ]
                }
            }
        ]
    }
}

// kline config
export const KlineOptions = (data, type) => {
    let options = {
        title: {
            text: '12链',
            left: 0,
            top: '1%',
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'transparent'
                }
            },
            showContent: true,
            formatter: function (params) {
                let html
                if (!params) return
                switch (params.length) {
                    case 3:
                        html = `时间：${params[0].axisValue}<br/>
                        - 开：${params[0].data[1]}<br/>
                        - 收：${params[0].data[2]}<br/>
                        - 最低：${params[0].data[3]}<br/>
                        - 最高：${params[0].data[4]}<br/>
                        - 成交量：${params[0].data[5]}<br/>
                        - MA7：${params[1].data}<br/>
                        - MA30：${params[2].data}`
                        break
                    case 2:
                        html = `时间：${params[0].axisValue}<br/>
                                - 成交价：${params[0].data}<br/>
                                - 平均价：${params[1].data}`
                        break
                    case 1:
                        html = `时间：${params[0].axisValue}<br/>
                             成交量：${params[0].data}<br/>`
                        break
                }
                return html
            }
        },
        grid: [{
            left: '2%',
            right: '6%',
            height: '65%'
        }, {
            left: '2%',
            right: '6%',
            top: '83%',
            height: '15%'
        }],
        xAxis: [{
            type: 'category',
            data: data.times,
            scale: true,
            boundaryGap: true,
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#4c4c4c'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#777'
                }
            },
            axisTick: {
                alignWithLabel: true
            },
            splitLine: {
                show: false
            },
            splitNumber: 20,
            nameLocation: 'middle'
        }, {
            type: 'category',
            boundaryGap: true,
            gridIndex: 1,
            data: data.times,
            axisLabel: {
                show: false
            },
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            scale: true,
            position: 'right',
            splitArea: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dotted',
                    color: '#242424'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#4c4c4c'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#777'
                }
            }
        }, {
            gridIndex: 1,
            position: 'right',
            splitNumber: 4,
            scale: true,
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#777'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#4c4c4c'
                }
            }
        }],
        dataZoom: [{
            type: 'inside',
            xAxisIndex: [0, 1],
            // zoomLock: true, // 禁用缩放
            minSpan: 20,
            // start: 50,
            // end: 100
            startValue: data.times.length - 61,
            endValue: data.times.length - 1
        }, {
            show: false,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '85%',
            // start: 50,
            // end: 100
            startValue: data.times.length - 61,
            endValue: data.times.length - 1
        }],
        series: type === 0 ? realtimeForKline(data) : truthKline(data),
        backgroundColor: '#000',
        textStyle: {
            color: '#fff'
        }
    }

    return options
}

// 分时图
function realtimeForKline(data) {
    return [
        {
            name: '平均价',
            type: 'line',
            data: data.avgs,
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        }, {
            name: '当前价',
            type: 'line',
            data: data.datas,
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        }, {
            name: '成交量',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data.vols,
            itemStyle: {
                normal: {
                    color: function (params) {
                        var colorList;
                        if (params.data >= 0) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    },
                }
            }
        }]
}

// k线图
function truthKline(data) {
    let datas = data.datas
    return [{
        name: 'K线图',
        type: 'k',
        data: data.datas,
        itemStyle: {
            normal: {
                color: '#15893b',
                color0: '#bd0103',
                borderColor: '#15893b',
                borderColor0: '#bd0103'
            }
        },
        barMaxWidth: 12,
        markPoint: {
            symbol: 'path://M12,6.7H3.2v2.4L0,5.8l3.2-3.3V5H12V6.7z M6.4,0v12',
            symbolSize: 12,
            symbolOffset: ['50%', 0],
            silent: false,
            itemStyle: {
                normal: {
                    color: '#bbb'
                }
            },
            label: {
                normal: {
                    position: ['50%', 0],
                    textStyle: {
                        color: '#bbb',
                    }
                }
            },
            data: [{
                type: 'max',
                name: '最大值',
                valueDim: 'highest',
                label: {
                    normal: {
                        position: [12, -3]
                    }
                }
            }, {
                type: 'min',
                name: '最小值',
                valueDim: 'lowest',
                symbolOffset: ['50%', '50%'],
                label: {
                    normal: {
                        position: [12, -3]
                    }
                }
            }]
        },
        markArea: {
            silent: true,
            itemStyle: {
                normal: {
                    color: 'Honeydew'
                }
            },
        },
        markLine: {
            label: {
                normal: {
                    position: 'middle',
                    textStyle: {
                        color: 'Blue',
                        fontSize: 15
                    }
                }
            }
        }
    }, {
        name: 'MA7',
        type: 'line',
        data: data.ma7,
        smooth: true,
        lineStyle: {
            normal: {
                opacity: 0.5
            }
        }
    }, {
        name: 'MA30',
        type: 'line',
        data: data.ma30,
        smooth: true,
        lineStyle: {
            normal: {
                opacity: 0.5
            }
        }
    }, {
        name: 'Vols',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.vols,
        barMaxWidth: 12,
        itemStyle: {
            normal: {
                color: function (params) {
                    return chooseColor(params, datas)
                }
            }
        }
    },
        //     {
        //     name: 'MA7',
        //     type: 'line',
        //     xAxisIndex: 1,
        //     yAxisIndex: 1,
        //     data: data.ma7,
        //     itemStyle: {
        //         normal: {
        //             color: 'blue'
        //         }
        //     }
        // }, {
        //     name: 'MA30',
        //     type: 'line',
        //     xAxisIndex: 1,
        //     yAxisIndex: 1,
        //     data: data.ma30,
        //     itemStyle: {
        //         normal: {
        //             color: 'green'
        //         }
        //     }
        // }
    ]
}

function chooseColor(params, datas) {
    let index = params.dataIndex, colorList
    if (datas[index][2] - datas[index][1] >= 0) {
        return colorList = '#14b143'
    }
    return colorList = '#ef232a'
}

// function pushEmptyArr(arr) {
//     if (!arr instanceof Array) {
//         console.log('pushEmptyArr 必须接受一个数组')
//     }
//     if (arr.length > 60) return arr
//     while (arr.length < 60) {
//         arr.push([])
//     }
//     return arr
// }