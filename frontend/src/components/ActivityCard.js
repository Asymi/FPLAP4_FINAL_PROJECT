import React, { useState } from 'react'
import ActivityResults from './ActivityResults'
import axios from 'axios'


function ActivityCard() {
    const [ results, setResults ]  = useState([])
    const showData = () => {
        axios.get(`http://localhost:8000/countries/kiribati`)
            .then(function (response) {
                setResults(response.data.activities)
        })
    }

    return(
        <>
            {showData()}
            <ActivityResults results={results}/>
        </>
    )
}

export default ActivityCard;