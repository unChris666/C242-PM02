'use client';

import { useState } from 'react';
import { BiUser  } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isFilled = email && password;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
router.push('/home');

    // const result = await signIn('credentials', {
    //   email,
    //   password,
    //   redirect: false,
    // });

    // if (result?.ok) {
    //   console.log('Login successful');
    //   router.push('/home');
    // } else {
    //   console.error('Login failed:', result?.error);
    // }
  };

  return (

    <div>
      <h1 className='text-8xl text-center antialiased font-bold p-5 my-10 cursor-pointer mx-auto'>
      Welcome to <span></span>
      <span>
        {Array.from("PRDify!").map((letter, index) => (
          <span key={index} className="scale-up inline-block hover:-translate-y-5 hover:scale-150 transform transition duration-500 ease-in-out cursor-pointer">
            {letter}
          </span>
        ))}
      </span>
    </h1>

    
    <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25 relative w-1/3 mx-auto text-black my-20">
      <h1 className="text-4xl font-bold text-center py-4 text-white">Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="relative my-4">
        <label
            htmlFor="email"
            className={`absolute text-xl duration-300 transform ${
              email ? '-translate-y-4 scale-75 text-blue-600' : 'top-2 scale-100'
            } left-0 text-slate-500 radius-xl`}
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update username state
            className="block w-full py-3 px-0 text-sm text-slate-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
            required // Mark as required
          />
          
          <BiUser className="absolute top-2 right-0 text-white" />
        </div>
        {/* Password */}
        <div className="relative my-4">
        <label
            htmlFor="password"
            className={`text-xl absolute duration-300 transform ${
              password ? '-translate-y-3 scale-75 text-blue-600' : 'top-2 scale-100'
            } left-0 text-slate-500`}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            className="block w-full py-3 px-0 text-sm text-slate-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600"
            required // Mark as required
          />
          
          <AiOutlineUnlock className="absolute top-2 right-0 text-white" />
        </div>
        {/* Submit Button */}
        <div className="my-4">
          <button
            className={`text-white text-xl py-2 px-4 rounded-md w-full ${
              isFilled ? 'bg-blue-500' : 'bg-gray-500 cursor-not-allowed'
            } rounded-xl`}
            type="submit"
            disabled={!isFilled} // Disable button if fields are empty
          >
            Login
          </button>
        </div>
        <div className="my-4">
        <span className='text-white'>
            New here? <Link href="/register" className="text-blue-500">Register</Link>
          </span>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;