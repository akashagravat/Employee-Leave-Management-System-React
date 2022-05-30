import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Authenticate from '../Authenticate/Authenticate';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const Logout = (props) => {

    const { logouttoken } = Authenticate();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const userLogout = async () => {
        await logouttoken();
        props.loginnot(false);
        MySwal.fire({
            title: "You Are Logged Out",
            icon: 'success'
        }).then(
            navigate('/login'));
    }
    useEffect(() => {
        if (props.val === true) {
            userLogout();
        } else {

            navigate('/login')
        }
    }, []);
}

export default Logout