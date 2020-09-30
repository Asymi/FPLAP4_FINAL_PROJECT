import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { faSkiing, faSkating, faSwimmer, faTheaterMasks,  faUtensils, faGlassMartiniAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WarningText from '../components/WarningText'
import './styles/CategoriesStyles.css'

class Categories extends Component {

    // GRAB DATA

    state = {
        country: 'China',
        category: 'Food',
    }
    
    render() {
        return (
            <div className="categories-container">
                <WarningText/>
                <h4>{this.state.country} > {this.state.category}</h4>
                <h2>What would you like to do?</h2>
                <div className="todo-card">
                    <Link to='/' className="todo-icon"><FontAwesomeIcon icon={faUtensils}/>Dining</Link>
                    <Link to='/' className="todo-icon"><FontAwesomeIcon icon={faGlassMartiniAlt}/>Bars</Link>
                    <Link to='/' className="todo-icon"><FontAwesomeIcon icon={faSkating}/>Skating</Link>
                    <Link to='/' className="todo-icon"><FontAwesomeIcon icon={faSkiing}/>Skiing</Link>
                    <Link to='/' className="todo-icon"><FontAwesomeIcon icon={faSwimmer}/>Water Sports</Link>
                    <Link to='/' className="todo-icon"><FontAwesomeIcon icon={faTheaterMasks}/>Theatres and Shows</Link>
                 </div>
                 <h2>Looking for inspiration?</h2>
                 <div className="inspiration-cards">
                     {/* IMPORT CARDS */}
                 </div>
            </div>
        )
    }
}

export default Categories
