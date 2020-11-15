import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
    render() {
       return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>To Do App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link> <Link to="/" style = {{color: "white"}}>Task List</Link></Nav.Link>
        <Nav.Link><Link to="/things-to-see" style = {{color: "white"}}>What To See</Link></Nav.Link>
        <Nav.Link><Link to="/where-to-eat" style = {{color: "white"}}>Where To Eat</Link></Nav.Link>
          
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
       )
    }
}