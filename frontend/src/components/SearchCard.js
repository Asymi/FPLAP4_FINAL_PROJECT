import React, { Component } from 'react'
import countries from './CountriesList'
import { withRouter } from 'react-router-dom'

class SearchCard extends Component {

    state = {
        suggestions: [],
        text:'',
    }

    onInputChange = e => {
        const value = e.target.value
        let suggestions = []
        if(value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i')
            suggestions = countries.sort().filter(v => regex.test(v))
        }

        this.setState(() => ({
            suggestions, text: value
        }))
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: []
        }))
        this.props.history.push(`/countries/${value}`)
    }

    renderSuggestions = () => {
        let { suggestions } = this.state
        if(suggestions.length === 0) {
            return null
        }
        return (
            <ul>
                {suggestions.map((item, index) => (
                    <li key={index} onClick={() => this.selectedText(item)}>{item}</li>
                ))}
            </ul>
        )
    }
    // state = {
    //     showForm: false,
    //     input: "",
    //     visibility: 'visible'
    // }


    // handleSubmit = e => {
    //     e.preventDefault()
    // }

    // handleInput = e => {
    //     const { name, value } = e.target;
    //     this.setState({ [name]: value })
    //     // this.setState({input: e.target.searchbar.value})
    //     console.log(this.state.input)
    // }

    // showForm = () => {
    //     return (
    //         <form id="search-form" onSubmit={this.handleSubmit}>
    //             <input onChange={this.handleInput} type="text" placeholder="Search by Country" name="
    //             searchbar"></input>
    //         </form>
    //     )
    // }


    render() {
        const { text, suggestions} = this.state
        return (
            <div>
                <input type="text" onChange={this.onInputChange} value={text} placeholder="Search by Country"/>
                {this.renderSuggestions()}
                {/* <span>Suggestions: {suggestions.length}</span> */}
                {/* HIDE BUTTON AFTER CLICK
                <button onClick={() => this.setState({showForm: true})} >Search</button>
                {this.state.showForm ? this.showForm() : null} */}
            </div>
        )
    }
}

export default withRouter(SearchCard);
