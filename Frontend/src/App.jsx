import { Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './components/login'; 
import Register from './components/register'; 
import Home from './components/home'; 
import Output from './components/output';
import Navbar from './components/navbar';
import Profile from './components/profile';

// import BangkitBG from './assets/BangkitBG.png';

function App() {
  const location = useLocation();
  return (
    <UserProvider>
      <div
        className='text-black flex flex-col bg-contain bg-center bg-no-repeat w-full my-auto min-h-screen'
      >
        {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}
        
        <div className="flex-grow flex justify-center items-center">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/output" element={<Output />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;