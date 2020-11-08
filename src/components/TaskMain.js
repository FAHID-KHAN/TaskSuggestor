import React from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {Card, Form, Col, Button, ListGroup, ListGroupItem, Modal, Spinner} from 'react-bootstrap'

export let currentTasks = [];
export let archivedTasks = [];

class TaskMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskLists : [],
            taskName: '',
            showModal: false,
            currentTime: '',
            archivedTasksList: []
        }
        //this.setAlarmTime = this.setAlarmTime.bind(this);

      }

      componentDidMount(){
        this.clock = setInterval(
          () => this.setCurrentTime(),
          1000
        )
        this.interval = setInterval(
          () => this.checkAlarmClock(),
        1000)
      }

      componentWillUnmount(){
        clearInterval(this.clock);
        clearInterval(this.interval);
      }

      setCurrentTime(){
        this.setState({
          currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
        });
      }
    
     
    
      checkAlarmClock(){
        this.state.taskLists.forEach(task => {
          if(task.alarmTime === 'undefined' || !task.alarmTime) {
            this.alarmMessage = "Please set your alarm.";
          } else {
            this.alarmMessage = "Your alarm is set for " + task.alarmTime + ".";
            if(this.state.currentTime === task.alarmTime) {
              alert("its time!");
              task.alarmTime = null;
            } else {
            }
          }  
        }) 
      }

    render() {

      const setAlarmTime = (event, key) => {
        event.preventDefault();
        const inputAlarmTimeModified = event.target.value + ':00'
        currentTasks[key].alarmTime = inputAlarmTimeModified
        this.setState({
        taskLists: currentTasks
        })

      }


      const handleClose = () => this.setState({showModal: false});

        const addTasks = (e) => {
          if (this.state.taskName === "") {
            alert("Task Name can not be empty!")
          }

          else {
            e.preventDefault()
            currentTasks.push({task: this.state.taskName, currentTime: '', alarmTime: '' })
            
            this.setState({taskLists: currentTasks})
          }
            
        }

        const removeTask = (value, key) => {
            currentTasks.splice(key, 1)
            this.setState({taskLists: currentTasks})
        }

        const removeTaskfromArchive = (key) => {
          archivedTasks.splice(key, 1)
          this.setState({archivedTasksList: archivedTasks})
      }

       const onDragEnd = result => {
        if (!result.destination) return;
          const newTaskList = Array.from(this.state.taskLists);
          const [reorderedTasks] = newTaskList.splice(result.source.index, 1);
          newTaskList.splice(result.destination.index, 0, reorderedTasks);
  
          this.setState({taskLists: newTaskList});
          
        }

        const alarmHandler = (event, key) => {
          event.preventDefault();
          setAlarmTime(event, key)
        }

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
        <React.Fragment>

        <Card style = {{marginTop: "80px"}}>
  <Card.Body>
    <Card.Title>What do you want to do today?</Card.Title>
    <Form onSubmit = {addTasks}>
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
       <Modal show={this.state.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set an Alarm For This Task</Modal.Title>
        </Modal.Header>
        <Modal.Body> <div>
        
        <h2>It is {this.state.currentTime}.
        </h2>
        <h2>{this.alarmMessage}
        </h2>
        <Form>
          <input type="time" onChange={(e) => alarmHandler(e, key)}></input>
        </Form>
      </div>
      </Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
     <Draggable key = {key} draggableId = {`${key}`} index = {key}>
     {(provided) => (
      <ListGroupItem 
      {...provided.draggableProps} 
      {...provided.dragHandleProps} 
      ref = {provided.innerRef} 
      key = {key}> 
      <i class="fas fa-bars" style = {{color: "black", float: "left", marginRight: "20px"}}/>
      {value.task}
      <div style = {{float: "right"}}>
      <a href = "#" style = {{paddingRight: "10px"}} onClick ={()=>  this.setState({showModal: true})}>
      <i className="far fa-clock" style = {{color: "black", paddingRight: "5px"}} 
      /> 
     {value.alarmTime}
      </a>
      <a href = "#" style = {{paddingRight: "15px"}} onClick ={(e)=>  sentToArchive(e, value, key)}>
      <i className="far fa-check-square" style = {{color: "green"}}/>
      </a>
      <a href = "#" >
      <i style = {{color: 'red'}} 
      onClick = {() => removeTask(value, key)} className=" fas fa-trash-alt" /> </a>
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
        <a href = "#" >
      <i style = {{color: 'red'}} 
      onClick = {() => removeTaskfromArchive(key)} className=" fas fa-trash-alt" /> </a>
      </div>
        
        </ListGroupItem>
      </ListGroup>
    })
    : <p><p style = {{margin: "30px"}}> No Completed Tasks, Finish a Task to see here!</p></p>
  
  }
  </Card.Body>
</Card>




</React.Fragment>
      
  )}
}

export default TaskMain;