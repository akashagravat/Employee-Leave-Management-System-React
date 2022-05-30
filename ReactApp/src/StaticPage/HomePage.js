import React from 'react'
import Navbar from './Navbar'

const HomePage = () => {
    return (
        <>

            <div className='container mt-5'>
                <div className='card '>
                    <h5 className='card-header bg-secondary'>Parts</h5>
                    <div className='card-body'>
                        <div className='Admin'>
                            <p>Approved/Reject Service Request</p>
                        </div>
                        <div className='User'>
                            <p>Add Service Request</p>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default HomePage