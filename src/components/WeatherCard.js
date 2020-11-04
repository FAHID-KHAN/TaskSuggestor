import React, { Component } from 'react'
import axios from 'axios'

export default class WeatherCard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             temp : null,
             tempDescription: null,
             location: "Tampere, FI"
        }
    }
    
        componentDidMount() {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&units=metric&APPID=494b089ffcd713248e6d62d7d91d25fe`)
            .then(res => {
                this.setState(
                    {
                        temp: res.data.main.temp,
                        tempDescription: res.data.weather[0].description,
                        location: `${res.data.name}, ${res.data.sys.country}`
                    });
                
            })
        }

    render() {
        const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };
        const Today = new Date().toLocaleString("default", { weekday: "long" })
        const date = new Date().toLocaleDateString("en-US", dateFormat)
        return (
            <div className="weathercontainer">
  <div className="weather-side">
    <div className="weather-gradient" />
    <div className="date-container">
      <h2 className="date-dayname">{Today}</h2><span className="date-day">{date}</span><span className="location">{this.state.location}</span>
    </div>
    <div className="weather-container"><i className="weather-icon" data-feather="sun" />
      <h1 className="weather-temp">{this.state.temp}°C</h1>
      <h3 className="weather-desc">{this.state.tempDescription}</h3>
    </div>

  </div>

</div>

        )
    }
}
