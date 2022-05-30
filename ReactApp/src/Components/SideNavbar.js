import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LoaderDesign from '../Admin/LoaderDesign';
import Authenticate from '../Authenticate/Authenticate'
import AxiosRequest from '../Authenticate/AxiosRequest';
import Loginnot from '../Authenticate/Loginnot';
import SidebarComponent from './SidebarComponent';

const SideNavbar = () => {
    const app_url = "http://localhost:8000/storage/images";
    const { getuser } = AxiosRequest();
    const { tokens } = Authenticate();
    const [user, setUser] = useState();
    const [profileimg, setProfileimg] = useState("");
    const [loading, setLoading] = useState(true);

    const getuserdetails = async () => {
        // console.log('it wok')
        const res = await getuser();
        setUser(res.data);
        if (res.data.UserImage === null) {
            setProfileimg("avatar-car.png");
        } else {
            setProfileimg(res.data.UserImage);
        }
        setLoading(false);
        return res;
    }

    useEffect(() => {
        getuserdetails();
    }, []);
    if (loading) {
        return <LoaderDesign />
    }
    let addleave, viewleave, approovedleave, rejectleave, pendingleaves = "";
    let userrole = "";
    if (user.role_id === 2) {
        userrole = "Employee";
        addleave = <SidebarComponent link="/addleaverequest" icon="fas fa-plus" title="Add Leave Request" />;
        viewleave = <SidebarComponent link="/viewleaverequest" icon="fas fa-eye" title="View Requested Leaves" />;
        approovedleave = <SidebarComponent link="/approovedleaverequest" icon="fas fa-check" title="Approved Leaves" />;
        rejectleave = <SidebarComponent link="/rejectedleaverequest" icon="fas fa-ban" title="Rejected Leaves" />;
    } if (user.role_id === 1) {
        userrole = "Admin";
        pendingleaves = <SidebarComponent link="/admin/allrequest" icon="fas fa-eye" title="Requested Leaves" />;

    }
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <NavLink to="/dashboard" className="brand-link">
                    <img src={app_url + "/adminltelogo.png"} alt="Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">{userrole} Dashboard</span>
                </NavLink>

                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={app_url + "/" + profileimg} width={160} height={160} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <NavLink to="/myprofile" className="d-block ">{user.first_name} {user.last_name}</NavLink>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <SidebarComponent link="/dashboard" icon="fas fa-tachometer-alt" title="Dashboard" />
                            {addleave}
                            {pendingleaves}
                            {viewleave}
                            {approovedleave}
                            {rejectleave}
                            <SidebarComponent link="/myprofile" icon="fas fa-user" title="My Profile" />
                            <SidebarComponent link="/changepassword" icon="fas fa-lock" title="Change Password" />
                            <SidebarComponent link="/logout" icon="fas fa-sign-out-alt" title="Logout" />
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default SideNavbar