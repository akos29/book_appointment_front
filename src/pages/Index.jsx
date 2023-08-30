import React from 'react';
import Display from '../components/Display';

function Home() {
  return (
    <div className=''>
      <h1 className='text-4xl text-blue-600 font-bold pt-6 py-20'>
        Display yachts
      </h1>
      <Display />
    </div>
  );
}

export default Home;
