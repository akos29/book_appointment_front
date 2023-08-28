import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { makeReservation } from '../../redux/reservation/reservationSlice';

function ReservationForm() {
  // const dispatch = useDispatch();
  // const { username, selectedItem } = useSelector((state) => state.user); // Get user data from redux store

  const [date, setDate] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // const reservation = { username, item: selectedItem, date, city };
    // dispatch(makeReservation(reservation));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value='username' readOnly />
        <input type='text' value='selectedItem' readOnly />
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type='submit'>Reserve</button>
      </form>
    </div>
  );
}

export default ReservationForm;
