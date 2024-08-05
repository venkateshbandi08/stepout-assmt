import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddTrain.css';
import axios from 'axios';
import config from '../../config/config';

const AddTrain = () => {
    const [trainName, setTrainName] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [totalSeats, setTotalSeats] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newTrain = {
            name: trainName,
            source: source,
            destination: destination,
            departure_time: departureTime,
            arrival_time: arrivalTime,
            total_seats: totalSeats,
        };

        console.log('Submitting train data:', newTrain); // Debugging: Log train data

        try {
            const response = await axios.post(`${config.backendUrl}/api/trains/create`, newTrain, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response); // Debugging: Log server response
            if (response.data.success) {
                toast.success('Train added successfully!');
                // Clear the form after successful submission
                setTrainName('');
                setSource('');
                setDestination('');
                setDepartureTime('');
                setArrivalTime('');
                setTotalSeats('');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message); // Debugging: Log error
            toast.error(`Failed to add train: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    return (
        <div className="add-train-container">
            <h2>Add a New Train</h2>
            <form className="add-train-form" onSubmit={handleSubmit}>
                <label htmlFor="trainName">Train Name</label>
                <input 
                    type="text" 
                    id="trainName" 
                    value={trainName} 
                    onChange={(e) => setTrainName(e.target.value)} 
                    required 
                />

                <label htmlFor="source">Source</label>
                <input 
                    type="text" 
                    id="source" 
                    value={source} 
                    onChange={(e) => setSource(e.target.value)} 
                    required 
                />

                <label htmlFor="destination">Destination</label>
                <input 
                    type="text" 
                    id="destination" 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)} 
                    required 
                />

                <label htmlFor="departureTime">Departure Time</label>
                <input 
                    type="datetime-local" 
                    id="departureTime" 
                    value={departureTime} 
                    onChange={(e) => setDepartureTime(e.target.value)} 
                    required 
                />

                <label htmlFor="arrivalTime">Arrival Time</label>
                <input 
                    type="datetime-local" 
                    id="arrivalTime" 
                    value={arrivalTime} 
                    onChange={(e) => setArrivalTime(e.target.value)} 
                    required 
                />

                <label htmlFor="totalSeats">Total Seats</label>
                <input 
                    type="number" 
                    id="totalSeats" 
                    value={totalSeats} 
                    onChange={(e) => setTotalSeats(e.target.value)} 
                    required 
                />

                <button type="submit">Add Train</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddTrain;
