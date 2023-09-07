import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { switchToUpdate } from '../redux/yacht/yachtSlice';

function AddYacht() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [model, setModel] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [price, setPrice] = useState(0);
  const [userId] = useState(user.id);
  const [yachtImage, setYachtImage] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('yacht[model]', model);
    formData.append('yacht[captain_name]', captainName);
    formData.append('yacht[price]', price);
    formData.append('yacht[user_id]', userId);
    formData.append('yacht[yacht_image]', yachtImage);

    if (yachtImage) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/yachts`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Important for FormData
            },
          },
        );

        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.data.id) {
            toast.success('Successfully added yacht');
            dispatch(switchToUpdate());
            setTimeout(() => {
              navigate('/');
            }, 3500);
          } else {
            // Handle the case where the server responds with success:false
            toast.error(responseData.message);
          }
        } else {
          // Handle other response status codes (e.g., 400, 500, etc.)
          toast.error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
        // Handle any other errors (e.g., network error)
        toast.error(error);
      }
    } else {
      toast.error('Please upload an image');
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-4xl text-green-600 font-bold pt-6 py-20'>
        Add Yacht
      </h1>
      <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
        <div className='mb-4'>
          <label
            htmlFor='model'
            className='block text-gray-700 font-semibold mb-2'
          >
            Model
            <input
              type='text'
              placeholder='Model'
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='captainName'
            className='block text-gray-700 font-semibold mb-2'
          >
            Captain Name
            <input
              type='text'
              placeholder='Captain name'
              value={captainName}
              onChange={(e) => setCaptainName(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='price'
            className='block text-gray-700 font-semibold mb-2'
          >
            Price
            <input
              type='number'
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='userName'
            className='block text-gray-700 font-semibold mb-2'
          >
            User Name
            <input
              type='text'
              id='userName'
              value={user.name}
              disabled
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='yachtImage'
            className='block text-gray-700 font-semibold mb-2'
          >
            Yacht Image
            <input
              type='file'
              name='yacht_image'
              accept='image/*'
              onChange={(e) => setYachtImage(e.target.files[0])}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500'
            />
          </label>
        </div>

        <button
          type='submit'
          className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300'
        >
          Add Yacht
        </button>
      </form>
    </div>
  );
}

export default AddYacht;
