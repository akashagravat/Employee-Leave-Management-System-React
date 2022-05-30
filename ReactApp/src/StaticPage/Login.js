import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import InputField from './../Authenticate/InputField';
import Navbar from './Navbar';
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import Authenticate from '../Authenticate/Authenticate';
import LoaderDesign from '../Admin/LoaderDesign';
import AxiosRequest from '../Authenticate/AxiosRequest';


const Login = (props) => {


    const initialvalue = {
        email: "",
        password: "",


    };
    const MySwal = withReactContent(Swal);
    const { setToken, tokens } = Authenticate();
    const { loginrequest } = AxiosRequest();
    const [formval, setFormval] = useState(initialvalue);
    const [loading, setLoading] = useState(true);
    const [formerr, setFormerr] = useState({});
    const [issubmit, setIssubmit] = useState(false);
    const [validationerr, serValidationerr] = useState("");
    const navigate = useNavigate();
    const changevalue = (e) => {
        const { name, value } = e.target;
        setFormval({ ...formval, [name]: value });
    }
    useEffect(() => {
        if (tokens !== undefined) {
            // setLoading
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
        const validateerr = validate(formval);
        setFormerr(validateerr);
        setIssubmit(true);
        if (Object.keys(validateerr).length === 0) {

            loginuser();
        }
    }
    const validate = (value) => {
        const errors = {};
        const emailvalid = /\S+@\S+\.\S+/;
        if (!value.email) {
            errors.email = "Username is Required";
        } else if (!emailvalid.test(value.email)) {
            errors.email = "Please Enter Valid Username";
        } if (!value.password) {
            errors.password = "Password is Required";
        }
        else if (value.password.length < 6) {
            errors.password = "Password Must be greater than or equal 6 digit";
        }
        return errors;
    }
    const loginuser = async () => {

        document.getElementById('login').innerHTML = 'Loging in...';
        const res = await loginrequest(formval);
        document.getElementById('login').innerHTML = 'Login';
        if (res.data.status === 422) {
            MySwal.fire({
                title: res.data.validation_error,
                icon: 'error'
            });
        } else {
            props.loginnot(true);
            setToken(res.data.user_detail, res.data.access_token, "");
        }

    }

    // console.log(cookies);
    return (
        <>

            <div className="container main-block mt-5">

                <div className=" card">
                    <h5 className="card-header bg-secondary">Login Form</h5>
                    <div className='card-body'>
                        <p className='text-danger'>  {validationerr} </p>
                        <form className="loginform" onSubmit={handlesubmit} >
                            <InputField id="email" placeholder="Enter UserName" labelname="User Name" type="email" name="email" value={formval.email} changeval={changevalue} error={formerr.email} />
                            <InputField id="password" placeholder="Enter Password" labelname="Password" type="password" name="password" value={formval.password} changeval={changevalue} error={formerr.password} />
                            <NavLink to="/forgot-password" className='nav-link ' >Forgot Password <i className='fas fa-arrow-right ml-2'></i></NavLink>
                            <button type="submit" className='btn btn-primary form-control mt-3' name="login" id="login" > Login </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login