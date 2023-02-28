
import './App.css';
import React from 'react';
import Home from "./components/Home/Home";
import EnterInfo from "./components/EnterInfo/EnterInfo";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Check from "./components/Check/Check";
import Payment from './components/Payment/Payment';
import PaymentSuccessful from './components/PaymentSuccessful/PaymentSuccessful';
import Trips from "./components/Trips/Trips";
import Profile from "./components/Profile/Profile";
import Help from "./components/Help/Help";

import {Routes, Route} from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/enterinfo" element={<EnterInfo />}></Route>
      <Route path="/registration" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/check" element={<Check />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/paymentSuccessful" element={<PaymentSuccessful />}></Route>
      <Route path='/trips' element={<Trips />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/help' element={<Help />}></Route>
    </Routes>
  );
}

export default App;
