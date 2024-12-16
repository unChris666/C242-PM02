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
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      console.log('Login successful');
      router.push('/home');
    } else {
      console.error('Login failed:', result?.error);
      setMessage(result?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-extrabold mb-12 text-gray-800">
        Welcome to <span className="text-blue-600">PRDify!</span>
      </h1>
  
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              type="text"
              id="email"
              name="email"
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full border-b-2 border-gray-300 py-2 focus:border-blue-500 focus:outline-none text-black"
              required
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFilled}
            className={`w-full py-2 mt-4 rounded-md text-white font-semibold transition-colors ${
              isFilled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Login
          </button>
  
          <div className="text-center mt-4 text-sm text-gray-600">
            New here?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </form>
        {}
      {message && (
        <div className="mt-4 text-center text-red-600">
          {message}
        </div>
      )}
      </div>
    </div>
  );  
};

export default Login;