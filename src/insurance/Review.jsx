import React, { useState } from 'react';

const Review = ({ formData, onSubmit, onPrev }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    onSubmit(); 
    setIsSubmitted(true);
    
  
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Application Submitted!
            </h3>
            <p className="text-gray-600">
              Your insurance application has been successfully submitted.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-gray-800">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BimaCare Insurance Kenya</h1>
          <h2 className="text-2xl text-gray-700 mt-3 border-b-2 pb-4 border-gray-300">
            Application Review
          </h2>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 border-b-2 pb-2 border-gray-300">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.profile).map(([key, value]) => (
                <div key={key}>
                  <p className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                  <p className="text-gray-900">{value || 'Not provided'}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 border-b-2 pb-2 border-gray-300">
              Vehicle Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.vehicle).map(([key, value]) => (
                <div key={key}>
                  <p className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                  <p className="text-gray-900">{value || 'Not provided'}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 border-b-2 pb-2 border-gray-300">
              Driving History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.history).map(([key, value]) => (
                <div key={key}>
                  <p className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                  <p className="text-gray-900">
                    {Array.isArray(value) ? (
                      value.length > 0 ? (
                        <ul className="list-disc pl-5">
                          {value.map((item, i) => (
                            <li key={i}>{JSON.stringify(item)}</li>
                          ))}
                        </ul>
                      ) : (
                        'None'
                      )
                    ) : (
                      value || 'Not provided'
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-10">
          <button
            type="button"
            onClick={onPrev}
            className="px-8 py-3 bg-gray-300 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;