import { useEffect, useState} from 'react';
import { BiUser  } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser  } from '../context/UserContext';


const Login = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const isFilled = email && password; // Check if both fields are filled

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/auth/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Login successful!');
      login(response.data.token); // Simpan token ke context atau state global
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const checkUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/auth/me', {
        withCredentials: true,
      });
      login(response.data.token); // Jika user sudah login, simpan token
      navigate('/home'); // Redirect langsung ke home
    } catch (error) {
      console.error('User not logged in:', error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25 relative w-1/3 mx-auto my-auto text-black">
      <h1 className="text-4xl font-bold text-center text-black py-4">Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="relative my-4">
        <label
            htmlFor="email"
            className={`absolute text-xl duration-300 transform ${
              email ? '-translate-y-3 scale-75 text-blue-600' : 'top-2 scale-100'
            } left-0 text-black`}
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update username state
            className="block w-full py-3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600"
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
            } left-0 text-black`}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            className="block w-full py-3 px-0 text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600"
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
          <span>
            New here? <Link to="/register" className="text-blue-500">Register</Link>
          </span>
          <span>
          {message && <p>{message}</p>}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;