import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { fetchReservations } from '../../redux/reservation/reservationSlice';
import { fetchYachts } from '../../redux/yacht/yachtSlice';

function ReservationForm({ yId, yachtName = null, handleClose }) {
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [yachtId, setYachtId] = useState(yId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const yachts = useSelector((state) => state.yachts.yachts);
  const userId = user.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (yachtId) {
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

        if (response.status === 201 || response.status === 200) {
          const { data } = response;
          if (data.success) {
            toast.success(data.message);
            handleClose();
            setTimeout(() => {
              navigate('/reservations');
              dispatch(fetchReservations({ userId }));
            }, 1500);
          } else {
            toast.error(data.message);
          }
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  useEffect(() => {
    if (!yachts.length) {
      dispatch(fetchYachts());
    }
  }, [yachts, dispatch]);

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <label
            htmlFor='userName'
            className='block text-gray-700 font-semibold mb-2'
          >
            {' '}
            User Name
            <input
              type='text'
              id='userName'
              value={user.name}
              disabled
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            />
          </label>
        </div>

        {yId < 1 ? (
          <div className='mb-4'>
            <label
              htmlFor='yachtName'
              className='block text-gray-700 font-semibold mb-2'
            >
              Yacht Name
              <input
                type='text'
                id='yachtName'
                value={yachtName}
                disabled
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              />
            </label>
          </div>
        ) : (
          <div className='mb-4'>
            <label
              htmlFor='yachtName'
              className='block text-gray-700 font-semibold mb-2'
            >
              Yacht Name
              <select
                id='yachtName'
                value={yachtId}
                onChange={(e) => setYachtId(e.target.value)}
                required
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
              >
                <option value=''>Select Yacht Name</option>
                {yachts.map((yacht) => (
                  <option key={yacht.id} value={yacht.id}>
                    {yacht.model}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        <div className='mb-4'>
          <label
            htmlFor='date'
            className='block text-gray-700 font-semibold mb-2'
          >
            Date
            <input
              type='date'
              id='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            />{' '}
          </label>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='city'
            className='block text-gray-700 font-semibold mb-2'
          >
            City
            <input
              type='text'
              id='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            />{' '}
          </label>
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
  yId: 0,
  handleClose: () => null,
};

ReservationForm.propTypes = {
  yachtName: PropTypes.string,
  yId: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  handleClose: PropTypes.func,
};

export default ReservationForm;
