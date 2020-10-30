import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

export default class NavBar extends React.Component {
    render() {
       return(
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">To Do App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">To Do Home</Nav.Link>
          <Nav.Link href="#features">Things To Do Suggestions</Nav.Link>
          <Nav.Link href="#pricing">Explore The City</Nav.Link>
        </Nav>
      </Navbar>
       )
    }
}