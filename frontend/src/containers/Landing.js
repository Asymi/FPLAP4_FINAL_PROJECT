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
                <div className="banner">
                    <img src="https://images.unsplash.com/photo-1517699418036-fb5d179fef0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1191&q=80" alt="Surfing" className="surfing"></img>
                    <div className="banner-text">
                        <h1 className="banner-title">Go Wild</h1>
                        <p className="banner-para">Experience the fun out there</p>
                        <button onClick={this.handleClick} className="banner-btn">Explore</button>
                    </div>
                </div>
                <div className="home-text">
                    <h1 className="travel">Love travelling but not sure where to start?</h1>
                    <h3 className="travel-subtext">Don't worry, we can help you!</h3>
                    <div className="img-container">
                        <div className="img-cards">
                            <img src="https://images.unsplash.com/photo-1541388320452-cb41172bb7ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Food and Drinks" className="img"></img>
                            <p className="img-text">Food & Drinks</p>
                        </div>
                        <div className="img-cards">
                            <img src="https://images.unsplash.com/photo-1578163678052-eef169544f75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Museum" className="img"></img>
                            <p className="img-text">Arts</p>
                        </div>
                        <div className="img-cards">
                            <img src="https://images.unsplash.com/photo-1514827387294-037ee5cc2687?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Skiing" className="img"></img>
                            <p className="img-text">Sports</p>
                        </div>
                        <div className="img-cards">
                            <img src="https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Eiffel Tower" className="img"></img>
                            <p className="img-text">Sight Seeing</p>
                        </div>
                        <div className="img-cards">
                            <img src="https://images.unsplash.com/photo-1508642207-7048c482ba7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1036&q=80" alt="Dance" className="img"></img>
                            <p className="img-text">Culture</p>
                        </div>
                        <div className="img-cards">
                            <img src="https://images.unsplash.com/photo-1532105111962-e23707867985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Beach" className="img"></img>
                            <p className="img-text">Outdoor</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
