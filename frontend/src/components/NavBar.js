import React, { Component } from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../Actions/Actions'
import SearchCard from './SearchCard'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/NavBarStyle.css'

class NavBar extends Component {

    state = {
        isLogged: this.props.isLogged
    }
    
    onClickHandler = (e) => {
        localStorage.removeItem('token')
        this.props.setLoggedOut()
    }

    conditionalRender = () => {
        if (this.props.loggedIn){
            return <Link to="/" className="nav-logout nav" onClick={this.onClickHandler}>Logout</Link>
        } else {
            return <NavLink to='/login' className="nav-login nav">Login</NavLink>
        }
    }

    profileAccess = () => {
        if (this.props.loggedIn) {
            return <div className="nav-profile">
            <Link to="/dashboard" className="nav-home nav"><FontAwesomeIcon icon={faUserCircle} className="profile-icon"/>Profile</Link></div>
        }
    }

    render() {
        return(
            <>
                <nav className="nav-container">
                    <SearchCard/>
                    <NavLink to='/about' className="nav-about nav">About</NavLink>
                    {this.conditionalRender()}
                    {this.profileAccess()}
                </nav>
            </>            
        )
    }
}

const mDTP = dispatch => ({
    setLoggedOut: () => (dispatch(logOut()))
})

const mSTP = state => ({
    loggedIn: state.loggedIn
})

export default connect(mSTP, mDTP)(withRouter(NavBar));