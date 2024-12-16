'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: '',
    documentOwner: '',
    developer: '',
    stakeholder: '',
    docStage: '',
    startDate: '',
    endDate: '',
    overview: '',
  });
  const [output, setOutput] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isComplete = Object.values(formData).every(
      (value) => value !== null && value !== ''
    );
    setIsFormValid(isComplete);
  }, [formData]);

  const getBorderClass = (value: string) => {
    if (value === '') {
      return 'border-b-2 border-black focus:border-blue-500';
    }
    return 'border-b-2 border-green-500';
  };

  const handleLogout = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const response = await axios.post('http://34.101.174.135:8080/api/v1/auth/logout');

    console.log('Response:', response.data);

    localStorage.removeItem('next-auth.session-token');

    router.push('/login');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      setLoading(true); // Set loading to true when form is submitted
      const payload = {
        overview: formData.overview,
        start_date: formData.startDate,
        end_date: formData.endDate,
        document_version: '4',
        product_name: formData.productName,
        document_owner: formData.documentOwner,
        developer: formData.developer,
        stakeholder: formData.stakeholder,
        doc_stage: formData.docStage,
        created_date: new Date().toISOString().split('T')[0],
      };

      try {
        const response = await axios.post(
          'https://prd-maker-services-129452438037.asia-southeast2.run.app/generate',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        localStorage.setItem('outputText', response.data.text);
        setOutput(response.data.text);
        setTimeout(() => {
          setLoading(false); // Stop loading after a delay
          router.push('/output');
        }, 1000); // Optional delay to show the animation clearly
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8 relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          PRD Document Maker
        </h1>

        {/* Show loading spinner when loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-500 font-semibold text-lg">
              Creating PRD...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Metadata Section */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <h2 className="text-xl font-semibold text-gray-700">Metadata</h2>
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full py-2 ${getBorderClass(
                    formData.productName
                  )} focus:outline-none text-black`}
                />
              </div>

              <div>
                <label
                  htmlFor="documentOwner"
                  className="block text-sm font-medium text-gray-700"
                >
                  Document Owner
                </label>
                <input
                  type="text"
                  id="documentOwner"
                  name="documentOwner"
                  value={formData.documentOwner}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full py-2 ${getBorderClass(
                    formData.documentOwner
                  )} focus:outline-none text-black`}
                />
              </div>

              <div>
                <label
                  htmlFor="developer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Developer
                </label>
                <textarea
                  id="developer"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full py-2 rounded-md focus:outline-none ${
                    formData.developer === ''
                      ? 'border-2 border-gray-300'
                      : 'border-2 border-green-500'
                  } text-black`}
                  rows={3}
                />
              </div>

              <div>
                <label
                  htmlFor="stakeholder"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stakeholder
                </label>
                <input
                  type="text"
                  id="stakeholder"
                  name="stakeholder"
                  value={formData.stakeholder}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full py-2 ${getBorderClass(
                    formData.stakeholder
                  )} focus:outline-none text-black`}
                />
              </div>

              <div>
                <label
                  htmlFor="docStage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Doc Stage
                </label>
                <input
                  type="text"
                  id="docStage"
                  name="docStage"
                  value={formData.docStage}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full py-2 ${getBorderClass(
                    formData.docStage
                  )} focus:outline-none text-black`}
                />
              </div>
            </div>

            {/* Timeline and Overview Section */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Project Timeline
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full py-2 ${
                      formData.startDate === ''
                        ? 'border-2 border-gray-300'
                        : 'border-2 border-green-500'
                    } focus:outline-none text-black`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full py-2 ${
                      formData.endDate === ''
                        ? 'border-2 border-gray-300'
                        : 'border-2 border-green-500'
                    } focus:outline-none text-black`}
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-700">Overview</h2>
              <textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                required
                className={`mt-1 block w-full py-2 rounded-md focus:outline-none ${
                  formData.overview === ''
                    ? 'border-2 border-gray-300'
                    : 'border-2 border-green-500'
                } text-black`}
                rows={6}
                placeholder="Provide a brief overview of the project..."
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-1/2 py-3 px-6 rounded-md text-white font-semibold transition-colors ${
                  isFormValid
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Create PRD
              </button>
            </div>
          </form>
        )}
      </div>
      <div className='mx-auto w-1/2 text-center'>

      <button
                type="button"
                onClick={() => handleLogout} 
                className="w-1/2 py-3 px-6 mt-4 rounded-md bg-gray-300 text-gray-500 hover:bg-red-600 hover:text-white mx-auto"
                >Log out</button>
                </div>
    </div>
  );
}

export default Home;
