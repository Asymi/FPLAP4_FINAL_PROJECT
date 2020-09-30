import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import WarningText from '../components/WarningText'

class Activities extends Component {

    state = {
        countryName: '',
        capital: '',
        callingCode: '',
        timezone: '',
        currency: '',
        languages: '',
    }
    
    componentDidMount() {
        const countryURL = `https://restcountries.eu/rest/v2/name/Afghanistan`;
        fetch(countryURL)
            .then((r) => r.json())
            .then(country => {this.setState({
                countryName: country[0].name,
                capital: country[0].capital,
                callingCode: country[0].callingCodes,
                timezone: country[0].timezones,
                currency: country[0].currencies,
                languages: country[0].languages
            })})
            .catch(err => console.warn('Country not found!', err))
    }

    render() {
        return (
            <div className="activity-container">
                <WarningText/>
                <h1>Welcome to {this.state.countryName}</h1>
                <h1>Activities</h1>
                <h3>Want to choose from a category instead?</h3>
                <Link to="/categories">Choose a category</Link>
            </div>
        )
    }
}

export default Activities;
