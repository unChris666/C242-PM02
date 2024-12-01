import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    documentOwner: '',
    developer: '',
    stakeholder: '',
    docStage: '',
    decider: '',
    accountable: '',
    responsible: '',
    consulted: '',
    informed: '',
    startDate: '',
    endDate: '',
    overview: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const isComplete = Object.values(formData).every(value => 
      value !== null && value !== ''
    );
    setIsFormValid(isComplete);
  }, [formData]);

  const getBorderClass = (value) => {
    if (value === '') {
      return 'border-b-2 border-black focus:border-blue-500';
    }
    return 'border-b-2 border-green-500';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {

      console.log(JSON.stringify(formData, null, 2));

      navigate('/output', { state: { formData } });
    }
  };

  return (
    <div className="w-full bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">PRD Document Maker</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Metadata Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Metadata</h2>
              <div className="space-y-4">
                
                {/* Product Name */}
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input 
                    type="text" 
                    id="productName" 
                    name="productName" 
                    value={formData.productName}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.productName)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>

                {/* Document Owner */}
                <div>
                  <label htmlFor="documentOwner" className="block text-sm font-medium text-gray-700">Document Owner</label>
                  <input 
                    type="text" 
                    id="documentOwner" 
                    name="documentOwner" 
                    value={formData.documentOwner}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.documentOwner)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>

                {/* Developer */}
                <div>
                  <label htmlFor="developer" className="block text-sm font-medium text-gray-700">Developer</label>
                  <textarea 
                    id="developer" 
                    name="developer" 
                    value={formData.developer}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${formData.developer === '' 
                      ? 'border-2 border-black focus:border-blue-500' 
                      : 'border-2 border-green-500'} bg-transparent outline-none transition-colors duration-300 rounded-lg`}
                    rows="3"
                  />
                </div>

                {/* Stakeholder */}
                <div>
                  <label htmlFor="stakeholder" className="block text-sm font-medium text-gray-700">Stakeholder</label>
                  <input 
                    type="text" 
                    id="stakeholder" 
                    name="stakeholder" 
                    value={formData.stakeholder}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.stakeholder)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>

                {/* Document Stage */}
                <div>
                  <label htmlFor="docStage" className="block text-sm font-medium text-gray-700">Doc Stage</label>
                  <input 
                    type="text" 
                    id="docStage" 
                    name="docStage" 
                    value={formData.docStage}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.docStage)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>

              </div>
            </div>

            {/* DARCI Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">DARCI Framework</h2>
              <div className="space-y-4">

                {/* Decider */}
                <div>
                  <label htmlFor="decider" className="block text-sm font-medium text-gray-700">Decider</label>
                  <input 
                    type="text" 
                    id="decider" 
                    name="decider" 
                    value={formData.decider}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.decider)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>

                {/* Accountable */}
                <div>
                  <label htmlFor="accountable" className="block text-sm font-medium text-gray-700">Accountable</label>
                  <input 
                    type="text" 
                    id="accountable" 
                    name="accountable" 
                    value={formData.accountable}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.accountable)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>

                {/* Responsible */}
                <div>
                  <label htmlFor="responsible" className="block text-sm font-medium text-gray-700">Responsible</label>
                  <input 
                    type="text" 
                    id="responsible" 
                    name="responsible" 
                    value={formData.responsible}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.responsible)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>

                {/* Consulted */}
                <div>
                  <label htmlFor="consulted" className="block text-sm font-medium text-gray-700">Consulted</label>
                  <input 
                    type="text" 
                    id="consulted" 
                    name="consulted" 
                    value={formData.consulted}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.consulted)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>

                {/* Informed */}
                <div>
                  <label htmlFor="informed" className="block text-sm font-medium text-gray-700">Informed</label>
                  <input 
                    type="text" 
                    id="informed" 
                    name="informed" 
                    value={formData.informed}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${getBorderClass(formData.informed)} bg-transparent outline-none transition-colors duration-300`}
                  />
                </div>
              </div>
            </div>

            {/* Timeline and Overview Section */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Project Timeline</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input 
                        type="date" 
                        id="startDate" 
                        name="startDate" 
                        value={formData.startDate}
                        onChange={handleChange}
                        required 
                        className={`mt-1 block w-full ${formData.startDate === '' 
                          ? 'border-2 border-black' 
                          : 'border-2 border-green-500'} bg-transparent`}
                      />
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                      <input 
                        type="date" 
                        id="endDate" 
                        name="endDate" 
                        value={formData.endDate}
                        onChange={handleChange}
                        required 
                        className={`mt-1 block w-full ${formData.endDate === '' 
                          ? 'border-2 border-black' 
                          : 'border-2 border-green-500'} bg-transparent`}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
                  <textarea 
                    id="overview" 
                    name="overview" 
                    value={formData.overview}
                    onChange={handleChange}
                    required 
                    className={`mt-1 block w-full ${formData.overview === '' 
                      ? 'border-2 border-black focus:border-blue-500' 
                      : 'border-2 border-green-500'} bg-transparent outline-none transition-colors duration-300 rounded-lg`}
                    rows="6"
                    placeholder="Provide a brief overview of the project..."
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-1/2 py-3 px-6 rounded-md transition-colors duration-300 ${
                isFormValid
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Create PRD
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Home;