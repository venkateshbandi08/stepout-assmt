import express from "express";
import {addTrain, getSeats} from "../controllers/trainController.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";


const trainRouter = express.Router();

trainRouter.post('/create', authMiddleware, adminMiddleware, addTrain);
trainRouter.get('/availability', authMiddleware, getSeats);

export default trainRouter;