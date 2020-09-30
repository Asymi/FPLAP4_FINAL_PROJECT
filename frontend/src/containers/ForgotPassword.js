import React, { Component } from 'react'

<<<<<<< HEAD
export class ForgotPassword extends Component {
    render() {
        return (
            <div>
                
=======
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
>>>>>>> 7e842961527913c1cfc16808ad731f01db2052b6
            </div>
        )
    }
}

<<<<<<< HEAD
export default ForgotPassword
=======
export default ForgotPassword
>>>>>>> 7e842961527913c1cfc16808ad731f01db2052b6
