import React, { useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Check.css";
import flight from '../../img/flights.png';
import { Navigate, Link } from "react-router-dom";

function Check(props) {

    const [goToPayment,setGoToPayment] = useState(false);

    if (goToPayment){
        return <Navigate to="/payment"/>;
    }

    return (
        <div>
            <Header />
            <h2 class="book-title"> Check </h2>
            <section class="flight-info">
                <h3 class="flight-number-title"> Flight Number </h3>
                <div>
                    <img src={flight} alt="flight" width={50} height={50} />
                    <p> Flight Company </p>
                    <p> Origin </p>
                    <p> To </p>
                    <p> Destination </p>
                    <p> Price </p>
                </div>
            </section>

            <section class="contact-details">
                <h4> Contact Details </h4>
                <p> Email: {props.email} </p>
                <p> Phone Number: {props.phoneNumber} </p>
            </section>

            <section class="traveler-details">
            <h4> Traveler Details </h4>
                {props.formFields.map((field, index) => (
                    <div key={index}>
                        <p> {field.firstName} {field.lastName} </p>
                        <p> {field.type} {field.gender} {field.year}-{field.month}-{field.day} </p>

                    </div>
                ))}
                                
            </section>

            <div class="process-button">
                <Link to="/"> Back </Link>
                <button onClick={() => {setGoToPayment(true);}}> NEXT </button>
            </div>

            <Footer />
        </div>
    );
}

export default Check;