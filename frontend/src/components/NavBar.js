import React, { Component } from 'react'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../Actions/Actions'

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
                    {/* <NavLink to='/'>Search</NavLink> */}
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