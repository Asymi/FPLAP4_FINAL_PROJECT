import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

class ActivityResults extends Component{

    state = {
        likedActivityIds: [],
        firstRender: true,
        clicked: {}
    }

    async isLiked(id){
        const token = localStorage.getItem('token')
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({activity_id: id})
        }

        const result = await fetch('http://127.0.0.1:5000/is_liked', options)
        const json = await result.json()

        if (json.user_likes === true){
            const arr = [...this.state.likedActivityIds]
            arr.push(id)
            this.setState({likedActivityIds: arr})
        }
    }

    setup(){
        this.props.results.map((item) => {
            this.isLiked(item.id)
        })

        const setClicked = {...this.state.clicked}
        this.props.results.map((item) => {
            setClicked[item.id] = 0
            this.setState({clicked: setClicked})
        })
    }

    handleClick = (e) => {
        const updateClicked = {...this.state.clicked}
        const id = parseInt(e.target.value)

        const token = localStorage.getItem('token')
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({activity_id: id})
        }

        updateClicked[id]++
        this.setState({clicked: updateClicked}, () => updateDatabase())

        const updateDatabase = () => {
            if (this.initialRender(id) === false && this.state.clicked[id] === 0){
                return null
            } else if (this.initialRender(id) === true && this.state.clicked[id] === 0){
                return null
            // Even number of clicks starting from Unlike
            } else if (this.initialRender(id) === false && this.state.clicked[id] !== 0 && this.state.clicked[id] % 2 === 0){
                fetch('http://127.0.0.1:5000/like_activity', options)
                console.log("case1")
                return null
            // Odd number of clicks starting from Unlike
            } else if (this.initialRender(id) === false && this.state.clicked[id] !== 0 && this.state.clicked[id] % 2 === 1){
                fetch('http://127.0.0.1:5000/unlike_activity', options)
                console.log("case2")
                return null
            // Even number of clicks starting from Like
            } else if (this.initialRender(id) === true && this.state.clicked[id] !== 0 && this.state.clicked[id] % 2 === 0){
                fetch('http://127.0.0.1:5000/unlike_activity', options)
                console.log("case3")
                return null
            // Odd number of clicks starting from like
            } else if (this.initialRender(id) === true && this.state.clicked[id] !== 0 && this.state.clicked[id] % 2 === 1){
                fetch('http://127.0.0.1:5000/like_activity', options)
                console.log("case4")
                return null
            } 
        }
    }

    initialRender = (id) => {
        if (this.state.likedActivityIds.includes(id)){
            // "Unlike" i.e. initially liked
            return false
        } else {
            // "Like" i.e. initially unliked
            return true
        } 
    }

    render(){
        if (this.props.results.length === 0){
            return <h2>Loading</h2>
        } else if (this.state.firstRender === true) {
            this.setup()
            this.setState({firstRender: false})
        }

        const actualRender = (id) => {
            if (this.initialRender(id) === false && this.state.clicked[id] === 0){
                return "Unlike"
            } else if (this.initialRender(id) === true && this.state.clicked[id] === 0){
                return "Like"
            // Even number of clicks starting from Unlike
            } else if (this.initialRender(id) === false && this.state.clicked[id] !== 0 && this.state.clicked[id] % 2 === 0){
                return "Unlike"
            // Odd number of clicks starting from Unlike
            } else if (this.initialRender(id) === false && this.state.clicked[id] !== 0 && this.state.clicked[id] % 2 === 1){
                return "Like"
            // Even number of clicks starting from Like
            } else if (this.initialRender(id) === true && this.state.clicked[id] !== 0 && this.state.clicked[id] % 2 === 0){
                return "Like"
            // Odd number of clicks starting from like
            } else if (this.initialRender(id) === true && this.state.clicked[id] !== 0 && this.state.clicked[id] % 2 === 1){
                return "Unlike"
            } 
        }

        const allData = this.props.results.map((item) =>
            <div key={item.id} className="activity-container">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180?text=Image" />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
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
                        <button onClick={this.handleClick} value={item.id}>{actualRender(item.id)}</button>
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