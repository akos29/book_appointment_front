import React from 'react';
import Display from '../components/Display';
import ReservationsList from '../components/reservation/ReservationList';

function Home() {
  return (
    <div className=''>
      <Display />
      <ReservationsList />
    </div>
  );
}

export default Home;
