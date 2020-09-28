import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return(
        <>
            <div className='navbar'>
            </div>
            <nav>
                <NavLink to='/'></NavLink>
                <NavLink to='/'>Search</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/dashboard'>Profile</NavLink>
            </nav>
        </>            
    )
}

export default NavBar;