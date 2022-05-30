import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Authenticate from '../Authenticate/Authenticate'
// import Loginnot from '../Authenticate/Loginnot';
import DashboardTopContent from './DashboardTopContent';
import LeaveCard from './LeaveCard';
const Dashboard = () => {

    return (
        <div>{/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <DashboardTopContent heading="Dashboard" />
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}
                        <LeaveCard />
                        {/* /.row */}
                        {/* Main row */}

                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}
        </div>

    )
}

export default Dashboard