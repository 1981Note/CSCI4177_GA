
import './Home.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import React, {useRef, useState} from 'react';
import avatar from '../../img/user.png';
import flight from '../../img/flights.png';

import { Navigate } from "react-router-dom";



function Home() {
    

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
        return <Navigate to="/enterinfo"/>;
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
                    <form class="flight-info">
                        <h2 class="flight-number-title"> Flight Number </h2>
                        <div>
                            <img src={flight} alt="flight" width={50} height={50} />
                            <p> Flight Company </p>
                            <p> Origin </p>
                            <p> To </p>
                            <p> Destination </p>
                            <p> Price </p>
                            <button class="book-button" onClick={() => {setGoToEnterInfo(true);}}> BOOK </button>
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
                            <button class="book-button" onClick={() => {setGoToEnterInfo(true);}}> BOOK </button>
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
                            <button class="book-button" onClick={() => {setGoToEnterInfo(true);}}> BOOK </button>
                        </div>
                    </form>
                </div>
            )}

            <Footer />

        </div>
        
    

    );
}



export default Home;
