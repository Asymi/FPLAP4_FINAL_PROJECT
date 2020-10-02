import React, { Component } from 'react'
import { ActivityResults } from '../components'

export class Dashboard extends Component {

    state = {
        username: "",
        activities: []
    }

    token = localStorage.getItem('token')

    componentDidMount(){
     
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.token
            },
        }

        fetch('http://127.0.0.1:5000/dashboard', options)
            .then(res => res.json())
            .then(res => {
                {this.setState({
                    username: res.username,
                    activities: res.user_activities
                })}
            })
            .catch(err => console.warn('Username not printed'))
    }


    render() {
        return (
            <div className="dashboard-container">
                <div className="saved-container">
                <h2>Your Liked Activities</h2>
                    <div className="saved-cards">
                        <ActivityResults results={this.state.activities} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
