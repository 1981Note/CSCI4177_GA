/* Arthur: Siyuan Chen */
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import "./Payment.css"
import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import PaymentSuccessful from "../PaymentSuccessful/PaymentSuccessful";


function Payment() {

    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData._id;

    const [bookingId, setBookingId] = useState("");

    const {flight, contact, fields} = useLocation().state;

    console.log(flight)

    console.log(contact)
    console.log(fields)

    const [payed, setPayed] = useState(false);

    console.log(userId)

    console.log(typeof userId)


 
    useEffect(() => {
        if (payed) {
        
            const data = {
                user: userId,
                flight: flight,
                passengers: fields.map((field) => ({
                    first_name: field.firstName,
                    last_name: field.lastName,
                    type: field.type,
                    gender: field.gender,
                    birthday: field.year + " " + field.month + " " + field.day,
                    contact_info: {
                    email: contact.email,
                    phone: contact.phoneNumber
                    }
                }))
            };
        
            axios.post("https://csci4177-group18.onrender.com/api/bookings", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
            console.log("hello")
            console.log(data)
            setBookingId(res.data._id);
            })
            .catch(err => console.log(err));
        }
    }, [payed, flight, fields, contact.email, contact.phoneNumber, userId]);
          
    
    /**
     * use paypal in react
     * https://www.npmjs.com/package/@paypal/react-paypal-js
     * Accessed Date: 2023/03/30
     */

    return (
        !payed ? (
        <div>
            <Header />
            <h2 class="book-title"> Pay </h2>
            <div className="pay">
                <PayPalScriptProvider options={{ "client-id": "Af0BuVMV_oFUrH5mtRPdWk8qOXICBzdg0RsXWVOLtNjC4s2HnPu2zDi_5JRGOIp93Jsgik7qcIn1CHZB" }}>
                    <PayPalButtons 
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: flight.price, //need to change amount
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove = {(data, actions) => {
                            return actions.order.capture().then(function (details) {
                                /*
                                alert(
                                    "Transaction completed by " + details.payer.name.given_name
                                )
                                */

                                
                                setPayed(true);

                            })
                        }}
                    
                    />
                </PayPalScriptProvider>
            </div>
            

            <Footer />

        </div>
        ) : (
            <PaymentSuccessful confirmId = {bookingId}/>
                
        )
    );
}

export default Payment;