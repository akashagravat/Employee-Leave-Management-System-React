import React from 'react'
import Loginnot from '../Authenticate/Loginnot';
import Header from '../Components/Header';
import Navbar from '../StaticPage/Navbar';

const RedirectPage = (props) => {

    if (props.val === false) {

        return <Navbar />;
    }

    if (props.val === true) {
        return (<Header />);
    }
}

export default RedirectPage