const Seat = require('../models/seatModel');

// Initialize seat data (if not already)
const initializeSeats = async (req, res) => {
  try {
    const existingSeats = await Seat.find();
    if (existingSeats.length === 0) {
      const seats = [];
      for (let i = 1; i <= 80; i++) {
        seats.push({ seatNo: i, booked: false });
      }
      await Seat.insertMany(seats);
    }
    res.status(200).json({ message: 'Seats initialized' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all seats
const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Book seats
const bookSeats = async (req, res) => {
  const { seatNumbers } = req.body;
    // const { numSeats, seatNumbers } = req.body;
    if (!seatNumbers || seatNumbers.length < 1 || seatNumbers.length > 7) {
      return res.status(400).json({ message: 'You can only book between 1 and 7 seats.' });
    }
  
    try {
      // Find the seats that are being requested to ensure they are available
      const availableSeats = await Seat.find({ seatNo: { $in: seatNumbers }, booked: false });
      
      if (availableSeats.length !== seatNumbers.length) {
        return res.status(400).json({ message: 'Some of the requested seats are already booked.' });
      }
  
      // Book the available seats
      await Seat.updateMany({ seatNo: { $in: seatNumbers } }, { booked: true });
  
      res.status(200).json({ bookedSeats: seatNumbers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { initializeSeats, getSeats, bookSeats };
