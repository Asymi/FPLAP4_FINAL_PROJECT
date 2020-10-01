import React from 'react'
import { Link } from 'react-router-dom'
import './styles/NotFound404Style.css'

const NotFound404 = () => {
    return(
        <div className="notfound-container">
            <p>Sorry this page does not exist.</p>
            <Link to='/' className="home-link">Go Back to the Home Page</Link>
        </div>
    )
}

export default NotFound404;