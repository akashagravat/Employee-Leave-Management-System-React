import React from 'react'
import { NavLink } from 'react-router-dom'
import InputField from '../Authenticate/InputField'
import Navbar from './Navbar'

const ForgotPassword = () => {
    return (
        <>

            <div className="container main-block mt-5">
                <div className=" card">
                    <h5 className="card-header">Forgot Password</h5>
                    <div className='card-body'>
                        <form className="loginform"  >
                            <InputField id="email" labelname="Email" type="email" name="email" placeholder="Enter Your Email" />
                            <NavLink to="/login" className='nav-link text-black' ><i className='fas fa-arrow-left mr-2'></i>Login</NavLink>
                            <button type="submit" className='btn btn-primary mt-3 form-control' name="login" id="login" > Forgot Password </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ForgotPassword