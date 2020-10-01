import React from 'react'
import { Link } from 'react-router-dom'
import './styles/WarningTextStyle.css'
// import { TiWarning } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TiWarning } from "react-icons/ti"

const WarningText = () => {
    return (
        <div className="warning-banner">
            <Link to='/covid' className="covid-text"><TiWarning/> Travel notice. Learn more about COVID-19</Link>
        </div>
    )
}

export default WarningText;