import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoaderDesign from '../Admin/LoaderDesign';
import AxiosRequest from '../Authenticate/AxiosRequest';

const ViewSpecificRequest = () => {
    const { id } = useParams();
    const { getspecifleave } = AxiosRequest();
    const [userleave, setUserleave] = useState();
    const [loading, setLoading] = useState(true);
    const getrequest = async () => {
        const res = await getspecifleave(id);
        setUserleave(res.data.leave[0]);
        // console.log(res);
        setLoading(false);

    }

    useEffect(() => {
        getrequest();

    }, []);
    if (loading) {
        return (<h1><LoaderDesign /></h1>)
    }

    return (

        <div className='container'>
            <div className='card'>
                <h5 className='card-header bg-secondary'>View Leave</h5>
                <div className='card-body'>
                    <p><b>Subject :</b> {userleave.Subject}</p>
                    <p><b>Reason For Leave :</b> {userleave.Reason} </p>
                    <p><b>Leave Start Date :</b> {userleave.StartDate}</p>
                    <p><b>Leave End Date :</b> {userleave.EndDate}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewSpecificRequest