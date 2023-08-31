import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ReservationForm() {
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const yachtId = 3; // Get the yacht ID from the URL


  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.user.id);

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
          // Show success message and redirect after a short delay
          toast.success(data.message);
          setTimeout(() => {
            navigate('/reservations'); // Redirect to reservations page
          }, 1500);
        } else {
          // Handle error, show error message to the user
          toast.error(data.message);
        }
      } else {
        // Handle non-OK response status
        throw new Error(response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Your form inputs */}
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
