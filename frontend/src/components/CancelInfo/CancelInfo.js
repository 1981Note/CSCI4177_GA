/** 
 * CSCI4177 - A3
 * Yiyun Gong
 * Canceled Flight Info page
*/
import "./CancelInfo.css"
import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import flight from '../../img/flights.png';
import { Navigate } from "react-router-dom";
import axios from "axios";

function CancelInfo() {

    const flightCanceled = window.flightCanceled

    const [goBackTrips, setgoBackTrips] = React.useState(false);
    const [cancelConfirmed, setcancelConfirmed] = React.useState(false);

    useEffect(() => {
        if (cancelConfirmed) {
            
            axios.delete(`https://csci4177-group18.onrender.com/api/bookings/${flightCanceled._id}`).then(res => {
                const data = res.data;                
                console.log(data);
                setgoBackTrips(true)
            }).catch(err => console.log(err))
        }
    },[cancelConfirmed, flightCanceled._id, goBackTrips]);

    if (goBackTrips) {
        return <Navigate to="/Trips"/>;
    }

    return (
        <div>
            
            <Header />
            <div>
                <h2 class='trips-title'>Cancel Booking</h2>
                <div>
                    <form class="flight-info">
                        <h2 class="flight-number-title"> {flightCanceled.flight.flight_number}    {new Date(flightCanceled.flight.departure_date).toISOString().substring(0, 10)}</h2>
                        <h2></h2>
                            <div>
                                <img src={flight} alt="flight" width={50} height={50} />
                                <p> {flightCanceled.flight.flight_company} </p>
                                <p> {flightCanceled.flight.origin} </p>
                                <p> To </p>
                                <p> {flightCanceled.flight.destination} </p>
                                <p> {flightCanceled.flight.price} </p>
                            </div>
                    </form>
                </div>
                <h2 class='trips-title'> Passengers </h2>
                <div>
                    {flightCanceled.passengers.map((passenger, index) => (
                        <form class="flight-info">
                            <h2 class="flight-number-title"> {passenger.first_name} {passenger.last_name} </h2>
                            <div key={index}>
                                <p> {passenger.type} </p>
                                <p> {passenger.gender} </p>
                                <p> {
                                        /*
                                            Convert the Date() type format in JS to MongoDB Date type format,
                                            URL: https://www.mongodb.com/docs/manual/reference/method/Date/
                                            Accessed Date: 2023/03/30
                                        */
                                        new Date(passenger.birthday).toISOString().substring(0, 10)
                                    }  
                                </p>
                                <p> {passenger.contact_info.email} </p>
                                <p> {passenger.contact_info.phone} </p>
                            </div>
                        </form>
                    ))}
                </div>
                <div class="button-section">
                    <button class="book-button" id="back" onClick={() => {setgoBackTrips(true);}}> Back </button>
                    <button class="book-button" id="confirm" onClick={() => {setcancelConfirmed(true);}}> Confirm </button>
                </div>         
             </div>

            <Footer />

        </div>
    );
}

export default CancelInfo;