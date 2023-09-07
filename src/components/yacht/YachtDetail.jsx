import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getYacht } from '../../redux/yacht/yachtSlice';
import ReservationForm from '../reservation/ReservationForm';

function YachtDetail({ yachtId, handleView }) {
  const yacht = useSelector((state) => state.yachts.yacht);

  const dispatch = useDispatch();

  const [showReservationForm, setShowReservationForm] = useState(false);

  useEffect(() => {
    if (yacht.id) {
      dispatch(getYacht(yachtId));
    }
  }, [dispatch, yachtId, yacht.id]);

  return showReservationForm ? (
    <ReservationForm yId={Number(yacht.id)} yachtName={yacht.model} />
  ) : (
    <div className='flex flex-col mt-16 lg:flex-row space-y-9 space-x-9 justify-between ml-0'>
      <div className='grow aspect-w-16 aspect-h-9 lg:aspect-none max-w-[90%] md:max-w-[900px] self-center'>
        <img
          src={yacht?.photo}
          alt={yacht?.model}
          className='w-full object-center object-cover lg:w-full lg:h-full rounded-3xl shadow-2xl'
        />
      </div>

      <div className='flex flex-col md:flex-row ml-0'>
        <div className='flex flex-col justify-between ml-fix'>
          <div className='flex flex-col space-y-2'>
            <h2 className='text-2xl font-semibold h-14 text-left'>
              Yacht Details
            </h2>
            <div className='relative shadow-md sm:rounded-lg ml-fix'>
              <table className='w-full text-sm text-left text-white-500 dark:text-gray-700 ml-fix'>
                <tr>
                  <th scope='col' className='px-4 py-3'>
                    Price
                  </th>
                  <td className='border-spacing: 1.75rem var(--tw-border-spacing-y) justify-self-end'>
                    {yacht.price}
                  </td>
                </tr>
                <tr className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                  <th
                    scope='row'
                    className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    Total Amount Payable
                  </th>
                  <td className='px-4 py-3 text-white'>
                    {yacht.price - 0.25 * yacht.price}
                  </td>
                </tr>
                <tr>
                  <th scope='col' className='px-4 py-3'>
                    Duration
                  </th>
                  <td className='pr-1'>{yacht.updated_at}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className='flex space-x-2 justify-end mt-6'>
            <button
              type='button'
              className='bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300'
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
  yachtId: PropTypes.number.isRequired,
  handleView: PropTypes.func.isRequired,
};

export default YachtDetail;
