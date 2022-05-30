import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarComponent = (props) => {
    return (

        <li className="nav-item">
            <NavLink to={props.link} className="nav-link">
                <i className={"nav-icon  " + props.icon} />
                <p>
                    {props.title}
                </p>
            </NavLink>
        </li>

    )
}

export default SidebarComponent