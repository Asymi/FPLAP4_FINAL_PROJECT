import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

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
                </Card>
                
            </div>) 

        return (
            <div className="all-habits">
                {allData} 
            </div>
        )
    }
}
export default withRouter(ActivityResults);