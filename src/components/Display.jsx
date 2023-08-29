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
        <div className='flex flex-col gap-4 items-center justify-center'>
          {error ? (
            <b className='text-red-500'>{String(error)}</b>
          ) : (
            <div className='grid place-content-center gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4'>
              {yachts.map((yatch) => (
                <div
                  key={yatch.id}
                  className='shadow-md cursor-pointer rounded-sm overflow-hidden flex flex-col gap-2 bg-white pb-4'
                >
                  <img src={yatch.photo} alt='yacht' />
                  <h4 className='text-xl my-2 capitalize font-semibold text-blue-600'>
                    {yatch.model}
                  </h4>
                  <em>Captain: {yatch.captain_name}</em>
                  <b>Price: ${`${yatch.price}`}</b>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Display;
