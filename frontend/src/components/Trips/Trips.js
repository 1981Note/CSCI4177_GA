/** 
 * CSCI4177 - A3
 * Yiyun Gong
 * Trips bookings of the user page
*/
import "./Trips.css"
import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import flight from '../../img/flights.png';
import { Navigate } from "react-router-dom";
import axios from "axios";

function Trips() {

    const [goToCancelInfo, setGoToCancelInfo] = React.useState(false);

    const [upcomingBookings, setUpcomingBookings] = useState([])
    const [historyBookings, setHistoryBookings] = useState([])

    const id = JSON.parse(localStorage.getItem('user'))._id

    useEffect(() => {
        axios.get(`https://csci4177-group18.onrender.com/api/bookings/${id}`)
        .then(res => {
            const data = res.data;
            
            /*
                Convert the Date() type format in JS to MongoDB Date type format, and compare
                URL: https://www.mongodb.com/docs/manual/reference/method/Date/
                Accessed Date: 2023/03/30
            */
            const today = new Date();
            const today_compare = today.toISOString();

            //upcoming bookings filter
            const upcoming = data.filter((booking) => {
                return booking.flight.departure_date > today_compare})
            setUpcomingBookings(upcoming)

            //history bookings
            const history = data.filter(booking => {return booking.flight.departure_date < today_compare})
            setHistoryBookings(history)


        }).catch(err => console.log(err))
    }, [])

    if (goToCancelInfo) {
        return <Navigate to="/cancelInfo"/>;
    }

    return (
        <div>
            
            <Header />
            <div>
                <h2 class='trips-title'>Upcoming Flights</h2>
                <div>
                    {upcomingBookings.map((booking, index) => (
                            <form class="flight-info">
                                <h2 class="flight-number-title"> {booking.flight.flight_number} </h2>
                                <div key={index}>
                                    <img src={flight} alt="flight" width={50} height={50} />
                                    <p> {booking.flight.flight_company} </p>
                                    <p> {booking.flight.origin} </p>
                                    <p> To </p>
                                    <p> {booking.flight.destination} </p>
                                    <p> {booking.flight.price} </p>
                                    <button class="book-button" onClick={() => {
                                        setGoToCancelInfo(true);
                                        window.flightCanceled = booking;
                                    }}> Cancel </button>
                                </div>
                            </form>
                    ))}
                </div>


                <h2 class='trips-title'>Flight History</h2>
                <div>
                    {historyBookings.map((booking, index) => (
                            <form class="flight-info">
                                <h2 class="flight-number-title"> {booking.flight.flight_number} </h2>
                                <div key={index}>
                                    <img src={flight} alt="flight" width={50} height={50} />
                                    <p> {booking.flight.flight_company} </p>
                                    <p> {booking.flight.origin} </p>
                                    <p> To </p>
                                    <p> {booking.flight.destination} </p>
                                    <p> {booking.flight.price} </p>
                                </div>
                            </form>
                    ))}
                </div>
                        
             </div>

             <div class="clear"></div>
            <Footer />

        </div>
    );
}

export default Trips;