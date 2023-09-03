import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/auth/authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [states, setStates] = useState({
    errors: [],
    logged: false,
  });

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: [e.target.value][0],
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
        { user },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        dispatch(login(res.data));
        setStates({ ...states, errors: [], logged: true });
        navigate('/');
      })
      .catch((err) => {
        setStates({ ...states, errors: [states.errors, ...err] });
      });
  };

  return (
    <div>
      <h1 className='text-4xl text-green-600 font-bold pt-6 py-20'>Login</h1>

      <form
        onSubmit={handleLogin}
        onChange={handleInput}
        className='flex flex-col gap-y-4 bg-white px-4 py-12 shadow-md border-gray-100 border-2 w-[96%] max-w-[640px] mx-auto'
      >
        {states.errors.map((err) => (
          <span
            key={String(err.code).codePointAt * Math.random()}
            className='text-red-500'
          >
            {err?.response?.data}
          </span>
        ))}
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
          className='px-12 py-3 text-white bg-blue-500 rounded-sm max-w-[280px] mx-auto block capitalize mt-6 hover:bg-blue-700'
        >
          login
        </button>
        <p>
          <span>Don&apos;t have an account</span>
          <Link to='/register' className='pl-2 text-green-500 font-semibold'>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
