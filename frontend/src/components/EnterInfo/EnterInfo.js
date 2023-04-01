/* Arthur: Siyuan Chen */
import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import './EnterInfo.css';
import flightPicture from '../../img/flights.png';
import { Link, useLocation } from "react-router-dom";
import Check from "../Check/Check";

function EnterInfo() {

    const { flight } = useLocation().state;

    const [emailInputValue, setEmail] = useState("");
    const [phoneNumberInputValue, setPhoneNumber] = useState("");
    
    const [goToCheck, setGoToCheck] = useState(false);

    const [formFields, setFormFields] = useState([
        {
            type: '',
            firstName: '',
            lastName: '',
            gender: '',
            month: '',
            day: '',
            year: ''
        },
    ])

    const handleInputChange = (event, index) => {
        
        const data = [...formFields];
        
        if(event.target.name === index+""){
            data[index].type = event.target.value;
        }else{
            data[index][event.target.name] = event.target.value;
        }
        
        setFormFields(data);
        console.log(index);
    }

    console.log(formFields)
    


    const addFields = () => {
        let object = {
            type: '',
            firstName: '',
            lastName: '',
            gender: '',
            month: '',
            day: '',
            year: ''
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    /**
     * 
     * Knowlege about how to add dynamic forms in React
     * URL: https://www.youtube.com/watch?v=LcAyJRlvh8Y
     * Accessed Date: 02/19/2023
     */

    
    const submit = (e, email, phoneNumber, formFields) => {
        e.preventDefault();
        

        const emailRegex = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
        /* 
        regular expression for email
        URL: https://www.tutorialspoint.com/checking-for-valid-email-address-using-regular-expressions-in-java
        Date Accessed: 2023/02/18
        */

        const phoneNumberRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
        /*
        Knowlege about regular expression of phone number
        URL: https://ihateregex.io/expr/phone/
        Accessed Date: 2023/02/18 
        */ 

        const firstNameRegex = new RegExp(/^[a-zA-Z ]+$/);

        const lastNameRegex = new RegExp(/^[a-zA-Z-' ]+$/);
        /* Knowledge get form CSCI3172 */



        let allFieldsValid = true;

        /**
         * Knowlege about check Object values
         * URL: https://dev.to/davidbell_xyz/using-some-every-and-object-values-to-check-values-from-within-an-object-3hn4
         * Date Accessed: 02/19/2023
         */

        const validatedFormFields = formFields.map((traveler) => {

            const {type, firstName, lastName, gender, month, day, year} = traveler;

            const dateOfBirthStr = year+'-'+month+'-'+day;
            const dateOfBirth = new Date(dateOfBirthStr);
            const now = new Date();

            const fieldsValid = {
                type: type !== "",
                firstName: firstNameRegex.test(firstName),
                lastName: lastNameRegex.test(lastName),
                gender: gender !== "",
                month: month !== "",
                dateOfBirth: !isNaN(dateOfBirth.getTime()) && dateOfBirth <= now
            }

            if (Object.values(fieldsValid).some((el) => !el)) {
                allFieldsValid = false;
            }
      
            return {
                ...traveler,
                fieldsValid
            };
        });

        

        if (formFields.length === 0){
            alert("Need to add at least one passenger");
        }else if (!emailRegex.test(email)){
            alert("There are some errors in your email address");
        }else if (!phoneNumberRegex.test(phoneNumber)){
            alert("There are some errors in your phone number");
        }else if (!allFieldsValid) {
            alert("There are some errors in your traveler information form")
        }else {
            setFormFields(validatedFormFields);
            setGoToCheck(true);
        }


    }

    return (

        !goToCheck ? (
        <div>
            <Header />
            <h2 class="book-title"> Book Flight </h2>
            
            <section class="flight-info">
                <h3 class="flight-number-title"> Flight Number </h3>
                <div>
                    <img src={flightPicture} alt="flight" width={50} height={50} />
                    <p> {flight.flight_company} </p>
                    <p> {flight.origin} </p>
                    <p> To </p>
                    <p> {flight.destination} </p>
                    <p> {flight.price} </p>
                </div>
            </section>

            <h3 class="book-title"> Book Flight for </h3>

            <section class="contact-details">
                <h4> Contact Details </h4>

                <form>
                    <div class="contact-input">
                        <label for="email"> Email: </label>
                        <input type="text" id="email" name="email" onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div class="contact-input">
                        <label for="phone-number"> Phone Number: </label>
                        <input type="text" id="phone-number" name="phone-number" onChange={(event) => setPhoneNumber(event.target.value)}/>
                    </div>
                </form>
            </section>
        

            <form onSubmit={submit} >
            { formFields.map((form, index) => {
                return (
                    <div key={index} class="traveler-details">

                        <h4> Traveler </h4>
                    
                        <div class="type-option">
                            <label><input type="radio" name={index} id="adult" value="Adult" checked={formFields[index].type === 'Adult'} onChange={(event) => handleInputChange(event, index)}/>Adult</label>
                            <label><input type="radio" name={index} id="child" value="Child" checked={formFields[index].type === 'Child'} onChange={(event) => handleInputChange(event, index)}/>Child</label>
                            <label><input type="radio" name={index} id="senior" value="Senior" checked={formFields[index].type === 'Senior'} onChange={(event) => handleInputChange(event, index)}/>Senior</label>
                        </div>

                        <div class="traveler-input">
                            <label for="fname"> First Name: </label>
                            <input type="text" id="fname" name="firstName" value={form.firstName} onChange={(event) => handleInputChange(event, index)}/>
                        </div>

                        <div class="traveler-input">
                            <label for="lname"> Last Name: </label>
                            <input type="text" id="lname" name="lastName" value={form.lastName} onChange={(event) => handleInputChange(event, index)}/>
                        </div>

                        <div class="traveler-input">
                            <label for="gender"> Gender: </label>
                            <select id="gender" name="gender" value={form.gender} onChange={(event) => handleInputChange(event, index)}>
                                <option value="">Select gender</option>
                                <option value="Male"> Male </option>
                                <option value="Female"> Female </option>
                            </select>
                        </div>

                        <div class="traveler-input">
                            <div>
                                <label for="month"> Date of Birth: </label>
                            </div>

                            <div>
                                <select id="month" name="month" value={form.month} onChange={(event) => handleInputChange(event, index)}>
                                    <option value="">Select month</option>
                                    <option value="January"> January </option>
                                    <option value="February"> February </option>
                                    <option value="March"> March </option>
                                    <option value="April"> April </option>
                                    <option value="May"> May </option>
                                    <option value="June"> June </option>
                                    <option value="July"> July </option>
                                    <option value="August"> August </option>
                                    <option value="September"> September </option>
                                    <option value="October"> October </option>
                                    <option value="November"> November </option>
                                    <option value="December"> December </option>
                                </select>
                                <input type="text" id="day" name="day" placeholder="DD" value={form.day} onChange={(event) => handleInputChange(event, index)}/>
                                <input type="text" id="year" name="year" placeholder="YYYY" value={form.year} onChange={(event) => handleInputChange(event, index)}/>
                            </div>

                        </div>

                        <div>
                            <button id="enter-info-remove-button" onClick={() => removeFields(index)}>Remove</button>
                        </div>
                    
                    </div>
                    )
                })}
                </form>

            
            

            <button id="add-traveler-button" onClick={addFields}> ADD OTHER TRAVELER </button>
            

            <div class="process-button">
                <Link to="/"> Back </Link>
                <button id="detail-button" onClick={(event) => submit(event, emailInputValue, phoneNumberInputValue, formFields)}>Next</button>
            
            </div>

            <div class="clear"></div>
            
            <Footer />
        </div>
        ) : (
            <Check flight={flight} email={emailInputValue} phoneNumber={phoneNumberInputValue} formFields={formFields}/>
        )

    );
}

export default EnterInfo;