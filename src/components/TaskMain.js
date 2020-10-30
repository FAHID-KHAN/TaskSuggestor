import React from 'react';

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
            e.preventDefault()
            currentTasks.push(this.state.taskName)
            
            this.setState({taskLists: currentTasks})
        }

        const removeTask = (value, key) => {
            currentTasks.splice(key, 1)
            this.setState({taskLists: currentTasks})
        }
        


      return (
        <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-12">
              <div className="card px-3">
                <div className="card-body">
                  <h4 className="card-title">Awesome Todo list</h4>
                  <div className="add-items d-flex"> 
                  
                  <input type="text" onChange = {(e) => this.setState({taskName: e.target.value})} className="form-control todo-list-input" placeholder="What do you need to do today?" /> 
                  <button onClick = {addTasks} className="add btn btn-primary font-weight-bold todo-list-add-btn">Add This Task</button> 
                  
                  </div>
                  <div className="list-wrapper">
                    <ul className="d-flex flex-column-reverse todo-list">
                    {this.state.taskLists.map((value, key) => {
                        return  <li key = {key}>
                        <div className="form-check"> <label className="form-check-label"> 
                        <b>{value} </b> <i className="input-helper" /></label> </div> <div onClick = {() => removeTask(value, key)} className = "remove"> <i style = {{color: 'red'}} className=" fas fa-trash-alt" /> </div>
                      </li>
                    })
                         
                    }
                    
                      
                    </ul>
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