import "./Trips.css"
import React, { useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import flight from '../../img/flights.png';
import { Navigate } from "react-router-dom";

function Trips() {

    const [goToEnterInfo, setGoToEnterInfo] = React.useState(false);

    if (goToEnterInfo) {
        return <Navigate to="/enterinfo"/>;
    }

    return (
        <div>
            
            <Header />
            <div>
                <h2 class='trips-title'>Upcoming Flights</h2>
                <form class="flight-info">
                    <h2 class="flight-number-title"> Flight Number </h2>
                    <div>
                        <img src={flight} alt="flight" width={50} height={50} />
                        <p> Flight Company </p>
                        <p> Origin </p>
                        <p> To </p>
                        <p> Destination </p>
                        <p> Price </p>
                    </div>
                </form>

                <h2 class='trips-title'>Flight History</h2>
                <form class="flight-info">
                    <h2 class="flight-number-title"> Flight Number </h2>
                    <div>
                        <img src={flight} alt="flight" width={50} height={50} />
                        <p> Flight Company </p>
                        <p> Origin </p>
                        <p> To </p>
                        <p> Destination </p>
                        <p> Price </p>
                        <button class="book-button" onClick={() => {setGoToEnterInfo(true);}}> Edit Booking </button>
                    </div>
                </form>

                <form class="flight-info">
                    <h2 class="flight-number-title"> Flight Number </h2>
                    <div>
                        <img src={flight} alt="flight" width={50} height={50} />
                        <p> Flight Company </p>
                        <p> Origin </p>
                        <p> To </p>
                        <p> Destination </p>
                        <p> Price </p>
                        <button class="book-button" onClick={() => {setGoToEnterInfo(true);}}> Edit Booking </button>
                    </div>
                </form>
                        
             </div>

            <Footer />

        </div>
    );
}

export default Trips;