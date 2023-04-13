import React, {useState} from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import './Help.css';
/*
    How to use form in React
    URL: https://www.w3schools.com/react/react_forms.asp
    Date Accessed: 2023/2/27
*/
function Help() {
    
    /*variable store input values*/
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [help_message, setMessage] = useState("");
    const navigate = useNavigate();

    /*
        The regex for email validation
        URL: https://www.tutorialspoint.com/regex-in-reactjs
        Date Accessed: 2023/2/27
    */
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post("https://csci4177-group18.onrender.com/api/message", {
            name: name,
            email: email,
            help_message: help_message
          });
    
          if (response.status === 201) {
            alert("Your message was sent successfully")
          }
        } catch (error) {
          console.error("Error sending message:", error);
          if (error.response) {
            console.error(error.response.data.message);
            alert(error.response.data.message);
          }
        }
      };
    
    return (

        <div>
            <Header />
                <h2 className='contact-title'>Contact</h2>
                <form onSubmit={handleSubmit}>
                    <div class="contactInput">
                        <label>
                            <h3>Name</h3>
                            <input type="text" class="contactInputArea" value={name} onChange={(e) => setName(e.target.value)}/>
                        </label>
                    </div>
                    <div class="contactInput">
                        <label>
                            <h3>Email</h3>
                            <input type="text" class="contactInputArea" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div class="contactInput">
                        <label>
                            <h3>Message</h3>
                            <textarea class="contactInputArea" value={help_message} onChange={(e) => setMessage(e.target.value)}/>
                        </label>
                    </div>
                    <input type="submit" id="submitButton" value="SEND MESSAGE" />
                </form>
            <Footer />
        </div>

    );
}

export default Help;