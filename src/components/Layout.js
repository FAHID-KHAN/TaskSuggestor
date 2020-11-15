import React, { Component } from 'react'
import Footer from './Footer';

export default class Layout extends Component {
    render() {
        return (
            <div style = {{backgroundColor: "#0a1f44"}}>

            {this.props.children}

            <Footer/>
                
            </div>
        )
    }
}
