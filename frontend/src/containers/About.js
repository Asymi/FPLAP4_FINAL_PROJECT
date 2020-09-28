import React from 'react'
import { NavBar } from '..components/Components'

const About = () => {
    return(
        <div>
            <NavBar/>
            <h1 className='about-title'>About TBC</h1>
            <div className="about-text">
               <p>placeholder text</p>
            </div>
        </div>
    )
}

export default About;