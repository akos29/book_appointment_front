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
    <div className='flex flex-row space-y-9 space-x-9'>
      <div className='grow aspect-w-16 aspect-h-9 lg:aspect-none self-end'>
        <img
          src={yacht?.photo}
          alt={yacht?.model}
          className='w-full object-center object-cover lg:w-full lg:h-full rounded-3xl shadow-2xl'
        />
      </div>

      <div className='flex flex-row justify-end'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col space-y-2'>
            <h2 className='text-2xl font-semibold h-14 subpixel-antialiased'>
              Yacht Details
            </h2>
            <table className='hover:table-fixed border-spacing-1 transition-colors max-h-4 justify-items-stretch caption-top'>
              <tr className='border border-slate-600 '>
                <th className='justify-self-end'>Price</th>
                <td className='border-spacing: 1.75rem var(--tw-border-spacing-y) justify-self-end'>
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
          </div>
          <div className='flex space-x-2 justify-end'>
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
    </div>
  );
}

YachtDetail.propTypes = {
  yachtId: PropTypes.string.isRequired,
  handleView: PropTypes.func.isRequired,
};

export default YachtDetail;
