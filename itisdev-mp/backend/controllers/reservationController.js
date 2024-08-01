const Reservations = require('../models/ReservationModel'); 

// Posts a new reservation
const createReservation = async(req, res) => {
    try {                           
        const {roomTitle, roomType, roomNumber,checkIn, checkOut,days,pin} = req.body;
        const reservation = await Reservations.create({roomTitle, roomType, roomNumber, checkIn, checkOut,days,pin});
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};            

const getRoomDetails = async (req, res) => {
    try {
        const {roomNumber } = req.params; 
        const room = await Reservations.findOne({roomNumber: roomNumber});
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    createReservation,
    getRoomDetails
};