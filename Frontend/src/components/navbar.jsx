import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useUser } from '../context/UserContext';

function NavbarWithSidebar() {
  const { logout } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
        await logout()
        navigate('/login');
    } catch (error) {
        console.error("Error logging out:", error);
        setMessage(error.response?.data?.message || 'An error occurred');
    }
};

  // Sample data for products (replace with your data source)
  const products = [
    { id: 1, name: "Product A", createdAt: "2024-11-30" },
    { id: 2, name: "Product B", createdAt: "2024-11-29" },
    { id: 3, name: "Product C", createdAt: "2024-11-28" },
  ]; // Fetch from metadata

  return (
    <div>
      {/* Add this in your JSX, perhaps near the top of the return statement */}
{message && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <span className="block sm:inline">{message}</span>
  </div>
)}
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        {/* Hamburger Menu */}
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
          )}
        </IconButton>

        {/* Logo */}
        <div className="text-lg font-bold">Logo</div>

        {/* Profile Menu */}
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
                onClick={() => navigate('/profile')} // Navigate to Profile
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Profile
              </button>
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

      {/* Sidebar */}
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-full w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Typography variant="h5" color="blue-gray">
              Chat History
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            {products.map((product) => (
              <ListItem
                key={product.id}
                className="flex items-start bg-gray-50 hover:bg-gray-100 transition-colors rounded-md p-3"
              >
                <ListItemPrefix>
                  <ChevronRightIcon className="h-5 w-5 text-blue-gray-400" />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="opacity-70"
                  >
                    {product.createdAt}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>
        </Card>
      </Drawer>
    </div>
  );
}

export default NavbarWithSidebar;
