import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYachts, deleteYacht } from '../redux/yacht/yachtSlice';

function DeleteYacht() {
  const dispatch = useDispatch();
  const { yachts, loading, error, loaded } = useSelector(
    (store) => store.yachts,
  );

  useEffect(() => {
    if (!loaded) dispatch(fetchYachts());
  }, [dispatch, loaded]);

  return (
    <div>
      <h1>Delete Yacht!</h1>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <div>
          {error ? (
            <b>{String(error)}</b>
          ) : (
            <div>
              {yachts.map((yatch) => (
                <div>
                  <img src={yatch.photo} alt='yacht' />
                  <h4>{yatch.model}</h4>
                  <em>Captain: {yatch.captain_name}</em>
                  <b>Price: ${`${yatch.price}`}</b>
                  <button type='button'>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default DeleteYacht;
