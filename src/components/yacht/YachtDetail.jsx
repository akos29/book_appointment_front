import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getYacht } from '../../redux/yacht/yachtSlice';
import ReservationForm from '../reservation/ReservationForm';

function YachtDetail({ yachtId, handleView }) {
  const yacht = useSelector((state) => state.yachts.yacht);
  // const { yachtLoading } = useSelector((state) => state.yachts);
  const dispatch = useDispatch();

  const [showReservationForm, setShowReservationForm] = useState(false);

  useEffect(() => {
    if (yacht.id) {
      dispatch(getYacht(yachtId));
    }
  }, [dispatch, yachtId, yacht.id]);

  return showReservationForm ? (
    <ReservationForm yachtId={yachtId} yachtName={yacht.model} />
  ) : (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Yacht Details</h2>
      <div className='border border-gray-300 rounded p-4'>
        <img
          src={yacht?.photo}
          alt='Yacht'
          className='w-full mb-4 rounded-lg'
        />
        <h3 className='text-xl font-semibold mb-2'>
          {yacht?.captain_name} - {yacht?.model}
        </h3>
        <p className='text-gray-600 mb-2'>
          ${yacht?.price} for {yacht?.user_id}
        </p>
        <p className='text-gray-600 mb-2'>Available on: {yacht?.created_at}</p>
        <div className='flex space-x-2'>
          <button
            type='button'
            className='bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
            onClick={() => setShowReservationForm(true)}
          >
            Make Reserve
          </button>
          <button
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300'
            onClick={() => handleView(false)}
            type='button'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

YachtDetail.propTypes = {
  yachtId: PropTypes.string.isRequired,
  handleView: PropTypes.func.isRequired,
};

export default YachtDetail;
