import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import './styles/ActivityResultsStyle.css'

class ActivityResults extends Component{


    render(){
 
        const allData = this.props.results.map((item, idx) =>
            <div key={idx} className="activity-container">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="./assets/baguette.jpg" />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Opening Hours: {item.opening_hours}</ListGroup.Item>
                        <ListGroup.Item>Address: {item.address}</ListGroup.Item>
                        <ListGroup.Item>Price: {item.price}</ListGroup.Item>
                        <ListGroup.Item>Provider: {item.provider}</ListGroup.Item>
                        <ListGroup.Item>Contact Number: {item.phone_number}</ListGroup.Item>
                    </ListGroup>
                    {/* <Card.Body>
                        <Card.Link href="#">Website?</Card.Link>
                    </Card.Body> */}
                </Card>
                
            </div>) 

        return (
            <div className="all-habits">
                {allData} 
                {/* <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image" />
                    <Card.Body>
                        <Card.Title>Activity name</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>price</ListGroup.Item>
                        <ListGroup.Item>opening hours</ListGroup.Item>
                        <ListGroup.Item>provider</ListGroup.Item>
                        <ListGroup.Item>address</ListGroup.Item>
                        <ListGroup.Item>phone number</ListGroup.Item>
                    </ListGroup>
            
                </Card> */}
            </div>
        )
    }
}
export default withRouter(ActivityResults);