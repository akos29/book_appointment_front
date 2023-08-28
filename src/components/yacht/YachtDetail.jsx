import React from 'react';
import './YachtDetail.css';

function YachtDetail() {
  const yachtData = {
    date: '2023-08-23T10:00:00Z',
    city: 'Miami',
    user_id: 1,
    yacht_id: 1,
    created_at: '2023-08-20T08:00:00Z',
    updated_at: '2023-08-20T08:00:00Z',
    image_path: '/path/to/image1.jpg',
    yacht_name: 'Luxury Cruiser',
    price: 1500,
    duration: '4 hours',
    yacht_model: 'Model X',
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-semibold mb-4'>Yacht Details</h2>
      <div className='border border-gray-300 rounded p-4'>
        <img
          src={yachtData.image_path}
          alt='Yacht'
          className='w-full mb-4 rounded-lg'
        />
        <h3 className='text-xl font-semibold mb-2'>
          {yachtData.yacht_name} - {yachtData.yacht_model}
        </h3>
        <p className='text-gray-600 mb-2'>
          ${yachtData.price} for {yachtData.duration}
        </p>
        <p className='text-gray-600 mb-2'>
          Available on: {yachtData.date} in {yachtData.city}
        </p>
        <button
          type='button'
          className='bg-blue-500 text-white rounded px-4 py-2'
        >
          Make Reserve
        </button>
      </div>
    </div>
  );
}

export default YachtDetail;
