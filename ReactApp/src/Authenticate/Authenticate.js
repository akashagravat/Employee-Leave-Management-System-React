import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import { setupInterceptorsTo } from './AxiosCode';
// import './AxiosCode.d.Ts'
const Authenticate = () => {
    const [cookies, setCookie] = useCookies(['tokens', 'user']);
    const cookieval = new Cookies();
    const MySwal = withReactContent(Swal);

    const navigate = useNavigate();
    const hours = 24;
    const now = new Date().getTime();

    const geTokens = () => {
        const usertokens = cookies.tokens;
        return usertokens;
    }
    const getUser = () => {
        const userdetails = cookies.user;
        return userdetails;
    }

    const [tokens, setTokens] = useState(geTokens());
    const [user, setUser] = useState(getUser());
    const [time, setTime] = useState("");
    const saveToken = (user, tokens, role) => {
        setCookie('tokens', tokens);
        setCookie('user', user);
        setTokens(tokens);
        setUser(user);
        setTime(now);
        setCookie("setuptime", now);
        navigate('/dashboard');

    }
    const http = setupInterceptorsTo(

        axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            headers: {
                Token: tokens,
                Authorization: 'Bearer' + tokens,
            },
        })

    );

    const logouttoken = async () => {
        const res = await http.post('logout', "");
        if (res.data.status === 200) {
            cookieval.remove('tokens');
            cookieval.remove('user');

        }
    }
    const refreshtoken = async () => {
        const response = await http.post('/refresh', "");
        // console.log(response);

        if (response.status === 200) {
            setCookie('tokens', response.data.access_token);
        }
    }

    useEffect(() => {

        if (tokens !== undefined) {
            if (setTime === "") {
                setCookie('setuptime', now)
            } else {
                if ((now - cookieval.get('setuptime')) > hours * 3600 * 1000) {
                    cookieval.remove('tokens');
                    cookieval.remove('user');
                    MySwal.fire({
                        title: "Session Expired",
                        text: "You Are Logged Out",
                        icon: 'warning'
                    }).then(navigate('/login'));
                    // navigate('/login');
                    console.clear();
                }
            }
        }

    }, [])


    return {
        setToken: saveToken,
        tokens,
        user,
        getUser,
        geTokens,
        logouttoken,
        http,
        refreshtoken
    }

}


export default Authenticate