import trainModel from '../models/trainModel.js';
import pool from '../config/pool.js';


// Book Seats
export const bookSeats = async (req, res) => {
    try {
        const { seats_booked} = req.body;
        const { train_id } = req.params;
        const user_id = req.user.id; 

    
        // Ensure seats_booked is a valid number
        const seatsBooked = parseInt(seats_booked, 10);
        if (isNaN(seatsBooked) || seatsBooked <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid number of seats booked' });
        }

        // Find the train
        const train = await trainModel.findTrainById(train_id);

        if (!train) {
            return res.status(404).json({ success: false, message: 'Train not found' });
        }

        // Check seat availability
        if (train.total_seats < seatsBooked) {
            return res.status(400).json({ success: false, message: 'Not enough seats available' });
        }

        // Update total seats in the train
        await pool.query(
            'UPDATE trains SET total_seats = ? WHERE id = ?',
            [train.total_seats - seatsBooked, train_id]
        );

        // Create booking record
        const [result] = await pool.query(
            'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)',
            [user_id, train_id, seatsBooked]
        );

        const newBooking = {
            id: result.insertId,
            user_id,
            train_id,
            seats_booked: seatsBooked
        };

        res.json({ success: true, message: 'Seats successfully booked', booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get Booking Details
export const getBookingDetails = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const user_id = req.user.id; 

        const [booking] = await pool.query(
            'SELECT * FROM bookings WHERE booking_id = ? AND user_id = ?',
            [booking_id, user_id]
        );

        if (booking.length === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.json({ success: true, booking: booking[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' , error});
    }
};

