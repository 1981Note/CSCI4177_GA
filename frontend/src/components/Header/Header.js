import './Header.css';

import React, { useState} from 'react';

import { Navigate, Link } from "react-router-dom";

import avatar from '../../img/user.png';

import profile from '../../img/profile.png';
import trips from '../../img/trips.png';
import logout from '../../img/logout.png';

function Header(){

    /* If user logged in, then change the state */
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [open, setOpen] = useState(false);

    return (
        <header>

            <div class="header">
                <Link to="/" style={{textDecoration: "none"}}><h1> FLYCANADA </h1></Link>

                {/* keep a place for check the user whether or not loggedin */}

                {isLoggedIn ? (
                    <div>
                        <div onClick={() => {setOpen(!open)}}>
                            <img src={avatar} alt="avatar" width={50} height={50} />
                        </div>

                        {/* Knowledge about drop-down menu
                            URL: https://www.youtube.com/watch?v=KROfo7vuIGY&t=6s
                            Date Accessed: 2023/02/27 */}
                            
                        <div class={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                            <ul>
                                <li><Link href='/profile'><button id="home-profile-button"> <img src={profile} alt="profile" width={15} height={15}/> Profile </button></Link></li>
                                <li><Link href='/trips'><button id="home-trips-button"> <img src={trips} alt="trips" width={15} height={15}/> Trips </button></Link></li>
                                <li><button id="home-signout-button">  <img src={logout} alt="logout" width={15} height={15}/> Sign out </button></li>
                            </ul>
                        </div>
                    </div>
                    
                ) : (
                    
                    <div class="home-buttons">
                        <Link href='/registration'><button id="home-register-button"> REGISTER </button></Link>
                        <Link href='/login'><button id="home-login-button"> LOGIN </button></Link>
                    </div>
                
                )}
                
            </div>

        </header>
    );
}

export default Header;