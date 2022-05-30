import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (<div> <footer className="main-footer">
        <strong>Copyright © 2022 <NavLink to="">Employee Managemenet System</NavLink>.</strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
            <b>Version</b> 1.1.0
        </div>
    </footer>
        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
            {/* Control sidebar content goes here */}
        </aside>
        {/* /.control-sidebar */}
    </div>


    )
}

export default Footer