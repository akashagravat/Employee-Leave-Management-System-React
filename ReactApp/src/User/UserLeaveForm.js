import React, { useState } from 'react'
import InputField, { TextArea } from '../Authenticate/InputField'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import Authenticate from '../Authenticate/Authenticate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const UserLeaveForm = () => {


    const { tokens, user, http } = Authenticate();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [formval, setFormval] = useState({ name: user.first_name + " " + user.last_name, leavesubject: "" });
    const [formerr, setFormerr] = useState({});
    const [issubmit, setIssubmit] = useState(false);
    const [validationerr, serValidationerr] = useState("");
    const changevalue = (e) => {
        const { name, value } = e.target;
        setFormval({ ...formval, [name]: value });
    }



    const handlesubmit = (e) => {
        e.preventDefault();
        const validateerr = validate(formval);
        setFormerr(validateerr);
        setIssubmit(true);
        if (Object.keys(validateerr).length === 0 && issubmit) {
            addleave();
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
    const addleave = async () => {
        document.getElementById("createleaverequest").innerHTML = "Adding....";
        // console.log(usertokens);
        const res = await http.post("addleaaverequest", formval);
        // console.log(res.data);
        document.getElementById("createleaverequest").innerHTML = "Submit";

        if (res.data.status === 422) {
            setFormerr(res.data.validation_error);
        }
        if (res.data.status === 200) {
            MySwal.fire({
                title: <strong>{res.data.message}</strong>,
                icon: 'success'

            }).then(navigate('/viewleaverequest'));
        }
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
                                    <form method='POST' encType="multipart/form-data" onSubmit={handlesubmit}>
                                        <div className="card-body">
                                            {/* changeval={change} */}
                                            <InputField id="name" value={formval.name} placeholder="Enter Employee Name" labelname="Employee Name" type="text" name="empname" disabledval="disabled" />
                                            <InputField id="leavesubject" changeval={changevalue} error={formerr.leavesubject} value={formval.leavesubject} placeholder="Leave Subject" labelname="Leave Subject" type="text" name="leavesubject" />
                                            <TextArea id="reasonforleave" changeval={changevalue} value={formval.reasonforleave} error={formerr.reasonforleave} placeholder="Reason For Leave" labelname="Reason for leave" name="reasonforleave" row="3" />
                                            <InputField id="leavestartdate" changeval={changevalue} error={formerr.leavestartdate} labelname="Leave Start Date" type="date" name="leavestartdate" />
                                            <InputField id="leaveenddate" changeval={changevalue} error={formerr.leaveenddate} labelname="Leave End Date" type="date" name="leaveenddate" />


                                            <button type="reset" className="btn btn-danger " id="resetleaverequest">Reset</button>
                                            <button type="submit" className="btn btn-primary ml-2" id="createleaverequest">Submit</button>
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

export default UserLeaveForm