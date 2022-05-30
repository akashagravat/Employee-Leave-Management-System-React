import React from 'react'
import { NavLink } from 'react-router-dom'
import PageNotFoundImg from './../assets/Images/pagenotfound.jpg';

const PageNotFound = () => {

    return (
        <>      <div className=" content-wrapper notfound">
            <div className='container'>
                <img src={PageNotFoundImg} className='pagenotfoundimg' alt="" />
            </div>

        </div>
        </>
    )
}

export default PageNotFound