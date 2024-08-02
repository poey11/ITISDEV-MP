const Charge = require('../models/ChargesModel');

const getGuestCharges = async (req, res) => {
    try{
        const { reservationId } = req.params;
        const charges = await Charge.findOne({reservationId: reservationId});
        if (!charges) {
            return res.status(404).json({ error: "Charges not found" });
        }
        res.status(200).json(charges.itemsList);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const createGuestCharge = async (req, res) => {
    try {
        const { reservationId } = req.body;
        const itemsList = [
            { value: "Additional Bed (Service)", quantity: 1, price: 1000.00 },
            { value: "Water (Snack Bar)", quantity: 2, price: 50.00 },
            { value: "Soft Drink (Snack Bar)", quantity: 4, price: 75.00 }
        ];

        const charge = await Charge.create({ reservationId, itemsList });
        res.status(201).json(charge);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getGuestCharges, createGuestCharge };