import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  fetchReservations,
  deleteReservation,
} from '../../redux/reservation/reservationSlice';
import DeleteConfirmation from '../DeleteConfirmation';

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
        <h1>Loading ...</h1>
      ) : (
        <>
          <h2 className='text-4xl text-green-600 font-bold pt-6 py-20'>
            My Reservations
          </h2>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='text-left'>Yacht Model</th>
                <th className='text-left'>Date</th>
                <th className='text-left'>City</th>
                <th className='text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr
                  key={reservation.id}
                  className={index % 2 === 0 ? 'bg-even-row' : 'bg-odd-row'}
                >
                  <td className='py-2'>{reservation.yacht.model}</td>
                  <td className='py-2'>{formatDate(reservation.date)}</td>
                  <td className='py-2'>{reservation.city}</td>
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
