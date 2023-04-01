import "./Profile.css"
import React, { useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { json } from "react-router-dom";
import axios from "axios";

function Profile() {
    
    
    /*
    const [testData, setTestData] = useState({
        "_id": "6425960461dc5964a4366787",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "$2b$10$pqVjHDLZNWgFmpnfC6ENkeowBDYAxYP9R/eXpNyqGJSMqld4avjPe",
        "phone": "923333333",
        "birthday": null,
        "gender": "male",
        "address": "u2h 2k3",
        "__v": 0
    });

    localStorage.setItem("user",JSON.stringify(testData));*/
    console.log(JSON.parse(localStorage.getItem('user')));

    //use the user information from local which got when user login
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')));
    const [editUserInfo, setEditedUserInfo] = useState({...userInfo});
    const [editMode, setEditMode] = useState(false);
    // Define state variables for each input field
    //const [name, setName] = useState('John Doe');
    //const [email, setEmail] = useState('John@gmail.com');
    //const [phone, setPhone] = useState('12345');
    //const [birthdate, setBirthdate] = useState('');
    //const [gender, setGender] = useState('male');
    //const [address, setAddress] = useState('123 d street');

    // Define state variable for whether the form is in edit mode or not
   

    // Handle edit mode toggle
    const handleEditModeToggle = () => {
        setEditMode(!editMode);
    };


    const handleCancel = () => {
        setEditMode(false);
        setEditedUserInfo(userInfo);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        
        event.preventDefault();
        // Do something with the form data (e.g. save to database)
        //console.log('Form submitted:', { name, email, phone, birthdate, gender, address });
        try {
            const res = await axios.put(`https://csci4177-group18.onrender.com/api/users/${userInfo._id}`, editUserInfo); 
            if (res.status === 200){
                setUserInfo(editUserInfo);
                localStorage.setItem("user",JSON.stringify(editUserInfo));
            }     
        } catch (error) {
            console.log(error);
        }
        
        //localStorage.setItem('user', JSON.stringify(editUserInfo));
        setEditMode(false); // Disable edit mode after submission
    };

    const handleOnChange = (event) => {
        const{name, value} = event.target;
        setEditedUserInfo((prevState) => ({
            ...prevState,
            [name]:value
        }));
    }

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} id='profileForm'>
                <label>
                    Name:
                    {editMode ? (
                        <input type="text" name="name" value={editUserInfo.name} onChange={handleOnChange} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{editUserInfo.name}</span>
                    )}
                </label>
                <br />
                <label>
                    Email:
                    {editMode ? (
                        <input type="email" name="email" value={editUserInfo.email} onChange={handleOnChange} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{editUserInfo.email}</span>
                    )}
                </label>
                <br />
                <label>
                    Phone:
                    {editMode ? (
                        <input type="tel" name="phone" value={editUserInfo.phone} onChange={handleOnChange} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{editUserInfo.phone}</span>
                    )}
                </label>
                <br />
                <label>
                    Date of Birth:
                    {editMode ? (
                        <input type="date" name="birthday" value={editUserInfo.birthday} onChange={handleOnChange} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{editUserInfo.birthday}</span>
                    )}
                </label>
                <br />
                <label>
                    Gender:
                    {editMode ? (
                        <select value={editUserInfo.gender} name="gender" onChange={handleOnChange}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <span onClick={handleEditModeToggle}>{editUserInfo.gender}</span>
                    )}
                </label>
                <br />
                <label>
                    Address:
                    {editMode ? (
                        <textarea type="text" name="address" value={editUserInfo.address} onChange={handleOnChange} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{editUserInfo.address}</span>
                    )}
                </label>
                <br />
                {editMode ? (
                    <label className="buttonsGroup">
                        <button name="save" type="submit">Save Profile</button>
                        <button name="cancel" type="button" onClick={handleCancel}>Cancel</button>
                    </label>
                ) : (
                    <button id="edit" type="button" onClick={handleEditModeToggle}>Edit Profile</button>
   
                )}
            </form>
            <div class="clear"></div>
            
            <Footer />
        </div>
    );
}

export default Profile;