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
    </div>
  );
}
export default DeleteYacht;
