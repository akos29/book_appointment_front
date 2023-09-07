import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [errors, setErrors] = useState([]);

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: [e.target.value][0],
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/signup`,
        { user },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        dispatch(register(res.data));
        setErrors([]);
        navigate('/');
      })
      .catch((err) => {
        setErrors([...errors, err]);
      });
  };

  return (
    <div>
      <h1 className='text-4xl text-green-600 font-bold pt-6 py-20'>Register</h1>

      <form
        onSubmit={handleRegister}
        onChange={handleInput}
        className='flex flex-col gap-y-4 bg-white px-4 py-12 shadow-md border-gray-100 border-2 w-[96%] max-w-[640px] mx-auto'
      >
        {errors.map((err) => (
          <span
            key={String(err.code).codePointAt * Math.random()}
            className='text-red-500'
          >
            {err?.response?.data}
          </span>
        ))}
        <input
          className='p-2 pl-4 rounded-sm overflow-hidden outline-none border-2 border-gray-200'
          name='name'
          type='text'
          placeholder='Full Name'
          autoComplete='false'
        />
        <input
          className='p-2 pl-4 rounded-sm overflow-hidden outline-none border-2 border-gray-200'
          name='email'
          type='email'
          placeholder='Email Address'
          autoComplete='false'
        />
        <input
          className='p-2 pl-4 rounded-sm overflow-hidden outline-none border-2 border-gray-200'
          name='password'
          type='password'
          placeholder='Password'
          autoComplete='false'
        />
        <button
          type='submit'
          className='px-12 py-3 text-white bg-green-500 rounded-sm max-w-[280px] mx-auto block capitalize mt-6 hover:bg-green-700'
        >
          Sign up
        </button>
        <p>
          <span>Already have an account?</span>
          <Link to='/login' className='pl-2 text-green-500 font-semibold'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
