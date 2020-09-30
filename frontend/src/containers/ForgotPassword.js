import React, { Component } from 'react'

class ForgotPassword extends Component {
    
    state = {
        email: ''
    }
    
    handleInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault()

        const body = {
            email: this.state.email,
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }

        fetch('http://127.0.0.1:5000/forgot_password', options)
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
                <h1>Password Reset</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Email address associated with account</label>
                    <br />
                    <input type="text" onChange={this.handleInput}></input>
                    <br />
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default ForgotPassword