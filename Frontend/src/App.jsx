import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './login'; 
import Register from './register'; 
import Home from './home'; 
import Output from './output';
import Navbar from './navbar';

// import BangkitBG from './assets/BangkitBG.png';

function App() {
  const location = useLocation();
  return (
    <div
      className='text-black flex flex-col bg-contain bg-center bg-no-repeat w-full my-auto min-h-screen'
      // style={{ backgroundImage: `url(${BangkitBG})` }}
    >
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
      
      <div className="flex-grow flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/output" element={<Output />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;