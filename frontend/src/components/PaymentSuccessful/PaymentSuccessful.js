/* Arthur: Siyuan Chen */
import './PaymentSuccessful.css';
import React, { useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Navigate } from 'react-router-dom';


function PaymentSuccessful(props) {

    const [backTrips, setBackTrips] = useState(false);

    if(backTrips){ //allow user to go Trips page to check their bookings
        return <Navigate to="/Trips" />
    }

    return (
        <div >
            <Header />
            <div className='paySucc'>
            <h2>Booking successful</h2>
            <p>Your booking ID is: {props.confirmId}</p>

            <button className="backButton" onClick={(e)=>setBackTrips(true)}>VIEW ALL BOOKINGS</button>
            </div>
            <Footer />
        </div>
    );
}

export default PaymentSuccessful;