import React, { useState, useEffect } from "react";
import axios from "axios";
// import Seat from "./components/Seat";
import "./App.css";

const App = () => {
  const [seats, setSeats] = useState([]);
  const [numSeats, setNumSeats] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const { data } = await axios.get(`https://train-seat-reservation-syst-git-b85bdc-nikets-projects-8738e377.vercel.app//api/seats`);
      setSeats(data);
    };
    fetchSeats();
  }, []);

  const handleSeatClick = (seat) => {
    if (seat.booked) return; // Prevent selecting booked seats

    if (selectedSeats.includes(seat.seatNo)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatNo)); // Deselect
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNo]); // Select
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to book.");
      return;
    }

    const response = await axios.post(`https://train-seat-reservation-syst-git-b85bdc-nikets-projects-8738e377.vercel.app//api/seats/book`, {
      numSeats: selectedSeats.length, // Use the length of selected seats
      seatNumbers: selectedSeats, // Send the specific seat numbers
    });

    // Update bookedSeats after successful booking
    if (response.data.bookedSeats) {
      setBookedSeats([...bookedSeats, ...response.data.bookedSeats]);
      setSelectedSeats([]); // Clear selected seats after booking
    } else {
      console.error("Booking failed:", response.data.message);
    }
  };
  const availableSeats = seats.filter((seat) => !seat.booked);

  return (
    <div className="App">
    <h1 className="cool-heading">Train Seat Booking System</h1>

    

    {/* Seat Layout */}
    <div className="seat-layout">
      {seats.map((seat) => (
        <button
          key={seat.seatNo}
          className={`seat ${
            seat.booked
              ? "booked"
              : selectedSeats.includes(seat.seatNo)
              ? "selected"
              : ""
          }`}
          onClick={() => handleSeatClick(seat)}
          disabled={seat.booked}
        >
          {seat.seatNo}
        </button>
      ))}
    </div>

    {/* Legend */}
    <div className="legend">
      <div className="legend-item">
        <div className="legend-box legend-available"></div> Available
      </div>
      <div className="legend-item">
        <div className="legend-box legend-booked"></div> Booked
      </div>
      <div className="legend-item">
        <div className="legend-box legend-selected"></div> Selected
      </div>
    </div>
    <button onClick={handleBooking} className="booking-button">Book Selected Seats</button>
    {/* Booked Seats */}
    <div className="booked-seats">
      <h3>Booked Seats:</h3>
      {bookedSeats.length === 0 ? (
        <p>No seats booked yet</p>
      ) : (
        <ul>
          {bookedSeats.map(seat => (
            <li key={seat}>{seat}</li>
          ))}
        </ul>
      )}
    </div>

    {/* Available Seats */}
    <div className="available-seats">
      <h3>Available Seats:</h3>
      <ul>
        {availableSeats.map(seat => (
          <div className="legend-item" style={{display:'inline-block', marginTop:'8px'}}>
          <li className="legend-box " key={seat.seatNo}>{seat.seatNo}</li></div>
        ))}
      </ul>
    </div>
  </div>
);
};

export default App;
