import pool from "../config/pool.js";

const addTrainSchema = async (name, source, destination, departure_time, arrival_time, total_seats) => {
    const [result] = await pool.query(
        'INSERT INTO trains(name, source, destination, departure_time, arrival_time, total_seats) VALUES (?, ?, ?, ?, ?, ?)',
        [name, source, destination, departure_time, arrival_time, total_seats]
    );
    return result.insertId;
};

const getSeatAvailabilitySchema = async (source, destination) => {
    const [trains] = await pool.query(
        'SELECT * FROM trains WHERE source = ? AND destination = ?',
        [source, destination]
    );
    return trains;
};

const findTrainById = async (train_id) => {
    const [train] = await pool.query('SELECT * FROM trains WHERE id = ?', [train_id]);
    return train[0]; 
};

export default {
    addTrainSchema,
    getSeatAvailabilitySchema,
    findTrainById
};
