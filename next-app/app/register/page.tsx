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
    <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25 relative w-1/3 mx-auto my-20">
      <h1 className="text-4xl font-bold text-center text-white py-4">Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="relative my-4">
          <label
            htmlFor="username"
            className={`text-xl absolute duration-300 transform ${
              username ? '-translate-y-3 scale-75 text-blue-600' : 'top-2 scale-100'
            } left-0 text-white`}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full py-3 px-0 text-sm text-slate-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
            required
          />
          <BiUser  className="absolute top-2 right-0 text-white" />
        </div>

        {/* Email */}
        <div className="relative my-4">
          <label
            htmlFor="email"
            className={`text-xl absolute duration-300 transform ${
              email ? '-translate-y-3 scale-75 text-blue-600' : 'top-2 scale-100'
            } left-0 text-white`}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full py-3 px-0 text-sm text-slate-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
            required
          />
          <AiOutlineMail className="absolute top-2 right-0 text-white" />
        </div>

        {/* Password */}
        <div className="relative my-4">
          <label
            htmlFor="password"
            className={`absolute text-xl duration-300 transform ${
              password ? '-translate-y-3 scale-75 text-blue-600' : 'top-2 scale-100'
            } left-0 text-white`}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full py-3 px-0 text-sm text-slate-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
            required
          />
          <AiOutlineUnlock className="absolute top-2 right-0 text-white" />
        </div>

        {/* Confirm Password */}
        <div className="relative my-4">
          <label
            htmlFor="confirmPassword"
            className={`absolute text-xl duration-300 transform ${
              confirmPassword ? '-translate-y-3 scale-75 text-blue-600' : 'top-2 scale -100'
            } left-0 text-white`}
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full py-3 px-0 text-sm text-slate-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
            required
          />
          <AiOutlineUnlock className="absolute top-2 right-0 text-white" />
        </div>

        {/* Submit Button */}
        <div className="my-4">
          <button
            className={`text-white py-2 px-4 rounded-md w-full ${
              isFilled && isEmailValid && isPasswordMatch ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'
            } rounded-xl`}
            type="submit"
            disabled={!isFilled || !isEmailValid || !isPasswordMatch}
          >
            Register
          </button>
        </div>
        <div className="my-4">
          <span>
            Already have an account? <Link href="/login" className="text-blue-500">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;