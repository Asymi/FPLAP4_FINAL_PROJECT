import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { WarningText, ActivityResults } from '../components'

class Countries extends Component {
    state = {
        countryName: '',
        capital: '',
        callingCode: '',
        timezone: '',
        currency: '',
        languages: '',
        country: '',
        APIData: []
    };
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };
    getData = () => {
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
    componentDidMount() {
        fetch(`http://127.0.0.1:5000/countries/${this.props.match.params.slug}`)
        .then(res => res.json())
        .then(res => this.setState({APIData: res}))
        .catch(err => console.log(err))
        this.setState({country: this.props.match.params.slug}, () => this.getData())
    }
    handleClick = e => {
        e.preventDefault()
    }
    render() {
        if (this.state.country !== this.props.match.params.slug && this.state.country !== ''){
            fetch(`http://127.0.0.1:5000/countries/${this.props.match.params.slug}`)
            .then(res => res.json())
            .then(res => this.setState({APIData: res}))
            .catch(err => console.log(err))
            this.setState({country: this.props.match.params.slug}, () => this.getData())
        }
        return (
            <div className="activity-container">
                <WarningText/>
                <div className="countryInfo">
                    <img alt={`Flag of ${this.state.countryName}`} src={this.state.flag}/>
                    <h1>Categories in {this.state.countryName}</h1>
                    <p>Capital - {this.state.capital}</p>
                    <p>Language - {this.state.language}</p>
                    <p>Calling code - +{this.state.callingCode}</p>
                    <p>Currency - {this.state.currencySymbol} {this.state.currency}</p>
                </div>
                <h1>Activities</h1>
                    {this.state.APIData.map(catAndAct => {
                        return (
                            <div>
                                <h2>{catAndAct.category}</h2>
                                <ActivityResults results={catAndAct.activities} />
                            </div>
                        )
                    })}
            </div>
        )
    }
}
export default withRouter(Countries);