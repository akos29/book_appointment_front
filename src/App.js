import { Route, Routes } from 'react-router-dom';
import './App.css';
import Display from './components/Display';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Display />} />
      </Routes>
    </div>
  );
}

export default App;
