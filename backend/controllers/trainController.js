import trainModel from "../models/trainModel.js";
import pool from "../config/pool.js";

// Add a new train
export const addTrain = async (req, res) => {
    try {
        const { name, source, destination, departure_time, arrival_time, total_seats } = req.body;
        
        // Validate input data
        if (!name || !source || !destination || !departure_time || !arrival_time || isNaN(total_seats)) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }

        const newTrain = await trainModel.addTrainSchema(name, source, destination, departure_time, arrival_time, total_seats);
        res.json({ success: true, message: "Train successfully added", trainId: newTrain });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get seat availability
export const getSeats = async (req, res) => {
    try {
        const { source, destination } = req.query; 

        // Validate input data
        if (!source || !destination) {
            return res.status(400).json({ success: false, message: 'Source and destination are required' });
        }

        const [trains] = await pool.query(
            'SELECT * FROM trains WHERE source = ? AND destination = ?',
            [source, destination]
        );

        console.log(trains);

        const trainAvailability = await Promise.all(trains.map(async (train) => {
            // Query to get total booked seats for each train
            const [bookings] = await pool.query(
                'SELECT SUM(seats_booked) AS total_booked_seats FROM bookings WHERE train_id = ?',
                [train.id]
            );

            const totalBookedSeats = bookings[0].total_booked_seats || 0;
            const availableSeats = train.total_seats - totalBookedSeats;

            return {
                ...train,
                availableSeats
            };
        }));

        res.json({ success: true, trains: trainAvailability });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
