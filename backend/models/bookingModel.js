import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


const bookingSchema = sequelize.define('booking', {
    booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    train_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seats_booked: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booking_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'bookings',
    timestamps: false,
});


export default {bookingSchema}
