import React, { useEffect, useState } from 'react'
import AxiosRequest from '../Authenticate/AxiosRequest'
import { NewInput } from '../Authenticate/InputField'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import LoaderDesign from '../Admin/LoaderDesign';

const MyProfile = (props) => {

    const { getuser, updateuserprofile } = AxiosRequest();
    const MySwal = withReactContent(Swal);
    const app_url = "http://localhost:8000/storage/images/";
    const initialvalue = { first_name: "", last_name: '', email: '' };
    const [formval, setFormval] = useState(initialvalue);
    const [validationerr, setValidationerr] = useState({});
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState("");
    const [picture, setPicture] = useState({ image: "" });
    const getuserprofile = async () => {
        const res = await getuser();
        setFormval(res.data);
        if (res.data.UserImage === null) {
            setImage("avatar-car.png");
        } else {
            setImage(res.data.UserImage);
        }
        setLoading(false);
        return res;
    }
    const changevalue = (e) => {
        const { name, value } = e.target;
        setFormval({ ...formval, [name]: value });
    }
    const changeimage = (e) => {
        setPicture({ image: e.target.files[0] })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("first_name", formval.first_name);
        formData.append("last_name", formval.last_name);
        formData.append("profile", picture.image);
        const res = await updateuserprofile(formData);
        if (res.data.status === 422) {
            setValidationerr(res.data.validation_error);
        }
        if (res.data.status === 200) {
            setValidationerr("");
            MySwal.fire({
                title: <strong>{res.data.message}</strong>,
                icon: 'success'

            }).then(props.loginnot(true), getuserprofile());
        }
    }

    useEffect(() => {
        getuserprofile();
    }, []);

    if (loading) {
        return (<LoaderDesign />);
    }
    return (
        <div className='container'>
            <div className='card'>
                <h5 className='card-header bg-secondary'>My Profile</h5>
                <div className='card-body'>
                    <form className="form-horizontal" onSubmit={handlesubmit} method='post' encType="multipart/form-data">
                        <img src={app_url + "" + image} className='profileimg' />
                        <NewInput type="text" labelname="First Name" value={formval.first_name} err={validationerr.first_name} id="first_name" name="first_name" changeval={changevalue} placeholder="First Name" />
                        <NewInput type="text" labelname="Last Name" value={formval.last_name} err={validationerr.last_name} id="last_name" name="last_name" changeval={changevalue} placeholder="Last Name" />
                        <NewInput type="email" labelname="Email" value={formval.email} id="email" name="email" placeholder="Email" changeval={changevalue} disabledval="disabled" />
                        <NewInput type="file" labelname="User Profile" id="profile" name="profile" placeholder="User Profile" changeval={changeimage} accept="image/*" />

                        <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                                <button type="submit" className="btn btn-danger" >Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default MyProfile