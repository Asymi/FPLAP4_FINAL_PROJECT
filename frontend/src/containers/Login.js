import React, { Component } from 'react'

export class Login extends Component {

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
        // Store key in localStorage, used in protected API routes
        .then(res => localStorage.setItem('token', res.token))
        .then(res => console.log(localStorage.getItem('token')))
        .then(console.log('success'))
        // .then(res => {this.props.history.push('/dashboard')})
        .catch(err => console.warn("Something broke"))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSumbmit}>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="text" onChange={this.handleInput} name="email" placeholder="Enter your email"></input>
                    <br/>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" onChange={this.handleInput} name="password" placeholder="Enter your password"></input>
                    <br/>
                    <input type="submit" value="login"></input>
                </form>
            </div>
        )
    }
}

export default Login;
