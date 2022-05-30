import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import 'datatables.net-dt'
import AxiosRequest from '../Authenticate/AxiosRequest'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import LoaderDesign from '../Admin/LoaderDesign'


const ViewLeave = (props) => {
    const { deleteleave, getuser } = AxiosRequest();
    const navigate = useNavigate();
    const location = useLocation();
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(true);
    const [leave, setLeave] = useState({});
    const [userrole, setUserrole] = useState("");
    const getuserrole = async () => {
        const res = await getuser();
        setUserrole(res.data.role_id);
    }
    const leaverequest = async () => {
        const res = await props.fun;

        return res;
    }

    const getleaverequest = async () => {
        const res = await leaverequest();
        // console.log(res.data.status)
        // console.log('else woe')
        if (res.data.status === 521) {
            // console.log('it wokr')
            MySwal.fire({
                title: res.data.message,
                icon: 'warning'
            }).then(navigate('/pagenotfound'));

        } else {
            if (res.data.status === 422) {
                setLeave({ leaves: res.data.Leave, status: 422 });
                setLoading(false);
                setTimeout(function () {
                }, 1000);
            }
            if (res.data.status === 200) {
                setLeave({ leaves: res.data.leave, status: 200 });
                setLoading(false);
            }

            setTimeout(function () {
                $('#' + props.tableid + '').DataTable();
            }, 1000);
        }
    }

    const DeleteRequest = async (e) => {
        // console.log(e.target.id)
        if (e !== "") {
            const result = await deleteleave(e);
            if (result.data.status === 200) {
                setLoading(true);
                MySwal.fire({
                    title: result.data.message,
                    icon: 'success'
                }).then(navigate('/dashboard'));
            }
        }
    }

    const ViewRequest = (e) => {
        if (e !== "") {
            navigate(`/leave/show/${e}`);
        }
    }

    const Editrequest = (e) => {
        if (e !== "") {
            navigate(`/leave/edit/${e}`);
        }
    }
    useEffect(() => {
        getuserrole();
        getleaverequest();
    }, []);

    let tablerow = '';
    let tablecol = "";
    if (loading) {
        tablerow = <tr><th colSpan={7}><LoaderDesign /></th></tr>

    }
    if (!loading) {
        if (userrole === 1) {
            tablecol = <th>Request By</th>;
        }
        // console.log(leave)
        if (leave.status === 200) {

            tablerow = leave.leaves.map((item, index) => {
                // console.log(item)
                let editbutton = "";
                let tablecolm = "";
                let deletebutton = "";
                if (item.IsAprooved === 0) {
                    editbutton = <button id={item.id} className="btn btn-primary mr-2" onClick={(e) => Editrequest(e.target.id)}><i className='fa fa-edit'></i></button>;
                    if (userrole === 2) {
                        deletebutton = <button id={item.id} className="btn btn-danger mr-2" onClick={(e) => DeleteRequest(e.target.id)}><i className='fa fa-trash-alt'></i></button>;
                    }
                }

                if (userrole === 1) {
                    tablecolm = <td>{item.user.first_name} {item.user.last_name}</td>
                }
                return (<tr key={item.id}>
                    <td>{index + 1}</td>
                    {tablecolm}
                    <td>{item.id}</td>
                    <td>{item.Subject}</td>
                    <td>{item.StartDate}</td>
                    <td>{item.EndDate}</td>
                    <td>{item.Reason}</td>
                    <td>
                        <button id={item.id} className="btn btn-success mr-2" onClick={(e) => ViewRequest(e.target.id)}><i className='fa fa-eye'></i></button>
                        {editbutton}
                        {deletebutton}
                    </td>
                </tr>)
            });
        }
        if (leave.status === 422) {
            tablerow = ""
        }

    }
    return (
        <>
            <div className='container'>
                <div className='card '>
                    <h5 className='card-header bg-secondary'>View Leave</h5>
                    <div className='card-body'>
                        <table className='table table-hover leavetable' id={props.tableid}>
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    {tablecol}
                                    <th>Leave ID</th>
                                    <th>Subject</th>
                                    <th>Leave Start Date</th>
                                    <th>Leave End Date</th>
                                    <th>Reason For Leave</th>
                                    <th>Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {tablerow}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewLeave