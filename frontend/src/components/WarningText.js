import React from 'react'
import { Link } from 'react-router-dom'

const WarningText = () => {
    return (
        <div className="warning-banner">
            <Link to='/covid'>Travel notice. Learn more about COVID-19</Link>
        </div>
    )
}

export default WarningText;