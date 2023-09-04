import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchYachts, deleteYacht } from '../redux/yacht/yachtSlice';
import DeleteConfirmation from './DeleteConfirmation';

function DeleteYacht() {
  const dispatch = useDispatch();
  const { yachts, loading, error, loaded } = useSelector(
    (store) => store.yachts,
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

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (!loaded) dispatch(fetchYachts({ userId: user.id }));
  }, [dispatch, loaded]);

  const handleDelete = (yachtId) => {
    try {
      // Show the confirmation dialog
      setUserId(yachtId);
      // eslint-disable-next-line no-undef
      setYachtId(yid);
      showConfirmation();
    } catch (error) {
      toast.error('Error deleting yacht:', error);
    }
    // dispatch(deleteYacht(yachtId));
  };

  const handleConfirmDelete = async () => {
    try {
      // Dispatch the deleteReservation action
      const response = await dispatch(deleteYacht({ userId, yachtId }));

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
    // eslint-disable-next-line no-undef
    dispatch(fetchYachts({ userId: user.id }));
  };

  return (
    <div>
      <h1 className='text-4xl text-red-600 font-bold pt-6 py-20'>
        Delete yacht!
      </h1>
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
                  <button
                    type='button'
                    className='bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-[50%] mx-auto items-center justify-center'
                    onClick={() => handleDelete(yatch.id)}
                  >
                    Cancel Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <DeleteConfirmation
        isOpen={isConfirmationOpen}
        onCancel={closeConfirmation}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
export default DeleteYacht;
