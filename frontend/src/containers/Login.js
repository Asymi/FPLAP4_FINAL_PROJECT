import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logIn } from '../Actions/Actions'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './styles/LoginStyle.css'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }
    
    handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSumbmit = e => {
        e.preventDefault()

        const body = {
            email: this.state.email,
            password: this.state.password
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }

        fetch('http://127.0.0.1:5000/login', options)
        .then(res => res.json())
        .then(res => this.registerToken(res))
        .then(res => {this.props.history.push('/dashboard')})
        .catch(err => console.warn("Something broke"))
    }

    registerToken = (res) => {
        if (res.token) {
            this.props.setLoggedIn()
            localStorage.setItem('token', res.token)
            console.log(res.token)
            toast.success("Login success")
        } else if (res.conf_error) {
            toast.error("Please confirm email address before logging in")
        } else {
            toast.error("Invalid username or password")
        }
    }

    render() {
        return (
            <div className="login-container">
                <ToastContainer />
                <form onSubmit={this.handleSumbmit} className="login-form">
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="text" onChange={this.handleInput} name="email" placeholder="Enter your email" className="input-field"></input>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" onChange={this.handleInput} name="password" placeholder="Enter your password" className="input-field"></input>
                    <br/>
                    <input type="submit" value="Login" className="login-btn"></input>
                </form>
                <p className="not-reg">Not registered?</p><Link to="/signup" className="signup-link">Sign up</Link>
            </div>
        )
    }
}

const mDTP = dispatch => ({
    setLoggedIn: () => dispatch(logIn())
})

export default connect(null, mDTP)(Login);
