// src/Navbar.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = () => {
    // Perform logout logic here (if any)
    navigate('/login'); // Use navigate to redirect to login
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Logo</div>
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none"
        >
          <img
            src="https://via.placeholder.com/30" // Replace with your account icon
            alt="Account"
            className="w-8 h-8 rounded-full"
          />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;