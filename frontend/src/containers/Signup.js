import React, { Component } from 'react'

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
        .catch(err => console.warn("Something broke"))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSumbmit}>
                    <label htmlFor="username">Username</label>
                    <br/>
                    <input type="text" onChange={this.handleInput} name="username" placeholder="Enter a username"></input>
                    <br/>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="text" onChange={this.handleInput} name="email" placeholder="Enter your email"></input>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" onChange={this.handleInput} name="password" placeholder="Enter your password"></input>
                    <br/>
                    <input type="submit" value="Sign Up"></input>
                </form>
            </div>
        )
    }
}


export default Signup;
