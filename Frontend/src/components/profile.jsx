import { useUser  } from '../context/UserContext'; // Import useUser  hook

const Profile = () => {
  const { user } = useUser (); // Get user data from context

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user ? (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">User  Information</h2>
          <p><strong>Username:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user fields as necessary */}
        </div>
      ) : (
        <p className="text-red-500">No user information available.</p>
      )}
    </div>
  );
};

export default Profile;