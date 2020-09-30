import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import WarningText from '../components/WarningText'

class Activities extends Component {

    state = {
        chosenCountry: 'kiribati',
        countryName: '',
        capital: '',
        callingCode: '',
        timezone: '',
        currency: '',
        languages: '',
    };

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };
    
    componentDidMount() {
        // const countryURL = `https://restcountries.eu/rest/v2/name/${this.state.chosenCountry}`;
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

    render() {

        // const { match, location, history } = this.props;
        // console.log(this.props)
        // console.log(this.props.match.params.slug)

        return (
            <div className="activity-container">
                <WarningText/>
                <div className="countryInfo">
                    <img alt={`Flag of ${this.state.countryName}`} src={this.state.flag}/>
                    <h1>Activities in {this.state.countryName}</h1>
                    <p>Capital - {this.state.capital}</p>
                    <p>Language - {this.state.language}</p>
                    <p>Calling code - +{this.state.callingCode}</p>
                    <p>Currency - {this.state.currencySymbol} {this.state.currency}</p>
                </div>

                <h1>Activities</h1>
                <h3>Want to choose from a category instead?</h3>
                <Link to="/categories">Choose a category</Link>
            </div>
        )
    }
}

export default withRouter(Activities);
