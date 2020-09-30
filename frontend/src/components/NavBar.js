import React, { Component } from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../Actions/Actions'
import SearchCard from './SearchCard'
import './styles/NavBarStyle.css'

class NavBar extends Component {

    state = {
        isLogged: this.props.isLogged
    }
    
    onClickHandler = (e) => {
        localStorage.removeItem('token')
        this.props.setLoggedOut()
        //props.history.push('/')
    }

    conditionalRender = () => {
        if (this.props.loggedIn){
            return <Link to="/" onClick={this.onClickHandler}>Logout</Link>
        } else {
            return <NavLink to='/login'>Login</NavLink>
        }
    }

    render() {
        return(
            <>
                <div className='navbar'>
                </div>
                <nav>
                    {/* <button className="search-btn">Search</button> */}
                    <SearchCard/>
                    <NavLink to='/about'>About</NavLink>
                    {this.conditionalRender()}
                    <NavLink to='/dashboard'>Profile</NavLink>
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