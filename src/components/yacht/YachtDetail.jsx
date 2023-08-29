import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getYacht } from '../../redux/yacht/yachtSlice';

function YachtDetail({ yachtId, handleView }) {
  const yacht = useSelector((state) => state.yachts.yacht);
  const { yachtLoading } = useSelector((state) => state.yachts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (yacht?.id) {
      dispatch(getYacht(yachtId));
    }
  }, [dispatch, yachtId]);

  return yachtLoading ? (
    <h1>Loading ...</h1>
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
        <button
          type='button'
          className='bg-blue-500 text-white rounded px-4 py-2'
        >
          Make Reserve
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          onClick={() => handleView(false)}
          type='button'
        >
          Back
        </button>
      </div>
    </div>
  );
}

YachtDetail.propTypes = {
  yachtId: PropTypes.string.isRequired,
  handleView: PropTypes.func.isRequired,
};

export default YachtDetail;
