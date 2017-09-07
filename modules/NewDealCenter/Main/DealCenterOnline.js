import React from 'react'

export default class DealCenterOnline extends React.Component {
    render () {
        const { hash, theme } = this.props

        return (
            <div className="new-dealcenter-online fl">
                <iframe src={`https://plugin.bimao.com/12lian1/#12lian_${hash}-${theme}`} frameBorder="0" width="100%" height="100%"></iframe>
            </div>
        )
    }
}




