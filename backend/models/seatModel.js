const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
  seatNo: { type: Number, required: true },
  booked: { type: Boolean, default: false },
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
