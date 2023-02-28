import "./Payment.css"
import React, { useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Navigate } from "react-router-dom";
import payment from '../../img/paymentExample.png';

function Payment() {

    const [payed, setPayed] = useState(false);

    if(payed){ //jump to payment SUCCESSFUL PAGE after user finish payment
        return <Navigate to="/PaymentSuccessful" />
    }

    return (
        <div>
            <Header />
            <h2 class="book-title"> Pay </h2>
            <div className="pay">
            <p>Example payment picture</p>
            <img src={payment} alt="payment" width={800} height={500}/>
            <button className="payButton" onClick={(e)=>setPayed(true)}>Pay</button>
            </div>
            <Footer />

        </div>
    );
}

export default Payment;