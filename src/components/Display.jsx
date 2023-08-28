import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYatchs } from '../redux/yatch/yatchSlice';
import ReservationForm from './reservation/ReservationForm';
import ReservationsList from './reservation/ReservationList';

function Display() {
  const dispatch = useDispatch();
  const { yatchs, loading, error, loaded } = useSelector(
    (store) => store.yatchs,
  );

  useEffect(() => {
    if (!loaded) dispatch(fetchYatchs());
  }, [dispatch, loaded]);

  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <h1>Display yachts!</h1>
          <p>
            {error ? (
              <b className='text-red-500'>{String(error)}</b>
            ) : (
              <b>{String(yatchs)}</b>
            )}
          </p>
          <ReservationForm />
          <ReservationsList />
        </>
      )}
    </div>
  );
}

export default Display;
