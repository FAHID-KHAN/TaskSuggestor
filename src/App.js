import './App.css';
import React from 'react'
import TaskMain from './components/TaskMain'
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap'
import NavBar from './components/NavBar';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
    <Container>
      <Welcome/>
    <TaskMain/> 
    </Container>
    </React.Fragment>
    
  );
}

export default App;
