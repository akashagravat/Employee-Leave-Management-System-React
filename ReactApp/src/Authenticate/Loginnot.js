import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Authenticate from './Authenticate';
const Loginnot = () => {
    const { tokens } = Authenticate();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    if (tokens === undefined) {
        // setLoading
        navigate('/');
    } else {
        setLoading(false);
    }
    if (loading) {
        return <h1>Loading ...</h1>
    }

}

export default Loginnot