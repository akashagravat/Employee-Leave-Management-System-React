import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Authenticate from '../Authenticate/Authenticate'
// import Loginnot from '../Authenticate/Loginnot'
import Dashboard from '../Components/Dashboard'

const UsersDashboard = () => {
    const { tokens } = Authenticate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (tokens === undefined) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, []);
    if (loading) {
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <Dashboard />
        </>
    )
}

export default UsersDashboard