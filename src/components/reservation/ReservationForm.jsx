import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function ReservationForm({ yachtId, yachtName }) {
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const userId = user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/yachts/${yachtId}/reservations`,
        {
          date,
          city,
          user_id: userId,
          yacht_id: yachtId,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Send data as JSON
          },
        },
      );

      if (response.status === 201) {
        const { data } = response;
        if (data.success) {
          toast.success(data.message);
          setTimeout(() => {
            navigate('/reservations');
          }, 1500);
        } else {
          toast.error(data.message);
        }
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={user.name} disabled />

        <input type='text' value={yachtName} disabled />

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

ReservationForm.defaultProps = {
  yachtName: '',
  yachtId: 0,
};

ReservationForm.propTypes = {
  yachtName: PropTypes.string,
  yachtId: PropTypes.string,
};

export default ReservationForm;
