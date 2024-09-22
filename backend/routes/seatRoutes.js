const express = require('express');
const { initializeSeats, getSeats, bookSeats } = require('../controllers/seatController');
const router = express.Router();

router.get('/initialize', initializeSeats); // Initialize seat data
router.get('/', getSeats); // Fetch all seats
router.post('/book', bookSeats); // Book seats

module.exports = router;
