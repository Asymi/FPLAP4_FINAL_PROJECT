import React, { Component } from 'react'

export class Dashboard extends Component {


    fetchUsername = () => {
        const options = {
            method: 'GET'
        }

        fetch('http://localhost:5000/login', options)
            .then(res => console.log(res.json()))
            .then(data => 
                <h1>{data.username}</h1>
            )
            .catch(err => console.warn('Error. Username not fetched'))
    }

    render() {

        return (
            <div className="dashboard-container">
                {this.fetchUsername}
                <div className="saved-container">
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
