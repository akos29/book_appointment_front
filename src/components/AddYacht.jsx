import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddYacht() {
  const [model, setModel] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState(null);
  const [yachtImage, setYachtImage] = useState(null);
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const yacht = {
      model,
      captain_name: captainName,
      price,
      user_id: userId,
      yacht_image: yachtImage,
    };
    console.log(yacht);

    if (yachtImage) {
      // Post the yacht to the API
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/yachts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(yacht),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((data) => {
          if (data.success) {
            // Navigate to the Display page
            navigate('/');
            // window.location.href = '/';
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('Please select an image file');
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
