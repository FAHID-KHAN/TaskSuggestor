import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div style = {{marginTop: "100px", padding: "50px", textAlign: "center"}}>
                <p style = {{ color: "white", fontSize: "13px"}}> 
                Copyright © 2020, All rights reserved. Made in Tampere, Finland for Final Assignment Project at Tampere University of Applied  Sciences. <br/>
                The photos in this site are fetched from Google Places API and are the properties of Google/Photographers. <br/>
                Authors: <a href= 'https://github.com/almoyen'>@almoyen</a> and <a href='https://github.com/FAHID-KHAN'>@FAHID-KHAN</a></p>
                
            </div>
        )
    }
}
