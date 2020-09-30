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
        this.setState({text: ""})
    }

    renderSuggestions = () => {
        let { suggestions } = this.state
        if(suggestions.length === 0) {
            return null
        }
        return (
            <div>
                <ul>
                    {suggestions.slice(0, 5).map((item, index) => (
                        <li key={index} onClick={() => this.selectedText(item)} className="country-list">{item}</li>
                    ))}
                </ul>
            </div>
        )
    }

    render() {
        const { text } = this.state
        
        return (
            <div>
                <input type="text" onChange={this.onInputChange} value={text} placeholder="Search by Country"/>
                {this.renderSuggestions()}
            </div>
        )
    }
}

export default withRouter(SearchCard);
