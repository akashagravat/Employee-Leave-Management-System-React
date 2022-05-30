import React from 'react'
import { NavLink } from 'react-router-dom'

const Dashboardcard = (props) => {
    return (

        <div className="col-lg-3 col-6">
            <div className={"small-box " + props.bg}>
                <div className="inner">
                    <h3>{props.count}</h3>
                    <p>{props.title}</p>
                </div>
                <div className="icon">
                    <i className={props.icon} />
                </div>
                <NavLink to={props.link} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></NavLink>
            </div>
        </div>
    )
}

export default Dashboardcard