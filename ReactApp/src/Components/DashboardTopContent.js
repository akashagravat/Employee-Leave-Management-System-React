import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardTopContent = (props) => {
    return (

        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">{props.heading}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><NavLink to="">Home</NavLink></li>
                            <li className="breadcrumb-item active">{props.heading}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardTopContent