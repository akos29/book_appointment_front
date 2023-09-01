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
    <div className='flex col'>
      <div className='grow aspect-w-10 aspect-h-9 lg:aspect-none'>
        <img
          src={yacht?.photo}
          alt='Yacht'
          className='w-full h-full object-center object-cover lg:w-full lg:h-full'
        />
      </div>

      <div>
        <h2 className='text-2xl font-semibold mb-4 flex-none w-14 h-14'>
          Yacht Details
        </h2>
        <table className='hover:table-fixed'>
          <tr>
            <th className='border-spacing: 1.75rem var(--tw-border-spacing-y)'>
              Price
            </th>
            <td className='border-spacing: 1.75rem var(--tw-border-spacing-y)'>
              {yacht.price}
            </td>
          </tr>
          <tr>
            <th>Total Amount Payable</th>
            <td>{yacht.price - 0.25 * yacht.price}</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>1961</td>
          </tr>
        </table>
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
