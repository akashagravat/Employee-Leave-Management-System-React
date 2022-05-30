import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import LoaderDesign from '../Admin/LoaderDesign';
import AxiosRequest from '../Authenticate/AxiosRequest'
import Loginnot from '../Authenticate/Loginnot';
import Dashboardcard from './Dashboardcard';

const LeaveCard = () => {
    // Loginnot();
    const { getcountallleave, getuser, getallusercounteave } = AxiosRequest();
    const [counts, setCounts] = useState({ pending: "", approoved: "", reject: "", allleave: "" });
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const getloginuser = async () => {
        const res = await getuser();
        setUser({ roleid: res.data.role_id });
        if (res.data.role_id === 1) {
            getcount(1);
        }
        if (res.data.role_id === 2) {
            getcount(2);
        }
        // console.log(res)
    }
    const getcount = async (val) => {

        let result = "";
        if (val === 1) {
            result = await getallusercounteave();
            setCounts({ pending: result.data.pending, approoved: result.data.Approoved, reject: result.data.Reject, allleave: result.data.allleave });
            setLoading(false);
        } if (val === 2) {
            result = await getcountallleave();
            setCounts({ pending: result.data.pending, approoved: result.data.Approoved, reject: result.data.Reject, allleave: result.data.allleave });
            setLoading(false);
        }

    }
    useEffect(() => {
        getloginuser();
        getcount();
    }, [])
    if (loading) {
        return (<LoaderDesign />);
    }
    let title1, title2, title3, title4, link1, link2, link3, link4 = "";
    if (user.roleid === 1) {
        title1 = "Employee Total Leaves";
        title2 = "Employee Approoved Leaves";
        title3 = "Employee Rejected Leaves";
        title4 = "Employee Pending Leaves";
        link1 = "/admin/allrequest";
        link2 = "/admin/approovedleave";
        link3 = "/admin/rejectedleave";
        link4 = "/admin/allrequest";
    } else {
        title1 = "Total Leaves";
        title2 = "Approoved Leaves";
        title3 = "Rejected Leaves";
        title4 = "Pending Leaves";
        link1 = "/viewleaverequest";
        link2 = "/approovedleaverequest";
        link3 = "/rejectedleaverequest";
        link4 = "/viewleaverequest";

    }
    return (
        <div className="row">
            <Dashboardcard count={counts.allleave} bg="bg-info" title={title1} icon="ion ion-pricetag" link={link1} />
            <Dashboardcard count={counts.approoved} bg="bg-success" title={title2} icon="fa fa-check" link={link2} />
            <Dashboardcard count={counts.reject} bg="bg-warning" title={title3} icon="ion ion-close" link={link3} />
            <Dashboardcard count={counts.pending} bg="bg-danger" title={title4} icon="ion ion-clipboard" link={link4} />
        </div>

    )
}

export default LeaveCard