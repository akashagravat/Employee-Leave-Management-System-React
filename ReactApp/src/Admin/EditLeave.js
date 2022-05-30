import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Authenticate from '../Authenticate/Authenticate'
import AxiosRequest from '../Authenticate/AxiosRequest'
import DashboardTopContent from '../Components/DashboardTopContent'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import SideNavbar from '../Components/SideNavbar'
import EditLeaveRequest from '../User/EditLeaveRequest'
import MyProfile from '../User/MyProfile'
import ViewLeave from '../User/ViewLeave'
import ChangePassword from './ChangePassword'
import LoaderDesign from './LoaderDesign'

const EditLeave = (props) => {
    const location = useLocation();
    const { id } = useParams();
    const { tokens } = Authenticate();
    const { getalluserrequest, getadminapproovedrequest, getadminrejectedrequest } = AxiosRequest();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (tokens === undefined) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [])
    if (loading) {
        return <LoaderDesign />
    }
    let newcomponent = "";
    let topheading = "";
    if (location.pathname === "/leave/edit/" + id) {
        newcomponent = <EditLeaveRequest />;
        topheading = "Edit Leave Request";
    }
    if (location.pathname === "/myprofile") {
        newcomponent = <MyProfile loginnot={props.loginnot} />
        topheading = "My Profile";
    }
    if (location.pathname === "/admin/allrequest") {
        newcomponent = <ViewLeave fun={getalluserrequest()} tableid="pendingleave" />
        topheading = "Pending User Request";
    }
    if (location.pathname === "/admin/approovedleave") {
        newcomponent = <ViewLeave fun={getadminapproovedrequest()} tableid="approovedleaves" />
        topheading = "Approoved Leave Request";
    }
    if (location.pathname === "/changepassword") {
        newcomponent = <ChangePassword />
        topheading = "Change Password";

    }

    if (location.pathname === "/admin/rejectedleave") {
        newcomponent = <ViewLeave fun={getadminrejectedrequest()} tableid="rejectedleaves" />
        topheading = "Rejected Leave Request";
    }

    return (
        <>
            <div className="content-wrapper">
                <DashboardTopContent heading={topheading} />
                {newcomponent}
            </div>
        </>
    )
}

export default EditLeave