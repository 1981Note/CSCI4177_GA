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
            <ul class="footer">
                <li> About </li>
                <li> <Link to='/help'><button className="link-button"> Help </button></Link> </li>
                <li> Conditions of Use </li>
                <li> Contact Information </li>
                <li> Feedback </li>
            </ul>
        </footer>
    );
}

export default Footer;