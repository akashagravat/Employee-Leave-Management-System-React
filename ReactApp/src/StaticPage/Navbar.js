import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (

        <div> <nav className=" navbar navbar-expand navbar-white navbar-dark bg-danger ">
            {/* Left navbar links */}
            <NavLink to='/' className='navbar-brand'>Employee Managemenet</NavLink>

            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Navbar Search */}
                <li className='nav-item'>
                    <NavLink to='/login' className='nav-link'>Login</NavLink>
                </li>

                <li className='nav-item'>
                    <NavLink to='/register' className='nav-link'>Register</NavLink>
                </li>
            </ul>
        </nav></div>
    )
}

export default Navbar