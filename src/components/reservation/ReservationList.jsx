import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  fetchReservations,
  deleteReservation,
} from '../../redux/reservation/reservationSlice';
import DeleteConfirmation from '../DeleteConfirmation';
import Loading from '../Loading';

function ReservationsList() {
  const { reservations, loading, loaded } = useSelector(
    (state) => state.reservations,
  );
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [yachtId, setYachtId] = useState(null);

  const showConfirmation = () => {
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setConfirmationOpen(false);
  };

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) dispatch(fetchReservations({ userId: user.id }));
  }, [dispatch, loaded, user.id]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDeleteReservation = (reservationId, yid) => {
    try {
      // Show the confirmation dialog
      setUserId(reservationId);
      setYachtId(yid);
      showConfirmation();
    } catch (error) {
      toast.error('Error deleting reservation:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      // Dispatch the deleteReservation action
      const response = await dispatch(deleteReservation({ userId, yachtId }));

      if (response.payload && response.payload.success) {
        // Reservation deletion was successful
        toast.success('Your reservation is cancelled successfully');
      } else {
        // Reservation deletion failed
        toast.error('Something went wrong! Please try again later.');
      }
    } catch (error) {
      // An error occurred while deleting the reservation
      toast.error('Something went wrong!');
    }

    // Close the confirmation dialog
    closeConfirmation();

    // Refresh the reservation list
    dispatch(fetchReservations({ userId: user.id }));
  };

  return (
    <div className='p-4'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className='text-2xl font-semibold mb-4 mt-6'>My Reservations</h2>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-green-400'>
              <thead className='text-xs text-gray-700 uppercase bg-green-50 dark:bg-green-700 dark:text-green-400 w-3 h-3'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Yacht Model
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Date
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    City
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    {' '}
                    Price
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Reserved By
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr
                    key={reservation.id}
                    className={`bg-white border-b dark:bg-${
                      index % 2 !== 0 ? 'green-800' : 'gray-500'
                    } dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-600`}
                  >
                    <td className='py-2 px-3'>{reservation.yacht.model}</td>
                    <td className='py-2'>{formatDate(reservation.date)}</td>
                    <td className='py-2'>{reservation.city}</td>
                    <td className='px-6 py-4 font-semibold text-green-500 dark:text-green-500'>
                      {reservation.yacht.price}
                    </td>
                    <td className='py-2'>{reservation.user.name}</td>
                    <td className='py-2'>
                      <button
                        type='button'
                        className='bg-red-500 text-white rounded px-4 py-2'
                        onClick={() =>
                          handleDeleteReservation(
                            reservation.id,
                            reservation.yacht.id,
                          )
                        }
                      >
                        Cancel Reservation
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <DeleteConfirmation
        isOpen={isConfirmationOpen}
        onCancel={closeConfirmation}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default ReservationsList;
