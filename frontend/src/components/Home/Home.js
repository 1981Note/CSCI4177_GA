
import './Home.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import React, {useRef, useState, useEffect} from 'react';
import avatar from '../../img/user.png';
import flightPicture from '../../img/flights.png';

import { Navigate } from "react-router-dom";

import axios from 'axios';

import { useAuth } from "../Auth/AuthContext";

function Home() {

    const [flights, setFlight] = useState([])
    const [selectedFlight, setSelectedFlight] = useState(null)
    const { isLoggedIn } = useAuth();
    
    useEffect(() => {
        axios.get("https://csci4177-group18.onrender.com/api/flights")
        .then(res => {
            const data = res.data;
            setFlight(data)
            
        }).catch(err => console.log(err))
    }, [])




    const endDateRef = useRef(null);

    function visibleEndDate(){
        endDateRef.current.style.visibility = "visible";
    }

    function invisibleEndDate(){
        endDateRef.current.style.visibility = "hidden";
    }

    //Validate the search form input

    const [startDateInputValue, setStartDate] = useState("");
    const [endDateInputValue, setEndDate] = useState("");

    const [searchValidated, setSearchValidated] = useState(false);

    var today = new Date().toISOString().split("T")[0];

    function handleSearch(event) {
        event.preventDefault();
        if (startDateInputValue === ""){
            alert("Please fill the start date field!");
        }else if ((endDateInputValue === "") && (endDateRef.current.style.visibility === "visible")){
            alert("Please fill the end date field!");
        }else if ((startDateInputValue < today)){
            alert("Past date is not allowed in start date!")
        }else if ((endDateInputValue < today) && (endDateRef.current.style.visibility === "visible")){
            alert("Past date is not allowed in end date!")
        }else if ((endDateRef.current.style.visibility === "visible") && (endDateInputValue < startDateInputValue)){
            alert("The end date must be greater than the start date");
        }else{
            //Perform search logic
            setSearchValidated(true);
        }
    }

    

    const [goToEnterInfo, setGoToEnterInfo] = React.useState(false);

    if (goToEnterInfo) {
        return <Navigate to="/enterinfo" state={{flight : selectedFlight}}/>;
    }

    return (

        <div>
            
            <Header />

            <div class="flight-option">
                <label><input type="radio" name="flight-type" value="Round-trip"  onChange={visibleEndDate}/>Round-trip</label>
                <label><input type="radio" name="flight-type" value="One-way" onChange={invisibleEndDate}/>One-way</label>
            </div>

            <form class="flight-filter" onSubmit={handleSearch}>
                <select name="origin">
                    <option> Origin1 </option>
                    <option> Origin2 </option>
                    <option> Origin3 </option>
                </select>

                {/* exchange button did not implement yet */}
                <button id="exchange"><b>↔</b></button>

                <select name="destination">
                    <option> Destination1 </option>
                    <option> Destination2 </option>
                    <option> Destination3 </option>
                </select>

                <input type="date" id="start-date" name="start-date" onChange={(event) => setStartDate(event.target.value)}/>
                <input type="date" id="end-date" name="end-date" onChange={(event) => setEndDate(event.target.value)} ref={endDateRef} style={{visibility:'hidden'}}/>

                <button type="submit" id="search"> SEARCH </button>
            </form>

            {/* if pass the search validated, then show the flight info form */}
            {searchValidated && (
                <div>
                    
                        
                    {flights.map((flight, index) => (
                        <form class="flight-info">
                        <h2 class="flight-number-title"> {flight.flight_company} </h2>
                            <div key={index}>
                                <img src={flightPicture} alt="flight" width={50} height={50} />
                                <p> {flight.flight_company} </p>
                                <p> {flight.origin} </p>
                                <p> To </p>
                                <p> {flight.destination} </p>
                                <p> {flight.price} </p>
                                <button class="book-button" onClick={() => {
                                                            if (isLoggedIn) {
                                                            setSelectedFlight(flight);
                                                            setGoToEnterInfo(true);
                                                            } else {
                                                            alert("Please log in to book a flight.");
                                                            }
                                                        }}> BOOK </button>
                            </div>
                        </form>
                    ))}
                        
                    
                </div>
            )}
            <div class="clear"></div>
            <Footer />

        </div>

    );
}



export default Home;
