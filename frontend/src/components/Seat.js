import React from 'react';

const Seat = ({ seat }) => {
  return (
    <div className={`seat ${seat.booked ? 'booked' : 'available'}`}>
      {seat.seatNo}
    </div>
  );
};

export default Seat;
