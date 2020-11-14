import React, { Component } from 'react'
import {Row, Col, Card, Button} from 'react-bootstrap'


export default class ThingsToDo extends Component {

  
  
    render() {

      const addToList = (event, taskName) => {
        event.preventDefault();
        this.props.addTask(taskName)

      }
        return (
            
            <div style = {{marginTop: "50px"}}>
           
              <h2 style = {{color: "white", padding: "10px"}}>Things To See in {this.props.location}</h2>
              <Row>
              {this.props.placeSuggestions.map(place => {
                  return <Col>
                  <Card style={{ width: '18rem', margin: "10px", minHeight: "400px" }}>
                  <Card.Img variant="top" style = {{height: "200px"}} src= {`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=AIzaSyBlaR5cFmeCl98AF_eLTzgavMo70hLQeds`} />
                  <Card.Body>
                    <Card.Title>{place.name}</Card.Title>
                    <Card.Text>
                      {place.formatted_address} 
                    </Card.Text>
                    <Button variant="primary" onClick = {(e) => addToList(e, place.name)}> Add To My List</Button>
                  </Card.Body>
                  </Card>
                  </Col>
                
              })
              }
              </Row>
       
            </div>

        )
    }
}
