import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Authenticate from '../Authenticate/Authenticate'
import AxiosRequest from '../Authenticate/AxiosRequest'
import DashboardTopContent from '../Components/DashboardTopContent'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import SideNavbar from '../Components/SideNavbar'
import ViewLeave from './ViewLeave'



const ViewApproovedLeave = (props) => {

    const { getuserleaverequest, getapproovedleave, getrejectedleave } = AxiosRequest();
    const { tokens } = Authenticate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (tokens === undefined) {
            // setLoading
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [])
    if (loading) {
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <div className="content-wrapper">
                <DashboardTopContent heading="View-Leave-Request" />
                <ViewLeave tableid={props.tableid} fun={getapproovedleave()} />
            </div>
        </>)
}

export default ViewApproovedLeave