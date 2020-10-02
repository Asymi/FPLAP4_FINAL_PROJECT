import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './styles/SignupStyle.css'

class Signup extends Component {

    state = {
        username: '',
        email: '',
        password: ''
    }
    
    handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    // validate length of pw and character content here
    // Tell them to check their email if successful

    handleSumbmit = e => {
        e.preventDefault()

        const body = {
            username: this.state.username,
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

        fetch('http://127.0.0.1:5000/signup', options)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        .then(res => this.registerUser(res))
        .catch(err => console.warn("Something broke"))
    }

    registerUser = (res) => {
        if (res.success) {
            toast.success("Thanks for signing up. Please check your email to confirm your account.")
        } else {
            toast.error("That email is already in use, please choose another.")
        }
    }

    render() {
        return (
            <div className="signup-container">
                <ToastContainer />
                <form onSubmit={this.handleSumbmit} className="signup-form">
                    <label htmlFor="username">Username</label>
                    <br/>
                    <input type="text" onChange={this.handleInput} name="username" placeholder="Enter a username" className="input-field"></input>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="text" onChange={this.handleInput} name="email" placeholder="Enter your email" className="input-field"></input>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" onChange={this.handleInput} name="password" placeholder="Enter your password" className="input-field"></input>
                    <br/>
                    <input type="submit" value="Sign Up" className="singup-btn"></input>
                </form>
                <p className="reg">Already have an account?</p><Link to="/login" className="login-link">Log In</Link>
            </div>
        )
    }
}


export default Signup;
