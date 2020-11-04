import './App.css';
import React from 'react'
import TaskMain from './components/TaskMain'
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from 'react-bootstrap'
import NavBar from './components/NavBar';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <NavBar/>
    <Container >
      <Welcome/>
    <TaskMain/> 
   
    </Container>
    </Layout>
    
  );
}

export default App;
