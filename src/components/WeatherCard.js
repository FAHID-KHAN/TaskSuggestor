import React, { Component } from 'react'


export default class WeatherCard extends Component {

    render() {
        const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };
        const Today = new Date().toLocaleString("default", { weekday: "long" })
        const date = new Date().toLocaleDateString("en-US", dateFormat)

        return (
            <React.Fragment>

<h4 style = {{color:"white", paddingTop: "20px", paddingBottom: "20px"}}> Hello Visitor, Welcome To {this.props.city}!</h4>
            <div className="weathercontainer">
  <div className="weather-side">
    <div className="weather-gradient" />
    <div className="date-container">
      <h2 className="date-dayname">{Today}</h2><span className="date-day">{date}</span><span className="location">{this.props.location}</span>
    </div>
    <div className="weather-container"><i className="weather-icon" data-feather="sun" />
      <h1 className="weather-temp">{this.props.temp}°C</h1>
      <h3 className="weather-desc">{this.props.tempDescription}</h3>
    </div>

  </div>
  
  

</div>

</React.Fragment>

        )
    }
}
