import axios from 'axios';
import React from 'react'
import Authenticate from './Authenticate'

const AxiosRequest = () => {
    const { http } = Authenticate();
    const loginrequest = async (formval) => {
        const res = await axios.post('http://127.0.0.1:8000/api/login', formval);
        return res;
    }
    const registerrequest = async (formval) => {
        const res = await axios.post('http://127.0.0.1:8000/api/register', formval);
        return res;
    }
    const getuserleaverequest = async () => {
        const res = await http.post('getuserleave');
        return res;
    }
    const getpendingleave = async () => {
        const res = await http.post(`getleave/${0}`);
        return res;
    }
    const updatepassword = async (formval) => {
        const res = await http.post('updatepassword', formval);
        return res;
    }
    const getapproovedleave = async () => {
        const res = await http.post(`getleave/${1}`);
        return res;
    }
    const getadminapproovedrequest = async () => {
        const res = await http.post(`getallrequest/${1}`);
        return res;
    }
    const getadminrejectedrequest = async () => {
        const res = await http.post(`getallrequest/${2}`);
        return res;
    }
    const getuser = async () => {
        const res = await http.post(`me`);
        return res;
    }

    const getrejectedleave = async () => {
        const res = await http.post(`getleave/${2}`);
        return res;
    }

    const getspecifleave = async (id) => {
        const res = await http.post(`leaverequest/show/${id}`);
        return res;
    }

    const getcountallleave = async () => {
        const res = await http.post('countleave');
        return res;
    }
    const deleteleave = async (e) => {
        const res = await http.post(`leave/delete/${e}`);
        return res;
    }
    const editleaverequest = async (e, formval) => {
        const res = await http.post(`leave/edit/${e}`, formval);
        return res;
    }

    const updateuserprofile = async (formval) => {
        const res = await http.post('updateuser', formval);
        return res;
    }

    const getalluserrequest = async () => {
        const res = await http.post(`getallrequest/${0}`);
        return res;
    }
    const getallusercounteave = async () => {
        const res = await http.post('countallleaves');
        return res;

    }
    return {
        getuserleaverequest,
        getspecifleave,
        getcountallleave,
        getapproovedleave,
        getrejectedleave,
        deleteleave,
        editleaverequest,
        getpendingleave,
        getuser,
        updateuserprofile,
        getalluserrequest,
        getallusercounteave,
        getadminapproovedrequest,
        getadminrejectedrequest,
        updatepassword,
        loginrequest,
        registerrequest
    }
}

export default AxiosRequest