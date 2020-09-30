import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

function ActivityCard() {
    const [ results, setResults ]  = useState([])
    const showData = () => {
        axios.get(`http://localhost:port/route`)
            .then(function (response) {
                setResults(response.data.activities)
        })
    }

    return(
        <>
            {showData()}
            <Card results={results}/>
        </>
    )
}

export default ActivityCard;