import React, { useState } from 'react';
import axios from 'axios';
import boatLogo from '../assets/boat.png';
import '../styles/login.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('/api/login', {
        username: username,
        password: password,
      });
      console.log(result.data);
      setLoginStatus('Success'); // Set login status to 'Success' if login is successful
    } catch (error) {
      console.error(error);
      setLoginStatus('Failure'); // Set login status to 'Failure' if login fails
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" id="LLogin" src={boatLogo} alt="" />
        </div>
        <div className="bg-gray-800 flex flex-col justify-center rounded-br-30" id="RLogin">
          <form className="max-w-[90%] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg" onSubmit={handleSignUp}>
            <h2 className="text-4x1 dark:text-white font-bold text-center">Login</h2>
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
          {loginStatus && (
            <div className="text-center text-white">
              {loginStatus === 'Success' ? (
                <h1 className="text-green-500">Login successfully!</h1>
              ) : (
                <h1 className="text-red-500">Failed to Login.</h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;