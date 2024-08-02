const Guests = require('../models/GuestModel'); 

const recordGuest = async(req, res) => {
    try {                           
        const {title, fullName, gender, email, phone,address,reservationId} = req.body;
        const guest = await Guests.create({title, fullName, gender, email, phone,address,reservationId});
        res.status(201).json(guest);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};              

module.exports = {
    recordGuest
};