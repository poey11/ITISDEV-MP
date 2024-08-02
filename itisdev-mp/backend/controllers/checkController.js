const Reservation = require('../models/ReservationModel');
const Guest = require('../models/GuestModel');

const checkInGuest = async (req, res) => {
    const { fullName, pin } = req.body;

    try {
        // Find the guest
        const guest = await Guest.findOne({ fullName });
        if (!guest) {
            return res.status(404).json({ error: 'Guest not found' });
        }

        // Find the reservation
        const reservation = await Reservation.findOne({ _id: guest.reservationId });
        if (!reservation || reservation.pin !== pin) {
            return res.status(400).json({ error: 'Invalid pin' });
        }


        // Update the reservation to mark as checked in
        reservation.checkInTime = new Date();
        await reservation.save();

  
        // Send the room number back to the client
        res.status(200).json({ message: 'Check-in successful', roomNumber: reservation.roomNumber });
    } catch (error) {
        console.error('Error during check-in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const checkOutGuest = async (req, res) => { 
    const { roomNumber, pin } = req.body;
    try {
        // Find the reservation
        const reservation = await Reservation.findOne({ roomNumber: roomNumber });
        if (!reservation || reservation.pin !== pin) {
            return res.status(400).json({ error: 'Invalid pin' });
        }

        // Update the reservation to mark as checked out
        reservation.checkOutTime = new Date();
        await reservation.save();

        // Send the room number back to the client
        res.status(200).json(reservation._id);

    } catch (error) {
        console.error('Error during check-out:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = { checkInGuest, checkOutGuest };
