// Home
import React from 'react';
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import PageTool from '../Common/PageTool'
import Aside from '../Common/Aside/Aside'

export default class Home extends React.Component {
    
    render() {
        return (
            <div>
                <Header />
                <PageTool />
                {/*<Aside />*/}
                <div style={{minHeight: '580px'}}>{this.props.children}</div>
                <Footer />
            </div>
        )
    }
}
