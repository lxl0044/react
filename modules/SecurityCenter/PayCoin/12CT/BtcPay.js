import React from 'react';
import {getCurrentCionInfo} from '../../../Redux/Action/PayAction'

const base = 'data:image/png;base64,'
const style = {
    margin:"30px 0 0 110px"
}
export default class BtcPay extends React.Component {
    state = {
        show: true
    }

    //点击复制地址
    clkFunc() {
        let address = this.refs.address
        address.focus();
        address.setSelectionRange(0, address.value.length);
        document.execCommand("Copy", true)
    }

    // 点击放大二维码
    bigImg() {
        this.setState({
            show: false
        })
        document.body.style.overflow = 'hidden'
    }

    //点击缩小二维码
    smallImg() {
        this.setState({
            show: true
        })
        document.body.style.overflow = 'auto'
    }

    render() {
        const {img, address, msgCode} = this.props.coinInfo
        const {currencyId} = this.props

        return (
            <div className="btc_pay">
                <div className="btc_pay_box">
                    <p>这是您的<span>{this.props.currencyNameEn}</span>钱包地址，请将您的<span>{this.props.currencyNameEn}</span>转入此地址：
                    </p>
                </div>
                <div className="btc_pay_address">
                    <div><input className="text-center" type="text" ref="address" value={address}/></div>
                </div>
                { currencyId === 4 ?
                    <div>
                        <div className="btc_pay_copy">
                            <div className="text-center" onClick={this.clkFunc.bind(this)}>复制地址</div>
                        </div>
                        <div className="btc_pay_code">
                            <div>
                                {address ?
                                    <img src={base + img} onClick={this.bigImg.bind(this)}/> :
                                    <img src={`https://source.12lian.com/${img}`}/>
                                }
                            </div>
                        </div>
                        <div className="btc_pay_point">
                            <div className="text-center" onClick={this.bigImg.bind(this)}>点击放大二维码</div>
                        </div>
                    </div>
                    : null
                }
                <div className={this.state.show ? "btc_pay_wrap hide" : " show btc_pay_wrap"}
                     onClick={this.smallImg.bind(this)}>
                    <div className="btc_pay_wrap_code">
                        <div>
                            {address ?
                                <img className="show" src={base + img}/> :
                                <img src={`https://source.12lian.com/${img}`}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}