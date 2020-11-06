import React from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

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

        console.log(result)
          const newTaskList = Array.from(this.state.taskLists);
  const [reorderedTasks] = newTaskList.splice(result.source.index, 1);
  newTaskList.splice(result.destination.index, 0, reorderedTasks);
  
  this.setState({taskLists: newTaskList});
          
        }
        


      return (
        <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-12">
              <div className="card px-3">
                <div className="card-body">
                  <h4 className="card-title">Awesome Todo list</h4>
                  <form onSubmit = {addTasks} >
                  <div className="add-items d-flex"> 
                  
                  <input type="text" onChange = {(e) => this.setState({taskName: e.target.value})} className="form-control todo-list-input" placeholder="What do you need to do today?" /> 
                  <button type = "submit"  className="add btn btn-primary font-weight-bold todo-list-add-btn">Add This Task</button> 
                  
                  </div>
                  </form>
                  
                  <div className="list-wrapper">
                  <DragDropContext onDragEnd = {(result) => onDragEnd(result)} >
                  <Droppable droppableId = "drop" >
                          {(provided) => (
                    <ul className="d-flex flex-column-reverse todo-list" ref = {provided.innerRef} {...provided.droppableProps}>
                  
                    
                    {this.state.taskLists.map((value, key) => {
                      console.log(`Key: ${key} and value: ${value}`)
                        return  ( 
                        <Draggable key = {key} draggableId = {`${key}`} index = {key}>
                        {(provided) => (
                             <li  {...provided.draggableProps} {...provided.dragHandleProps} ref = {provided.innerRef} key = {key}>
                            
                             <p>{value} </p> 
                             
                            
                             <div onClick = {() => removeTask(value, key)} className = "remove"> 
                             <i style = {{color: 'red'}} className=" fas fa-trash-alt" /> 
                             </div>
                            
                           </li>
                         
                           )}
                           </Draggable>
                        )
                        
                    })}                
                      {provided.placeholder}
                    </ul>
                          )}
                      </Droppable>
                      </DragDropContext>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        )
    }
  }

export default TaskMain;