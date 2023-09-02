import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddYacht() {
  const [model, setModel] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState(0);
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
            // toast.success(data.message);
            setTimeout(() => {
              navigate('/');
            }, 3500);
          } else {
            // Handle the case where the server responds with success:false
          }
        } else {
          // Handle other response status codes (e.g., 400, 500, etc.)
          console.error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
        // Handle any other errors (e.g., network error)
        console.error(error);
      }
    } else {
      console.error('Please upload an image');
    }
  };

  return (
    <div>
      <h1>Add Yacht</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Model'
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type='text'
          placeholder='Captain name'
          value={captainName}
          onChange={(e) => setCaptainName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type='number'
          placeholder='User ID'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type='file'
          name='yacht_image'
          accept='image/*'
          onChange={(e) => setYachtImage(e.target.files[0])}
        />
        <button type='submit'>Add Yacht</button>
      </form>
    </div>
  );
}

export default AddYacht;
