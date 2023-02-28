import React, {useState} from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
    const [message, setMessage] = useState("");

    /*
        The regex for email validation
        URL: https://www.tutorialspoint.com/regex-in-reactjs
        Date Accessed: 2023/2/27
    */
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === ""){
            alert("Please fill name");
        }else if(email === ""){
            alert("Please fill email");
        }else if(message === ""){
            alert("Please fill message");
        }else{

            if (validEmail.test(email)){
                alert("Send Sucessfully");
            }else{
                alert("Please enter valid email");
            }

        }

    }

    return (

        <div>
            <Header />
                <h2>Contact</h2>
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
                            <textarea class="contactInputArea" value={message} onChange={(e) => setMessage(e.target.value)}/>
                        </label>
                    </div>
                    <input type="submit" id="submitButton" value="SEND MESSAGE" />
                </form>
            <Footer />
        </div>

    );
}

export default Help;