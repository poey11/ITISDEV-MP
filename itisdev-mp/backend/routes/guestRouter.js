const express = require('express');
const {recordGuest} = require('../controllers/guestController');


const router = express.Router();

router.post('/', recordGuest);


module.exports = router;