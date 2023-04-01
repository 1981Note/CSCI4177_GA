import express from 'express';

import { User, Booking, Flight} from './model.js';
import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
const saltRounds = 10; // Number of salt rounds to use

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';


const router = express.Router();

router.get('/bookings', async (req, res) => {
    try {
      const bookings = await Booking.find({})
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
      }
      res.status(200).json(bookings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/bookings/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({user: new mongoose.Types.ObjectId(req.params.id)})
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }
    res.status(200).json(bookings);
    const today = new Date();
    const filterData = bookings.filter(
      booking => {return booking.flight.departure_date < today}
    );
    //console.log(filterData);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/bookings', async (req, res) => {
  //console.log(req.body);
    try {

      const { user, flight, passengers } = req.body;

      //console.log(user)
      // Check if the user exists in the User collection
      const userExists = await User.findById(user);

      if (!userExists) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Create a new booking instance with _id set
      const booking = new Booking({
        _id: new mongoose.Types.ObjectId(),
        user: user,
        flight: flight,
        passengers: passengers
      });
  
      // Save the booking to the database
      await booking.save();
  
      res.status(201).json(booking);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/bookings/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await Booking.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/flights', async (req, res) => {
    try {
      const flights = await Flight.find();
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.post('/flights', async (req, res) => {
    try {
        const { flight_number, flight_company, origin, destination, price, departure_date, arrival_date } = req.body;
  
      // Create a new flight object using the request body
      const flight = new Flight({
        flight_number: flight_number,
        flight_company: flight_company,
        origin: origin,
        destination: destination,
        departure_date: departure_date,
        arrival_date: arrival_date,
        price: price
      });
  
      // Save the flight to the database
      await flight.save();
  
      // Send a success response
      res.status(201).json({
        message: 'Flight created successfully',
        flight: flight
      });
    } catch (err) {
      // Handle any errors that occur during the flight creation process
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Password hashing in Node.js with bcrypt
 * https://blog.logrocket.com/password-hashing-node-js-bcrypt/
 * Accessed Date: 2023/03/30
 */

router.post('/users', async (req, res) => {
  try {
    const { name, email, password, phone, birthday, gender, address } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object using the request body
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword, // Store the hashed password in the database
      phone: phone,
      birthday: birthday,
      gender: gender,
      address: address
    });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({
      message: 'User created successfully',
      user: user
    });
  } catch (err) {
    // Handle any errors that occur during the user creation process
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//update user data base on there email address
router.put('/users/:id', async(req,res) => {
  try{
    const userId = req.params.id;
    const editData = req.body;
    
    //find and update the edit data to DB
    const result = await User.findOneAndUpdate({ _id: userId }, editData);

    // Send a success response
    res.status(200).json({
      message: 'User information update successfully',
      user: result
    });
  } catch (err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      // Add a property to the session object to ensure that the session is saved
      req.session.isLoggedIn = true;
      return res.status(200).json({ message: 'Login successful', user: user });
    });
  })(req, res, next);
});



passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find the user with the given email
    const user = await User.findOne({ email: email });

    // If no user is found, return an error message
    if (!user) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Invalid email or password' });
    }

    // If the email and password are correct, return the user
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default router;