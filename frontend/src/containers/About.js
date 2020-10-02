import React from 'react'
import './styles/AboutStyles.css'

const About = () => {
    return(
        <div className="about-container">
            <div className="about-banner">
                <img src="https://images.unsplash.com/photo-1571979935923-ec11d7cda5dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1194&q=80" className="balloon" alt="balloon"></img>
                <div className="about-headers">
                    <h1 className='about-title'>Get to Know Find-Do</h1>
                    <h2 className="about-subheading">Welcome to Find-Do. We are here wherever you are! We will always find the right fun activities for you to do!</h2>
                </div>
            </div>
            <div className="about-text">
               <h2 className="about-us">About Us</h2>
               <p className="about-text">Have you ever been abroad not knowing what to do? Find-do is a travel companion for finding interesting activities to partake in across different countries. The activities are sorted into different categories (such as "culinary" or "extreme sports") for ease of search. Essential information is also displayed for each country such as currencies, languages and calling codes. Users can create accounts to save their favourite activities and post reviews.</p>
            </div>
        </div>
    )
}

export default About;