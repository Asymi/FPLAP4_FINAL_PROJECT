import React, { Component } from 'react'
import countries from './CountriesList'
import { withRouter } from 'react-router-dom'
import './styles/SearchCardStyle.css'
import { FaSearch } from "react-icons/fa";



class SearchCard extends Component {

    state = {
        suggestions: [],
        text:'',
        hideButton: false,
        flags: {
            Afghanistan: '🇦🇫'
        }
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
                        <li key={index} onClick={() => this.selectedText(item)} className="country-list"> • {item}</li>
                    ))}
                </ul>
            </div>
        )
    }


    render() {
        const { text, hideButton } = this.state
        
        return (
            <>
                <button onClick={()=> this.setState({hideButton: !hideButton})}><FaSearch/></button>
                { this.state.hideButton ? <div><input type="text" onChange={this.onInputChange} value={text} placeholder="Search by Country 🌍"/>
                {this.renderSuggestions()}</div> : null }
            </>
        )
    }
}

export default withRouter(SearchCard);