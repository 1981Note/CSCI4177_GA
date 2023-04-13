import './Home.css';

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import React, { useRef, useState, useEffect } from 'react';
import avatar from '../../img/user.png';
import flightPicture from '../../img/flights.png';

import { Navigate } from "react-router-dom";

import axios from 'axios';
import { format } from 'date-fns';
import { useAuth } from "../Auth/AuthContext";

const cities = ["Select City","Toronto", "Ottawa", "Halifax", "Montreal", "Calgary", "Vancouver", "Edmonton", "Saskatoon"];
function Home() {
    const [flightType, setFlightType] = useState('Round-trip');
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const { isLoggedIn } = useAuth();
    const [searchValidated, setSearchValidated] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({});

    useEffect(() => {
      axios.get("https://csci4177-group18.onrender.com/api/flights")
        .then(res => {
          const data = res.data;
          setFlights(data);

        })
        .catch(err => console.log(err))
    }, [searchValidated, searchCriteria]);
  
    const endDateRef = useRef(null);
  
    function visibleEndDate() {
      setFlightType("Round-trip");
      endDateRef.current.style.visibility = "visible";
    }
  
    function invisibleEndDate() {
      setFlightType("One-way");
      endDateRef.current.style.visibility = "hidden";
    }
  
    var today = new Date().toISOString().split("T")[0];
  
    function handleSearch(event) {
      event.preventDefault();
      if (searchCriteria.origin === "" || searchCriteria.destination === "" || searchCriteria.start === "" || searchCriteria.passengers === "") {
        alert("Please fill all required fields!");
      } else if ((searchCriteria.end === "") && (endDateRef.current.style.visibility === "visible")) {
        alert("Please fill the end date field!");
      } else if (searchCriteria.start < today) {
        alert("Past date is not allowed in start date!")
      } else if ((searchCriteria.end < today) && (endDateRef.current.style.visibility === "visible")) {
        alert("Past date is not allowed in end date!")
      } else if ((endDateRef.current.style.visibility === "visible") && (searchCriteria.end < searchCriteria.start)) {
        alert("The end date must be greater than the start date");
      } else {
        //Perform search logic
        setSearchValidated(true);
      }
    }
  
    function handleInputChange(event) {
      const { name, value } = event.target;
      setSearchCriteria(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  
    const [goToEnterInfo, setGoToEnterInfo] = React.useState(false);
  
    if (goToEnterInfo) {
      return <Navigate to="/enterinfo" state={{ flight: selectedFlight }} />;
    }
  
    function filterFlights(flights, searchCriteria, isReturn) {
      
        let origin = searchCriteria.origin;
        let destination = searchCriteria.destination;

        if(isReturn){
          destination = searchCriteria.origin;
          origin = searchCriteria.destination;
        }
      return flights.filter(flight =>
        flight.capacity - flight.seats_reserved >= searchCriteria.passengers && 
        flight.origin === origin &&
        flight.destination === destination &&
        new Date(flight.departure_date).getDate() === new Date(searchCriteria.start).getDate() &&
        new Date(flight.departure_date).getMonth() === new Date(searchCriteria.start).getMonth()
      );
    }

    return (
        <div>
            <Header />
            <div class="flight-option">
                <label><input type="radio" name="flight-type" value="Round-trip"  onChange={visibleEndDate}/>Round-trip</label>
                <label><input type="radio" name="flight-type" value="One-way" onChange={invisibleEndDate}/>One-way</label>
            </div>
            
            <form class="flight-filter" onSubmit={handleSearch}>
            <label htmlFor="passengers">Passengers:</label>
                <input type="number" id="passengers" name="passengers" min="1" onChange={handleInputChange} />
                <select name="origin" onChange={handleInputChange}>

                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
                </select>

                <select name="destination" onChange={handleInputChange}>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
                </select>

                <input type="date" id="start-date" name="start" onChange={handleInputChange}/>
                <input type="date" id="end-date" name="end" onChange={handleInputChange} ref={endDateRef} style={{visibility:'hidden'}}/>
                <button type="submit" id="search"> SEARCH </button>
            </form>

            {searchValidated && (
            <div>
                <h2>Departure Flights:</h2>
                {filterFlights(flights, searchCriteria, false).map((flight, index) => (
                    <form className="flight-info" key={index}>
                    <h2 className="flight-number-title">{flight.flight_company}</h2>
                    <div>
                        <img src={flightPicture} alt="flight" width={50} height={50} />
                        <p>{flight.flight_company}</p>
                        <p>{flight.origin}</p>
                        <p>To</p>
                        <p>{flight.destination}</p>
                        <p>Departure: {format(new Date(flight.departure_date), 'dd/MM/yyyy hh:mm a')}</p>
                        <p>Arrival: {format(new Date(flight.arrival_date), 'dd/MM/yyyy hh:mm a')}</p>
                        <p>{flight.price}</p>
                        <button
                        className="book-button"
                        onClick={() => {
                            if (isLoggedIn) {
                            setSelectedFlight(flight);
                            setGoToEnterInfo(true);
                            } else {
                            alert("Please log in to book a flight.");
                            }
                        }}
                        >
                        Book Flight
                        </button>
                    </div>
                    </form>
                ))}
                {flightType === "Round-trip" && (
                    <div>
                        <h2>Return Flights:</h2>
                        {filterFlights(flights, searchCriteria, true).map((flight, index) => (
                        <form className="flight-info" key={index}>
                            <h2 className="flight-number-title">{flight.flight_company}</h2>
                            <div>
                            <img src={flightPicture} alt="flight" width={50} height={50} />
                            <p>{flight.flight_company}</p>
                            <p>{flight.origin}</p>
                            <p>To</p>
                            <p>{flight.destination}</p>
                            <p>Departure: {format(new Date(flight.departure_date), 'dd/MM/yyyy hh:mm a')}</p>
                            <p>Arrival: {format(new Date(flight.arrival_date), 'dd/MM/yyyy hh:mm a')}</p>
                            <p>{flight.price}</p>
                            <button
                                className="book-button"
                                onClick={() => {
                                if (isLoggedIn) {
                                    setSelectedFlight(flight);
                                    setGoToEnterInfo(true);
                                } else {
                                    alert("Please log in to book a flight.");
                                }
                                }}
                            >
                                Book flight
                            </button>
                            </div>
                        </form>
                        ))}
                    </div>
                    )}
                </div>
            )}
            <div class="clear"></div>
            <Footer />
        </div>
    );
}
export default Home;
