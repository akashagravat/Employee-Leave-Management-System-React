import React from 'react'
import { NavLink } from 'react-router-dom'
import Loginnot from '../Authenticate/Loginnot'


const Header = () => {
    // Loginnot();
    return (
        <div> <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <div className="nav-link" data-widget="pushmenu" role="button" to="/dashboard"><i className="fas fa-bars" /></div>
                </li>

            </ul>
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <NavLink className="nav-link" to="/logout" title='Logout' >
                        <i className='fas fa-sign-out-alt' />
                    </NavLink>
                </li>
                <li className="nav-item">
                    <div className="nav-link" data-widget="fullscreen" to="" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </div>
                </li>

            </ul>
        </nav></div>

    )
}

export default Header