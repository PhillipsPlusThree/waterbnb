import React, { useState } from 'react';
import axios from 'axios';
import boatLogo from '../assets/boat.png';
import '../styles/login.css';

function SignUp({onHandleButtonClick}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [signUpStatus, setSignUpStatus] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const result = await axios.post('/api/signup', {
        username: username,
        email: email,
        password: password,
      });
      console.log(result.data);
      setSignUpStatus('Success');
      setTimeout(() => {
        onHandleButtonClick()
      }, 1500);
      localStorage.setItem('username', result.data.username);
    } catch (error) {
      console.error(error.response.data.error);
        setSignUpStatus(error.response.data.error) 
    }
  };

  
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" id="LLogin" src={boatLogo} alt="" />
        </div>
        <div className="bg-gray-800 flex flex-col justify-center rounded-br-30" id="RLogin">
          <button
            className="absolute top-2 right-2 bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 focus:bg-gray-400"
            onClick={onHandleButtonClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <form className="max-w-[90%] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg" onSubmit={handleSignUp}>
            <h2 className="text-4xl dark:text-white font-bold text-center">Register</h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Username</label>
              <input
                className="rounded-lg bg-gray-700 mt-1 p-1 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Email</label>
              <input
                className="rounded-lg bg-gray-700 mt-1 p-1 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Password</label>
              <input
                className="rounded-lg bg-gray-700 mt-1 p-1 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="submit">
              Sign Up
            </button>
          </form>
            {signUpStatus && (
            <div className="text-center text-white">
              {signUpStatus === 'Success' ? (
                <h1 className="text-green-500">Account created successfully!</h1>
              ) : (
                <h1 className="text-red-500">{signUpStatus}</h1>
              )}
            </div>
          )}_
        </div>
      </div>
    </div>
  );
}

export default SignUp;
