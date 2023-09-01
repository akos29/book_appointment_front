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
    <div className='p-4'>
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <label
            htmlFor='userName'
            className='block text-gray-700 font-semibold mb-2'
          >
            User Name
          </label>
          <input
            type='text'
            id='userName'
            value={user.name}
            disabled
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='yachtName'
            className='block text-gray-700 font-semibold mb-2'
          >
            Yacht Name
          </label>
          <input
            type='text'
            id='yachtName'
            value={yachtName}
            disabled
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='date'
            className='block text-gray-700 font-semibold mb-2'
          >
            Date
          </label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='city'
            className='block text-gray-700 font-semibold mb-2'
          >
            City
          </label>
          <input
            type='text'
            id='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300'
        >
          Reserve
        </button>
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