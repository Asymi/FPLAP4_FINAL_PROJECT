import React, { Component } from 'react'

export class Dashboard extends Component {
    state = {
        username: ""
    }

    token = localStorage.getItem('token')

    componentDidMount(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.token
            }
        }

        fetch('http://127.0.0.1:5000/dashboard', options)
            .then(res => {
                return res.json()
            })
            .then(data => {
                {this.setState({username: data.username})}
                return data.username
            })
            .catch(err => console.warn('Username not printed'))
    }


    render() {
        return (
            <div className="dashboard-container">
                <div className="saved-container">
                <h1>Hi {this.state.username}</h1>
                <h2>Saved Activities</h2>
                    <div className="saved-cards">
                        {/* IMPORT SAVED ACTIVITIES */}
                    </div>
                </div>
                <div className="saved-container">
                <h2>Your Activities</h2>
                    <div className="saved-cards">
                        {/* IMPORT SAVED ACTIVITIES */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
