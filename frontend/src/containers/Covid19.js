import React from 'react'
import './styles/Covid19Styles.css'

const Covid19 = () => {
    return(
        <div className="covid-container">
            <h1>What do you need to know about travel and COVID-19?</h1>
            <img src="https://images.unsplash.com/photo-1586864387564-ea6bc7ceb97c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Covid-19" className="covid"></img>
            <p>As the world continues to navigate the ongoing COVID-19 pandemic, Tripadvisor is ready to assist travelers throughout this challenging period. Read on for up-to-date travel info on global destinations, ways you can help stop the spread of COVID-19, and tools and resources for staying abreast of this ever-changing situation.</p>
            <h2>What to know about booking travel</h2>
            <h2>Resources for Travel Planning</h2>
            <h2>What to do when returning home from a trip</h2>
            <h2>Help to slow down the spread of COVID-19</h2>
            <h2>More COVID-19 News and Resources</h2>
        </div>
    )
}

export default Covid19;