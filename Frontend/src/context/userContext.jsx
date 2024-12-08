// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser ] = useState(null); // Store user info
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to store error messages

    const login = async () => {
        try {
            // Fetch user data
            await fetchUser(); 
            if (user && user.token) { // Ensure user and user.token are set
                Cookies.set('jwt', user.token, { secure: true, sameSite: 'Strict' }); // Set the JWT cookie securely
                console.log("User logged in successfully, JWT set.");
            } else {
                throw new Error("User data is invalid or null after fetching.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Failed to log in. Please try again.");
        }
    };

    
    const logout = async () => {
        try {
            // Optional: Perform server-side logout
            await axios.post('http://localhost:3000/api/v1/auth/logout', {}, { 
                withCredentials: true 
            });
    
            // More comprehensive cookie removal
            Cookies.remove('jwt', { 
                path: '/', 
                domain: window.location.hostname // Add domain if necessary
            });
    
            // Clear browser storage as an additional precaution
            localStorage.clear();
            sessionStorage.clear();
    
            setUser(null);
            setError(null);
            console.log("Logged out successfully");
        } catch (err) {
            console.error("Logout error:", err);
            setError("Failed to log out. Please try again.");
        } finally {
            // Ensure loading state is reset
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            console.log("Fetching user data...");
            const response = await axios.get('http://localhost:3000/api/v1/auth/me', {
                withCredentials: true, // Ensure cookies are sent with the request
            });
            
            setUser(response.data); // Set user data from the response
            console.log("User data fetched successfully:", response.data);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error("Error fetching user data:", err);
    
            if (err.response) {
                // Handle HTTP response errors (e.g., 401, 404, 500)
                console.error("Server responded with status:", err.response.status);
                console.error("Response data:", err.response.data);
                setError(err.response.data.message || "Failed to fetch user data.");
            } else if (err.request) {
                // Handle network errors (e.g., no response from server)
                console.error("No response received from server:", err.request);
                setError("Network error: Unable to connect to the server.");
            } else {
                // Handle unexpected errors
                console.error("Unexpected error:", err.message);
                setError("An unexpected error occurred. Please try again.");
            }
    
            setUser(null); // Clear user data in case of an error
        } finally {
            console.log("Loading completed.");
            setLoading(false); // Ensure loading state is updated
        }
    };

    useEffect(() => {
        const token = Cookies.get('jwt');
        if (token) {
            fetchUser(); // Fetch user data if token is present
        } else {
            console.log("No token found, skipping user fetch.");
            setLoading(false); // Set loading to false if no token is found
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useUser  = () => useContext(UserContext);