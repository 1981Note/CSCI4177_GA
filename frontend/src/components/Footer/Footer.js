import './Footer.css';

import React, { useState} from 'react';

import { Navigate, Link } from "react-router-dom";

function Footer(){
    /* If user click the Help button then dump to help page */
    const [goToHelp, setGoToHelp] = useState(false);

    if (goToHelp) {
        return <Navigate to="/help"/>;
    }

    return (
        <footer>
            <div class="footer">
                <p> About </p>
                <p onClick={() => {setGoToHelp(true);}}> Help </p>
                <p> Conditions of Use </p>
                <p> Contact Information </p>
                <p> Feedback </p>
            </div>
        </footer>
    );
}

export default Footer;