import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WarningText from '../components/WarningText'
import './styles/LandingStyle.css'

class Landing extends Component {

    handleClick = e => {
        e.preventDefault()
        this.props.history.push('/activities') 
    }

    render() {
        return (
            <div className="landing-container">
                <WarningText/>
                <div className="profile-icon">
                    <Link to='/dashboard'><FontAwesomeIcon icon={faUserCircle}/></Link>
                 </div>
                <div className="banner">
                    <img src="https://images.unsplash.com/photo-1517699418036-fb5d179fef0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80" alt="Surfing" className="surfing"></img>
                    <div className="banner-text">
                        <h1>Go Wild</h1>
                        <p>Experience the fun out there</p>
                        <button onClick={this.handleClick}>Explore</button>
                    </div>
                </div>
                <div className="featured-container">
                    <h2>Featured Experiences</h2>
                    <div className="activity-cards">
                        {/* IMPORT ACTIVITY */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
