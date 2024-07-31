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

        // Log the reservation before updating
        console.log('Before updating checkInTime:', reservation);

        // Update the reservation to mark as checked in
        reservation.checkInTime = new Date();
        await reservation.save();

        // Log the reservation after updating
        console.log('After updating checkInTime:', reservation);

        // Send the room number back to the client
        res.json({ message: 'Check-in successful', roomNumber: reservation.roomNumber });
    } catch (error) {
        console.error('Error during check-in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { checkInGuest };
