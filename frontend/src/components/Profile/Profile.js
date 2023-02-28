import "./Profile.css"
import React, { useState } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Profile() {
    // Define state variables for each input field
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('John@gmail.com');
    const [phone, setPhone] = useState('12345');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('male');
    const [address, setAddress] = useState('123 d street');

    // Define state variable for whether the form is in edit mode or not
    const [editMode, setEditMode] = useState(false);

    // Handle edit mode toggle
    const handleEditModeToggle = () => {
        setEditMode(!editMode);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the form data (e.g. save to database)
        console.log('Form submitted:', { name, email, phone, birthdate, gender, address });
        setEditMode(false); // Disable edit mode after submission
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} id='profileForm'>
                <label>
                    Name:
                    {editMode ? (
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{name}</span>
                    )}
                </label>
                <br />
                <label>
                    Email:
                    {editMode ? (
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{email}</span>
                    )}
                </label>
                <br />
                <label>
                    Phone:
                    {editMode ? (
                        <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{phone}</span>
                    )}
                </label>
                <br />
                <label>
                    Date of Birth:
                    {editMode ? (
                        <input type="date" value={birthdate} onChange={(event) => setBirthdate(event.target.value)} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{birthdate}</span>
                    )}
                </label>
                <br />
                <label>
                    Gender:
                    {editMode ? (
                        <select value={gender} onChange={(event) => setGender(event.target.value)}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <span onClick={handleEditModeToggle}>{gender}</span>
                    )}
                </label>
                <br />
                <label>
                    Address:
                    {editMode ? (
                        <textarea value={address} onChange={(event) => setAddress(event.target.value)} />
                    ) : (
                        <span onClick={handleEditModeToggle}>{address}</span>
                    )}
                </label>
                <br />
                {editMode ? (
                    <button type="submit">Save Profile</button>
                ) : (
                    <button type="button" onClick={handleEditModeToggle}>Edit Profile</button>
                )}
            </form>
            <Footer />
        </div>
    );
}

export default Profile;