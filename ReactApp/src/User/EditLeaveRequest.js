import React, { useEffect, useState } from 'react'
import InputField, { TextArea } from '../Authenticate/InputField'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import Authenticate from '../Authenticate/Authenticate';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosRequest from './../Authenticate/AxiosRequest'
import LoaderDesign from '../Admin/LoaderDesign';

const EditLeaveRequest = () => {

    const { user, http } = Authenticate();
    const { getspecifleave, editleaverequest } = AxiosRequest();
    const navigate = useNavigate();
    const { id } = useParams();
    let formdata = "";
    // console.log(id)
    const MySwal = withReactContent(Swal);
    const [loading, setLoading] = useState(true);
    const [formval, setFormval] = useState({ name: "", leavesubject: "", approoved: 0 });
    const [formerr, setFormerr] = useState({});
    const [issubmit, setIssubmit] = useState(false);
    const [validationerr, serValidationerr] = useState("");
    const changevalue = (e) => {
        const { name, value } = e.target;
        setFormval({ ...formval, [name]: value });
    }
    const getformvalue = async () => {
        const res = await getspecifleave(id);
        setFormval({ ...formval, leavesubject: res.data.leave[0].Subject, reasonforleave: res.data.leave[0].Reason, leavestartdate: res.data.leave[0].StartDate, leaveenddate: res.data.leave[0].EndDate, name: res.data.leave[0].user.first_name + " " + res.data.leave[0].user.last_name });
        setLoading(false);
        // console.log(res.data.leave[0]);
    }
    useEffect(() => {
        getformvalue();
    }, []);

    const addformdata = (approovevalue) => {
        const formData = new FormData;
        // console.log('it woek')
        formData.append("reasonforleave", formval.reasonforleave);
        formData.append("leavestartdate", formval.leavestartdate);
        formData.append("leaveenddate", formval.leaveenddate);
        formData.append("leavesubject", formval.leavesubject);
        formData.append("approoved", approovevalue);

        return formData;
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        const validateerr = validate(formval);
        setFormerr(validateerr);
        setIssubmit(true);

        if (Object.keys(validateerr).length === 0 && issubmit) {

            addleave(addformdata(0));
        }
    }
    const validate = (value) => {
        const errors = {};
        if (!value.reasonforleave) {
            errors.reasonforleave = "Reason For Leave is Required";
        }
        if (!value.leavestartdate) {
            errors.leavestartdate = "Start Date is Required";
        }
        if (!value.leaveenddate) {
            errors.leaveenddate = "End Date is Required";
        }
        if (!value.leavesubject) {
            errors.leavesubject = "Subject is Required";

        }
        return errors;
    }
    const addleave = async (formval) => {
        document.getElementById("createleaverequest").innerHTML = "Updating....";
        // console.log(formval);

        const res = await editleaverequest(id, formval);
        if (res.data.status === 422) {
            setFormerr(res.data.validation_error);
        }
        if (res.data.status === 200) {
            MySwal.fire({
                title: res.data.message,
                text: "Leave Id is: " + res.data.leaveid,
                icon: 'success'
            }).then(navigate('/dashboard'));
        }
    }
    const approverequest = async () => {

        await addleave(addformdata(1));
    }
    const rejectrequest = async () => {
        await addleave(addformdata(2));
    }
    if (loading) {
        return (<LoaderDesign />)
    }
    let approovedbutton = "";
    let rejectbutton = "";
    if (user.role_id === 1) {
        approovedbutton = <button className="btn btn-success ml-2" id="approoved_request" onClick={approverequest}>Approoved</button>;
        rejectbutton = <button className="btn btn-danger ml-2" id="reject_request" onClick={rejectrequest}>Reject</button>;

    }
    return (
        <>
            <section className="content">
                <div className="container-fluid">


                    <div className="container main-block">
                        <div className="row justify-content-center ">
                            <div className="col-12 ">
                                <div className="card">
                                    <h5 className="card-header bg-secondary">Add Leave Request</h5>
                                    <form method='POST' onSubmit={handlesubmit} encType="multipart/form-data">
                                        <div className="card-body">
                                            {/* changeval={change} */}
                                            <InputField id="name" value={formval.name} placeholder="Enter Employee Name" labelname="Employee Name" type="text" name="empname" disabledval="disabled" />
                                            <InputField id="leavesubject" changeval={changevalue} error={formerr.leavesubject} value={formval.leavesubject} placeholder="Leave Subject" labelname="Leave Subject" type="text" name="leavesubject" />
                                            <TextArea id="reasonforleave" changeval={changevalue} value={formval.reasonforleave} error={formerr.reasonforleave} placeholder="Reason For Leave" labelname="Reason for leave" name="reasonforleave" row="3" />
                                            <InputField id="leavestartdate" value={formval.leavestartdate} changeval={changevalue} error={formerr.leavestartdate} labelname="Leave Start Date" type="date" name="leavestartdate" />
                                            <InputField id="leaveenddate" value={formval.leaveenddate} changeval={changevalue} error={formerr.leaveenddate} labelname="Leave End Date" type="date" name="leaveenddate" />
                                            <button type="submit" className="btn btn-primary " id="createleaverequest">Update</button>
                                            {approovedbutton}
                                            {rejectbutton}
                                        </div>
                                    </form>
                                </div>
                            </div>


                        </div>



                    </div>

                </div>
            </section>
        </>
    )
}

export default EditLeaveRequest