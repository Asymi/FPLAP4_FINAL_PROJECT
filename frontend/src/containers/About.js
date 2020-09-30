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
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
        </div>
    )
}

export default About;