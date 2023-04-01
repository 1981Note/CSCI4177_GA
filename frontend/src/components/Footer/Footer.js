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
                <Link to='/help'><button className="link-button"> Help </button></Link>
                <p> Conditions of Use </p>
                <p> Contact Information </p>
                <p> Feedback </p>
            </div>
        </footer>
    );
}

export default Footer;