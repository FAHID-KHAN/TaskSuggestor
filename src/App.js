import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import {Container, Row, Col, Form, Button, Card, Modal, ListGroup, ListGroupItem} from 'react-bootstrap'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import axios from 'axios'
import NavBar from './components/NavBar';
import Layout from './components/Layout';
import WeatherCard from './components/WeatherCard';
import ThingsToSee from './components/ThingsToSee';
import WhereToEat from './components/WhereToEat';

export let currentTasks = [];
export let archivedTasks = [];

export default class App extends React.Component {


   constructor(props) {
        super(props)
        this.formRef = React.createRef();

    
        this.state = {
             temp : '',
             tempDescription: '',
             location: "Tampere, FI",
             city: 'Tampere',
             cityEntry: '',
             placeSuggestions: [],
             restuarants: [],
             taskLists : [],
             taskName: '',
             showModal: false,
             currentTime: '',
             archivedTasksList: [],
             alarmKey : ''
             
           
        }
    }

    componentDidMount() {
      // Fetching Weather and Google Places Data
      let getWeather = `http://api.openweathermap.org/data/2.5/weather?q=tampere&units=metric&APPID=494b089ffcd713248e6d62d7d91d25fe`
      let getPlaceSuggestions = `/maps/api/place/textsearch/json?query=things-to-see-${this.state.city}&key=AIzaSyBlaR5cFmeCl98AF_eLTzgavMo70hLQeds`
      let getRestuarants = `/maps/api/place/textsearch/json?query=restuarants-in-${this.state.city}&key=AIzaSyBlaR5cFmeCl98AF_eLTzgavMo70hLQeds`
      axios.all([
        axios.get(getWeather),
        axios.get(getPlaceSuggestions),
        axios.get(getRestuarants)
      ])
      .then(axios.spread((weather, places, restuarant) => {
        this.setState({
          temp: weather.data.main.temp,
          tempDescription: weather.data.weather[0].description,
          location: `${weather.data.name}, ${weather.data.sys.country}`,
          placeSuggestions: places.data.results,
          restuarants: restuarant.data.results
          
        }
        );
      }))

      // Setting current time for the alarm clock
      this.clock = setInterval(
        () => this.setCurrentTime(),
        1000
      )
      this.interval = setInterval(
        () => this.checkAlarmClock(),
      1000)
      
  }


  componentWillUnmount(){
    
    //clearing the alarm clock

    clearInterval(this.clock);
    clearInterval(this.interval);
  }

  // setting the current time in standard format
  setCurrentTime(){
    this.setState({
      currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
    });
  }

 // alarm clock will be checked continously in the background
  checkAlarmClock(){
    this.state.taskLists.forEach(task => {
      if(task.alarmTime === 'undefined' || !task.alarmTime) {
        this.alarmMessage = "Please set your alarm.";
      } else {
        this.alarmMessage = "Your alarm is set for " + task.alarmTime + ".";
        if(this.state.currentTime === task.alarmTime) {
          alert(`It's time for the task: ${task.task}`);
          task.alarmTime = null;
        } else {
        }
      }  
    }) 
  }

// Method for adding a Place to visit in the To do list.
  addToList = (taskName) => {
    currentTasks.push({task: 'Visit ' + taskName, currentTime: '', alarmTime: '' })
    this.setState({taskLists: currentTasks})
    
  }

  // Method for adding a restuarant

  addRestuarantToList = (taskName) => {
    currentTasks.push({task: 'Eat at ' + taskName, currentTime: '', alarmTime: '' })
    this.setState({taskLists: currentTasks})
    
  }


