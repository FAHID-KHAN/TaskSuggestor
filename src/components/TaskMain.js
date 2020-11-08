import React from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {Card, Form, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap'

export let currentTasks = [];

class TaskMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            taskLists : ["Add A Task To See Here!"],
            taskName: ''
        }
      }

    render() {

        const addTasks = (e) => {
          if (this.state.taskName === "") {
            alert("Task Name can not be empty!")
          }

          else {
            e.preventDefault()
            currentTasks.push(this.state.taskName)
            
            this.setState({taskLists: currentTasks})
          }
            
        }

        const removeTask = (value, key) => {
            currentTasks.splice(key, 1)
            this.setState({taskLists: currentTasks})
        }

       const onDragEnd = result => {
        if (!result.destination) return;
          const newTaskList = Array.from(this.state.taskLists);
          const [reorderedTasks] = newTaskList.splice(result.source.index, 1);
          newTaskList.splice(result.destination.index, 0, reorderedTasks);
  
          this.setState({taskLists: newTaskList});
          
        }
        
      return (

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
<DragDropContext onDragEnd = {(result) => onDragEnd(result)} >
<Droppable droppableId = "drop" >
  {(provided) => (
<ListGroup className="list-group-flush" style = {{paddingTop: "30px"}} ref = {provided.innerRef} {...provided.droppableProps}>
   {this.state.taskLists.map((value, key) => {
     return <Draggable key = {key} draggableId = {`${key}`} index = {key}>
     {(provided) => (
      <ListGroupItem 
      {...provided.draggableProps} 
      {...provided.dragHandleProps} 
      ref = {provided.innerRef} 
      key = {key}> 
      {value}  
      <a href = "#" ><i style = {{color: 'red', float: "right"}} 
      onClick = {() => removeTask(value, key)} className=" fas fa-trash-alt" /> </a>
      </ListGroupItem>
     )}
     </Draggable>
   
   })}
     {provided.placeholder}
  </ListGroup>
  )}
  </Droppable>
  </DragDropContext>
   
  </Card.Body>
</Card>
      
  )}
}

export default TaskMain;