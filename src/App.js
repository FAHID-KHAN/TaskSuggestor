import './App.css';
import React from 'react'
import TaskMain from './components/TaskMain'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import axios from 'axios'
import NavBar from './components/NavBar';
import Layout from './components/Layout';
import WeatherCard from './components/WeatherCard';
import ThingsToDo from './components/ThingsToDo';

export default class App extends React.Component {

   constructor(props) {
        super(props)
    
        this.state = {
             temp : '',
             tempDescription: '',
             location: "Tampere, FI",
             city: 'Tampere',
             cityEntry: '',
             placeSuggestions: [],
             newTask : ''
             
        }
    }

    componentDidMount() {
      let getWeather = `http://api.openweathermap.org/data/2.5/weather?q=tampere&units=metric&APPID=494b089ffcd713248e6d62d7d91d25fe`
      let getPlaceSuggestions = `/maps/api/place/textsearch/json?query=things-to-see-${this.state.city}&key=AIzaSyBlaR5cFmeCl98AF_eLTzgavMo70hLQeds`
      axios.all([
        axios.get(getWeather),
        axios.get(getPlaceSuggestions),
      ])
      .then(axios.spread((weather, places) => {
        this.setState({

          temp: weather.data.main.temp,
          tempDescription: weather.data.weather[0].description,
          location: `${weather.data.name}, ${weather.data.sys.country}`,
          placeSuggestions: places.data.results
          
        }
        );
      }))
  }

  addToList = (task) => {
    this.setState({newTask: task})
  }



  render() {

    const changeLocation = (e) => {
      e.preventDefault();
      
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityEntry}&units=metric&APPID=494b089ffcd713248e6d62d7d91d25fe`)
      .then(res => {
          this.setState(
              {
                  temp: res.data.main.temp,
                  tempDescription: res.data.weather[0].description,
                  location: `${res.data.name}, ${res.data.sys.country}`,
                  city: res.data.name
              });
          
      })

      axios.get(`/maps/api/place/textsearch/json?query=things-to-see-${this.state.cityEntry}&key=AIzaSyBlaR5cFmeCl98AF_eLTzgavMo70hLQeds`)
    .then(res => 
      this.setState({placeSuggestions: res.data.results})
      )

  }


  return (
    <Layout>
      <NavBar/>
    <Container >
      <Row>
        <Col>
      <WeatherCard 
      temp = {this.state.temp}
      tempDescription = {this.state.tempDescription}
      location = {this.state.location}
      city = {this.state.city} 
      />
      <div style = {{paddingTop: "20px"}}>  
  <Form inline onSubmit = {changeLocation}>
  <Form.Label htmlFor="inlineFormInputName2" srOnly>
    Name
  </Form.Label>
  <Form.Control
    className="mb-2 mr-sm-2"
    id="inlineFormInputName2"
    placeholder="Tampere" onChange = {(e) => this.setState({cityEntry: e.target.value})}
  />

<Button type="submit" className="mb-2">
  Change Location
  </Button>
  </Form>
  
  </div>
      </Col>
      <Col>
    <TaskMain newTask = {this.state.newTask}/> 
    </Col>
    </Row>
    <ThingsToDo
    location = {this.state.location}
    city = {this.state.city}
    placeSuggestions = {this.state.placeSuggestions}
    addTask = {this.addToList}

    />
    </Container>
    </Layout>
    
  );
}

}


