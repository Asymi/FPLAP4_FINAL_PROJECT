import React from 'react'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
    return(
        <div className="notfound-container">
            <p>Sorry this page does not exist.</p>
            <Link to='/'>Go Back to the Home Page</Link>
        </div>
    )
}

export default NotFound404;