import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import LoaderDesign from '../Admin/LoaderDesign'
import Authenticate from '../Authenticate/Authenticate'
import AxiosRequest from '../Authenticate/AxiosRequest'

import InputField from '../Authenticate/InputField'
import Navbar from './Navbar'

const Register = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const { registerrequest } = AxiosRequest();
    const initialvalue = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",

    };
    const [formval, setFormval] = useState(initialvalue);
    const [formerr, setFormerr] = useState({});
    const [issubmit, setIssubmit] = useState(false);
    const { tokens } = Authenticate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (tokens !== undefined) {
            navigate('/dashboard');
        } else {
            setLoading(false);
        }
    }, [])
    if (loading) {
        return <LoaderDesign />
    }

    const handlesubmit = (e) => {
        e.preventDefault();

        const validaytionval = validate(formval);
        setFormerr(validaytionval);
        setIssubmit(true);
        if (Object.keys(validaytionval).length === 0) {

            registeruser();
        }
    }
    const validate = (value) => {
        const errors = {};

        const compulsory = /^[a-zA-Z]+$/;
        const emailvalid = /\S+@\S+\.\S+/;
        if (!value.fname) {
            errors.fname = "First Name is Required";
        } else if (!compulsory.test(value.fname)) {
            errors.fname = "Enter only Characters";
        } if (!value.lname) {
            errors.fname = "Last Name is Required";
        } else if (!compulsory.test(value.lname)) {
            errors.lname = "Enter only Characters";
        } if (!value.email) {
            errors.email = "Email is Required";
        } else if (!emailvalid.test(value.email)) {
            errors.email = "Please Enter Valid Email";
        } if (!value.password) {
            errors.password = "Password is Required";
        } else if (value.password.length < 8) {
            errors.password = "Password Must be greater than or equal 8 digit";
        } if (!value.cpassword) {
            errors.cpassword = "Confirm Password is Required";
        } if (value.cpassword.length < 8) {
            errors.cpassword = "Password Must be greater than or equal 8 digit";
        } else if (value.password !== value.cpassword) {
            errors.cpassword = "Password and Confirm Password Not Match";

        }
        return errors;
    }

    const registeruser = async () => {

        document.getElementById('register').innerHTML = 'Registering...';

        const res = await registerrequest(formval);

        if (res.data.status === 200) {

            MySwal.fire({
                title: <strong>{res.data.message}</strong>,
                icon: 'success'
            }).then(navigate('/login'));

        }

        if (res.data.status === 422) {
            setFormerr(res.data.validation_error);
        }
    }
    const changevalue = (e) => {
        const { name, value } = e.target;
        setFormval({ ...formval, [name]: value });
    }

    return (

        <>

            <div className="container main-block mt-5">

                <div className=" card">
                    <h5 className="card-header bg-secondary">Registration Form</h5>
                    <div className='card-body' >
                        <form className="registerform " method='POST' onSubmit={handlesubmit}>

                            <InputField id="fname" labelname="First Name" type="text" name="fname" value={formval.fname} changeval={changevalue} error={formerr.fname} />
                            <InputField id="lname" labelname="Last Name" type="text" name="lname" value={formval.lname} changeval={changevalue} error={formerr.lname} />
                            <InputField id="email" labelname="Email" type="email" name="email" value={formval.email} changeval={changevalue} error={formerr.email} />
                            <InputField id="password" labelname="Password" type="password" name="password" value={formval.password} changeval={changevalue} error={formerr.password} />
                            <InputField id="cpassword" labelname="Confirm Password" type="password" name="cpassword" value={formval.cpassword} changeval={changevalue} error={formerr.cpassword} />


                            <button type="submit" className='btn btn-primary form-control ' name="register" id="register" > Register </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register