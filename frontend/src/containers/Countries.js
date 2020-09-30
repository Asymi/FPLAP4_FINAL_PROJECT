import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { WarningText, ActivityCard, ActivityResults } from '../components'
import { faSkiing, faSkating, faSwimmer, faTheaterMasks,  faUtensils, faGlassMartiniAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Activities extends Component {

    state = {
        chosenCountry: '',
        countryName: '',
        capital: '',
        callingCode: '',
        timezone: '',
        currency: '',
        languages: ''
    };

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };
    
    componentDidMount() {
        const countryURL = `https://restcountries.eu/rest/v2/name/${this.props.match.params.slug}`;
        fetch(countryURL)
            .then((r) => r.json())
            .then(country => {this.setState({
                countryName: country[0].name,
                capital: country[0].capital,
                callingCode: country[0].callingCodes,
                currency: country[0].currencies[0].name,
                currencySymbol: country[0].currencies[0].symbol,
                language: country[0].languages[0].name,
                flag: country[0].flag
            })})
            .catch(err => console.warn('Country not found!', err))
    }

    componentDidUpdate() {
        const countryURL = `https://restcountries.eu/rest/v2/name/${this.props.match.params.slug}`;
        fetch(countryURL)
            .then((r) => r.json())
            .then(country => {this.setState({
                countryName: country[0].name,
                capital: country[0].capital,
                callingCode: country[0].callingCodes,
                currency: country[0].currencies[0].name,
                currencySymbol: country[0].currencies[0].symbol,
                language: country[0].languages[0].name,
                flag: country[0].flag
            })})
            .catch(err => console.warn('Country not found!', err))
    }

    handleClick = e => {
        e.preventDefault()
    }

    render() {
        return (
            <div className="activity-container">
                <WarningText/>
                <div className="countryInfo">
                    <img alt={`Flag of ${this.state.countryName}`} src={this.state.flag}/>
                    <h1>Categories in {this.state.countryName}</h1>
                    <div className="todo-card">
                        <button className="todo-icon"><FontAwesomeIcon icon={faUtensils}/>Dining</button>
                        {this.state.showActivities ? this.showActivities() : null}
                        <button className="todo-icon"><FontAwesomeIcon icon={faGlassMartiniAlt}/>Bars</button>
                        <button className="todo-icon"><FontAwesomeIcon icon={faSkating}/>Skating</button>
                        <button className="todo-icon"><FontAwesomeIcon icon={faSkiing}/>Skiing</button>
                        <button className="todo-icon"><FontAwesomeIcon icon={faSwimmer}/>Water Sports</button>
                        <button className="todo-icon"><FontAwesomeIcon icon={faTheaterMasks}/>Theatres and Shows</button>
                    </div>
                    <p>Capital - {this.state.capital}</p>
                    <p>Language - {this.state.language}</p>
                    <p>Calling code - +{this.state.callingCode}</p>
                    <p>Currency - {this.state.currencySymbol} {this.state.currency}</p>
                </div>

                <h1>Activities</h1>
                <h2>Looking for inspiration?</h2>
                 <div className="inspiration-cards">
                     {/* IMPORT CARDS */}
                 </div>
            </div>
        )
    }
}

export default withRouter(Activities);

