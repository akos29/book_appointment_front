import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYachts } from '../redux/yacht/yachtSlice';

function Display() {
  const dispatch = useDispatch();
  const { yachts, loading, error, loaded } = useSelector(
    (store) => store.yachts,
  );

  useEffect(() => {
    if (!loaded) dispatch(fetchYachts());
  }, [dispatch, loaded]);

  return (
    <div>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          <h1>Display yatchs!</h1>
          <div>
            {error ? (
              <b className='text-red-500'>{String(error)}</b>
            ) : (
              <div>
                {yachts.map((y) => (
                  <div key={y.id}>
                    <h4>{y.model}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Display;