  render() {

    // Function for changing location, data is fetched again everytime location changes.

    const changeLocation = (e) => {
      e.preventDefault();
      
      // Fetching New Weather Data
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

      // Fetching new Places data.

      axios.get(`/maps/api/place/textsearch/json?query=things-to-see-${this.state.cityEntry}&key=AIzaSyBlaR5cFmeCl98AF_eLTzgavMo70hLQeds`)
    .then(res => 
      this.setState({placeSuggestions: res.data.results})
      )

      // Fetching new Restuarants

      axios.get(`/maps/api/place/textsearch/json?query=restuarants-in-${this.state.cityEntry}&key=AIzaSyBlaR5cFmeCl98AF_eLTzgavMo70hLQeds`)
    .then(res => 
      this.setState({restuarants: res.data.results})
      )
  }

  // Function for setting alarm time and updating the state in the task list.
  const setAlarmTime = (event, key) => {
    event.preventDefault();
    const inputAlarmTimeModified = event.target.value + ':00'
    currentTasks[key].alarmTime = inputAlarmTimeModified
    this.setState({
    taskLists: currentTasks
    })

  }

 // Closing the Modal after alarm is set.

  const handleClose = () => this.setState({showModal: false});

  // Add new Task to do List

  const addTasks = (e) => {
      if (this.state.taskName === "") {
        alert("Task Name can not be empty!")
      }

      else {
        e.preventDefault()
        currentTasks.push({task: this.state.taskName, currentTime: '', alarmTime: '' })
        
        this.setState({taskLists: currentTasks})
        this.formRef.current.reset();
      }
        
    }

    // Remove a task from To do list
    const removeTask = (event, key) => {
      event.preventDefault()
        currentTasks.splice(key, 1)
        this.setState({taskLists: currentTasks})
    }

    // Remove from "Completed Tasks" archive.

    const removeTaskfromArchive = (key) => {
      archivedTasks.splice(key, 1)
      this.setState({archivedTasksList: archivedTasks})
  }

  // Function for what happens when a user drags an element
   const onDragEnd = result => {
    if (!result.destination) return;
      const newTaskList = Array.from(this.state.taskLists);
      const [reorderedTasks] = newTaskList.splice(result.source.index, 1);
      newTaskList.splice(result.destination.index, 0, reorderedTasks);
      currentTasks = newTaskList
      this.setState({taskLists: currentTasks});
      
    }

    // Handling the alarm inside Modal

    const alarmHandler = (event, key) => {
      event.preventDefault();
      setAlarmTime(event, key)
    }

    // Tasks are sent to archive once done.

    const sentToArchive = (event, value, key) => {
      event.preventDefault();
      currentTasks.splice(key, 1)
      archivedTasks.push(value)
      this.setState({
        taskLists: currentTasks,
        archivedTasksList: archivedTasks 

      })

    }

  return (
    <Router>
     <NavBar/>
     <Layout>
     <Container > 
      <Row>
        <Col>
        <Route path = '/' exact render={() => 
        <WeatherCard 
      temp = {this.state.temp}
      tempDescription = {this.state.tempDescription}
      location = {this.state.location}
      city = {this.state.city} 
      />}
/>
<Route path = '/' exact render={() => 
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
}/>
      </Col>
      <Col>
      <Route path='/' exact>
      <div>
<p style = {{color: 'white', marginTop: "50px"}}> Not sure what to do today in {this.state.city}? <Link to= '/things-to-see'>What To See</Link> and <a href = '/where-to-eat'>Where To Eat</a> pages!</p>
<Card style = {{marginTop: "20px"}}>
<Card.Body>
<Card.Title>What do you want to do today?</Card.Title>
<Form onSubmit = {addTasks} ref={this.formRef} >
<Form.Row>
<Col>
<Form.Control placeholder="Task Name" onChange = {(e) => this.setState({taskName: e.target.value})} />
</Col>
<Col md = "auto">
<Button type = "submit" variant="primary">Add Task</Button>
</Col>
</Form.Row>
</Form>
{this.state.taskLists.length > 0 ?

<DragDropContext onDragEnd = {(result) => onDragEnd(result)} >
<Droppable droppableId = "drop" >
{(provided) => (
<ListGroup className="list-group-flush" style = {{paddingTop: "30px"}} ref = {provided.innerRef} {...provided.droppableProps}>
{this.state.taskLists.map((value, key) => {
return <React.Fragment>

<Draggable key = {key} draggableId = {`${key}`} index = {key}>
{(provided) => (
<ListGroupItem 
{...provided.draggableProps} 
{...provided.dragHandleProps} 
ref = {provided.innerRef} 
> 
<i className="fas fa-bars" style = {{color: "black", float: "left", marginRight: "20px"}}/>
{value.task}
<div style = {{float: "right"}}>
<button className = 'link-button' style = {{paddingRight: "10px"}} onClick ={()=>  this.setState({showModal: true, alarmKey: key})}>
<i className="far fa-clock" style = {{color: "black", paddingRight: "5px"}} 
/> 
{value.alarmTime}
</button>
<button className = 'link-button' style = {{paddingRight: "15px"}} onClick ={(e)=>  sentToArchive(e, value, key)}>
<i className="far fa-check-square" style = {{color: "green"}}/>
</button>
<button button className = 'link-button'>
<i style = {{color: 'red'}} 
onClick = {(e) => removeTask(e, key)} className=" fas fa-trash-alt" /> </button>
</div>
</ListGroupItem>
)}
</Draggable>
</React.Fragment>
})
}
{provided.placeholder}
</ListGroup>
)}
</Droppable>
</DragDropContext>

: <p style = {{margin: "30px"}}> No Upcoming Tasks, Add a Task Above!</p>

}

</Card.Body>
</Card>

{/* Archived Tasks */}

<Card style = {{marginTop: "30px"}}>
<Card.Body>
<Card.Title>Tasks Completed</Card.Title>
{this.state.archivedTasksList.length > 0 ?
this.state.archivedTasksList.map((value, key) => {
return <ListGroup>
<ListGroupItem> {value.task} 
<div style = {{float: "right"}}>
<button className = 'link-button' >
<i style = {{color: 'red'}} 
onClick = {() => removeTaskfromArchive(key)} className=" fas fa-trash-alt" /> </button>
</div>

</ListGroupItem>
</ListGroup>
})
: <p style = {{margin: "30px"}}> No Completed Tasks, Finish a Task to see here!</p>

}
</Card.Body>
</Card>
</div>

      </Route>
    
    </Col>
    </Row>
    <Modal show={this.state.showModal} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Set an Alarm This Task</Modal.Title>
</Modal.Header>
<Modal.Body> 

<h2>It is {this.state.currentTime}.
</h2>
<h2>{this.alarmMessage}
</h2>
<Form>
  <input type="time" onChange={(e) => alarmHandler(e, this.state.alarmKey)}></input>
</Form>

</Modal.Body>
<Modal.Footer>
 
  <Button variant="primary" onClick={handleClose}>
    Close
  </Button>
</Modal.Footer>
</Modal>

      <Route
exact path='/things-to-see'
render={() => <ThingsToSee
  location = {this.state.location}
  city = {this.state.city}
  placeSuggestions = {this.state.placeSuggestions}
  addTask = {this.addToList}

  />}
/>
<Route path = '/where-to-eat' exact>
<WhereToEat eat = {this.state.restuarants} city = {this.state.city} addTask = {this.addRestuarantToList}/>
</Route>
    </Container>
    </Layout>
    </Router>
    
  );
}}


