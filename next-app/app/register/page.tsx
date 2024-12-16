'use client';

import { useState } from 'react';
import { BiUser  } from 'react-icons/bi';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFilled = username && email && password && confirmPassword; // Check if all fields are filled
  const isEmailValid = email.includes('@') && email.includes('.'); // Check if email is valid
  const isPasswordMatch = password === confirmPassword; // Check if password matches confirm password
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Registering user...');

      const result = await axios.post('http://34.101.174.135:8080/api/v1/auth/register', {
        "name": username,
    "email": email,
    "password": password,
    "passwordConfirm": confirmPassword
      });

      console.log('Registration result:', result.data);
      router.push('/home');
    }
    catch (error) {
      console.error('Registration failed:', error);
    }

    
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative">
            <label
              htmlFor="username"
              className={`block text-sm font-medium text-gray-700 transition-all ${
                username ? 'transform -translate-y-1.5 text-blue-600 text-xs' : 'text-base'
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full border-b-2 border-gray-300 py-2 focus:border-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className={`block text-sm font-medium text-gray-700 transition-all ${
                email ? 'transform -translate-y-1.5 text-blue-600 text-xs' : 'text-base'
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border-b-2 border-gray-300 py-2 focus:border-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className={`block text-sm font-medium text-gray-700 transition-all ${
                password ? 'transform -translate-y-1.5 text-blue-600 text-xs' : 'text-base'
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-b-2 border-gray-300 py-2 focus:border-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className={`block text-sm font-medium text-gray-700 transition-all ${
                confirmPassword ? 'transform -translate-y-1.5 text-blue-600 text-xs' : 'text-base'
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full border-b-2 border-gray-300 py-2 focus:border-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFilled || !isEmailValid || !isPasswordMatch}
            className={`w-full py-2 mt-4 rounded-md text-white font-semibold transition-colors ${
              isFilled && isEmailValid && isPasswordMatch
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Register
          </button>
  
          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );  
};

export default Register;