import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './login'; 
import Register from './register'; 
import Home from './home'; 
import Navbar from './navbar';
// import BangkitBG from './assets/BangkitBG.png';

function App() {
  const location = useLocation();
  return (
    <div
      className='text-white h-screen flex flex-col bg-contain bg-center bg-no-repeat bg-black w-full'
      // style={{ backgroundImage: `url(${BangkitBG})` }}
    >
      {/* Conditionally render Navbar based on the current route */}
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
      
      <div className="flex-grow flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;