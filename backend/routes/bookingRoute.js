import express from 'express';
import { bookSeats,getBookingDetails } from '../controllers/bookingController.js';
import authMiddleware from '../middleware/auth.js'; 

const bookingRouter = express.Router();
bookingRouter.post('/:train_id/book', authMiddleware, bookSeats);
bookingRouter.get('/:booking_id', authMiddleware, getBookingDetails);




export default bookingRouter;
