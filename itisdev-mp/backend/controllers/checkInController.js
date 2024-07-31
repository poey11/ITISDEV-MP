const Guest = require('../models/GuestModel');
const Reservation = require('../models/ReservationModel');
const CheckIn = require('../models/CheckInModel');

const checkInGuest = async (req, res) => {
    const { fullName, pin } = req.body;

    try {
        // Find the guest by full name
        const guest = await Guest.findOne({ fullName }).populate('reservationId');
        if (!guest) {
            return res.status(404).json({ error: 'Guest not found' });
        }

        // Find the reservation using the guest's reservationId and check the pin
        const reservation = guest.reservationId;
        if (!reservation || reservation.pin !== pin) {
            return res.status(400).json({ error: 'Invalid pin' });
        }

        // Create a new check-in record
        const checkIn = new CheckIn({
            reservationId: reservation._id,
            guestId: guest._id,
            roomNumber: reservation.roomNumber,
        });
        await checkIn.save();

        // Send the room number back to the client
        res.json({ message: 'Check-in successful', roomNumber: reservation.roomNumber });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { checkInGuest };
