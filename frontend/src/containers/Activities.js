import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WarningText from '../components/WarningText'

class Activities extends Component {
    render() {
        return (
            <div className="activity-container">
                <WarningText/>
                <h1>Activities</h1>
                <h3>Want to choose from a category instead?</h3>
                <Link to="/categories">Choose a category</Link>
            </div>
        )
    }
}

export default Activities;
