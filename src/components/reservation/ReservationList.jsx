import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations } from '../../redux/reservation/reservationSlice';

function ReservationsList() {
  const { reservations, loading, loaded } = useSelector(
    (state) => state.reservations,
  );

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) dispatch(fetchReservations({ userId: user.id }));
  }, [dispatch, loaded, user.id]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDeleteReservation = (reservationId) => {
    // Implement your delete reservation logic here.
    // You can dispatch an action to delete the reservation.
    console.log(reservationId);
  };

  return (
    <div className='p-4'>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <h2 className='text-2xl font-semibold mb-4'>My Reservations</h2>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='text-left'>Yacht Model</th>
                <th className='text-left'>Date</th>
                <th className='text-left'>City</th>
                <th className='text-left'>Reserved By</th>
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
                  <td className='py-2'>{reservation.user.name}</td>
                  <td className='py-2'>
                    <button
                      type='button'
                      className='bg-red-500 text-white rounded px-4 py-2'
                      onClick={() => handleDeleteReservation(reservation.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ReservationsList;
