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

  return (
    <div className='p-4'>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <h2 className='text-2xl font-semibold mb-4'>My Reservations</h2>
          <ul className='space-y-2'>
            {reservations.map((reservation) => (
              <li
                key={reservation.id}
                className='border border-gray-300 rounded p-2 flex items-center justify-between'
              >
                <div>
                  <span className='text-lg font-semibold'>
                    Yacht {reservation.yacht_name}
                  </span>
                  <p className='text-gray-600'>{reservation.date}</p>
                  <p className='text-gray-600'>{reservation.city}</p>
                  <p className='text-gray-600'>by {reservation.user.name}</p>
                </div>
                <button
                  type='button'
                  className='bg-blue-500 text-white rounded px-4 py-2'
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ReservationsList;
