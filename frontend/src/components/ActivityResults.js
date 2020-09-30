import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

class Results extends Component{


    render(){
 
        const allData = this.props.results.map((item, idx) =>
            <div key={idx} className="activity-container">
                <h2 className="title">{item.name}</h2>
                <h2 className="streak">Streak: {item.count}</h2>
                <ProgressCard id={item.id} frequency={item.frequency} disable={item.disable}/><br></br>
                <Button id={item.id} disable={item.disable} ></Button>   
                <ReverseButton id={item.id}></ReverseButton>

                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image" />
                    <Card.Body>
                        <Card.Title>Activity name - {item.name}</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{item.price}</ListGroup.Item>
                        <ListGroup.Item>{item.opening_hours}</ListGroup.Item>
                        <ListGroup.Item>{item.provider}</ListGroup.Item>
                        <ListGroup.Item>{item.address}</ListGroup.Item>
                        <ListGroup.Item>{item.phone_number}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Website?</Card.Link>
                    </Card.Body>
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