import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddYacht() {
  const [model, setModel] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [price, setPrice] = useState(0);
  const [yachtImage, setYachtImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const yachtData = new FormData();
    yachtData.append('yacht[model]', model);
    yachtData.append('yacht[captain_name]', captainName);
    yachtData.append('yacht[price]', price);
    yachtData.append('yacht[yacht_image]', yachtImage);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/yachts`, {
        method: 'POST',
        body: yachtData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Navigate to the yachts page
          navigate('/');
        } else {
          alert(data.message);
        }
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
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