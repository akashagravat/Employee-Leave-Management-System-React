import React from 'react'
import Loginnot from '../Authenticate/Loginnot';
import Footer from '../Components/Footer';
import SideNavbar from '../Components/SideNavbar';

const RedirectPageSideFooter = (props) => {
    // console.log(props.val);
    if (props.val === false) {

        return "";
    }

    if (props.val === true) {
        return (<><SideNavbar /><Footer /></>);
    }
}

export default RedirectPageSideFooter