import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema([{
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    birthday: { type: Date },
    gender: { type: String },
    address: { type: String }
}], { collection: 'users' });

const messageSchema = new Schema([{
    name: { type: String, required: true },
    email: { type: String, required: true },
    help_message: { type: String, required: true }
}], { collection: 'messages' });

const passengerSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    type: { type: String, required: true },
    gender: { type: String, required: true },
    birthday: { type: Date, required: true },
    contact_info: {
        email: { type: String, required: true },
        phone: { type: String, required: true }
    }
}, { collection: 'passengers' });

const flightSchema = new Schema({
    flight_number: { type: String, required: true },
    flight_company: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departure_date: { type: Date, required: true },
    arrival_date: { type: Date, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    seats_reserved: { type: Number, required: true }
}, { collection: 'flights' });
  

const bookingSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    flight: { type: flightSchema, required: true },
    passengers: { type: [passengerSchema], required: true }
}, { collection: 'bookings' });

/**
 * every model has exactly one connection to MongoDB
 * URL: https://masteringjs.io/tutorials/mongoose/buffering-timed-out-after-10000ms
 * Access Date: 2023/03/29
 */

const UserConnection = mongoose.createConnection(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'flight'
  });

const BookingConnection = mongoose.createConnection(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'flight'
});

const FlightConnection = mongoose.createConnection(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'flight'
});

const User = UserConnection.model('User', userSchema);
const Booking = BookingConnection.model('Booking', bookingSchema);
const Flight = FlightConnection.model('Flight', flightSchema)
const Message = UserConnection.model('Message', messageSchema);

export { User, Booking, Flight, Message, passengerSchema, userSchema };