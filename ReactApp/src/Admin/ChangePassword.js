import React, { useState } from 'react'
import AxiosRequest from '../Authenticate/AxiosRequest';
import { NewInput } from '../Authenticate/InputField'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const ChangePassword = () => {
    const initialvalue = {
        oldpassword: "",
        newpassword: '',
        confirmpassword: '',
    };
    const [formval, setFormval] = useState(initialvalue);
    const [formerr, setFormerr] = useState(initialvalue);
    const MySwal = withReactContent(Swal);
    const { updatepassword } = AxiosRequest();
    const changevalue = (e) => {
        const { name, value } = e.target;
        setFormval({ ...formval, [name]: value });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        const res = await updatepassword(formval);
        console.log(res.data);
        if (res.data.status === 422) {
            setFormerr(res.data.validation_error);
        }
        if (res.data.status === 200) {
            setFormerr("");
            setFormval(initialvalue);
            MySwal.fire({
                title: res.data.message,
                icon: 'success'
            })
        }
    }
    return (
        <div className='container'>
            <div className='card'>
                <h5 className='card-header bg-secondary'>Change Password</h5>
                <div className='card-body'>
                    <form className="form-horizontal" onSubmit={handlesubmit} method='post' encType="multipart/form-data">
                        <NewInput type="text" changeval={changevalue} value={formval.oldpassword} labelname="Current Password" id="oldpassword" name="oldpassword" placeholder="Current Password" err={formerr.oldpassword} />
                        <NewInput type="text" changeval={changevalue} value={formval.newpassword} labelname="New Password" id="newpassword" name="newpassword" placeholder="New Password" err={formerr.newpassword} />
                        <NewInput type="text" changeval={changevalue} value={formval.confirmpassword} labelname="Confirm Password" id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" err={formerr.confirmpassword} />

                        <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                                <button type="submit" className="btn btn-danger" >Change Password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword