
import dotenv from "dotenv";
import express from "express";
import DbConnection from "./DbConnection.js";
import route from './route.js';
import cors from "cors";
import passport from 'passport';
import session from 'express-session';
import MemoryStore from "memorystore";


dotenv.config()

const app = express();

// Enable CORS for all domains
app.use(cors());

/**
 * Node.js Passport Login System Tutorial
 * URL: https://www.youtube.com/watch?v=-RCnNyD0L-s
 * Accessed Date: 2023/03/30
 */
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  secret: 'session-secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use('/api', route);



const port = process.env.PORT || 8000;
const db = new DbConnection();

db.connect();



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})





