import { useState } from 'react';

const Home = () => {
  const [selectedOptions, setSelectedOptions] = useState(Array(5).fill(''));
  const [message, setMessage] = useState('');

  const handleDropdownChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSend = () => {
    alert(`Message sent: ${message}`);
    setMessage(''); // Clear the message after sending
  };

  return (
    <div className="flex h-screen text-blue-600">
      {/* Main Section */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to PRD Maker</h1>
        
        {/* Table */}
        <table className="min-w-full border-collapse border border-gray-300 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Letter</th>
              <th className="border border-gray-300 p-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {['a', 'i', 'u', 'e', 'o'].map((letter, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{letter}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={selectedOptions[index]}
                    onChange={(e) => handleDropdownChange(index, e.target.value)}
                    className="w-full"
                  >
                    <option value="">Select an option</option>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Textarea and Send Button */}
        <div className="flex flex-col">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-300 p-2 mb-2"
            rows="4"
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white py-2 rounded"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;