import { useState } from 'react';

const Vehicle = ({ onNext, onPrev, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [additionalDrivers, setAdditionalDrivers] = useState(
    formData.additionalDrivers || [{ name: '', relationship: '', dob: '', license: '' }]
  );

  const validate = () => {
    const newErrors = {};
    if (!formData.vehicleYear) newErrors.vehicleYear = 'Required';
    if (!formData.vehicleMake) newErrors.vehicleMake = 'Required';
    if (!formData.vehicleModel) newErrors.vehicleModel = 'Required';
    if (!formData.vin) newErrors.vin = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setFormData({ ...formData, additionalDrivers });
      onNext(); // This will navigate to the next step
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDriverChange = (index, field, value) => {
    const updatedDrivers = [...additionalDrivers];
    updatedDrivers[index][field] = value;
    setAdditionalDrivers(updatedDrivers);
  };

  const addDriver = () => {
    setAdditionalDrivers([...additionalDrivers, { name: '', relationship: '', dob: '', license: '' }]);
  };

  const removeDriver = (index) => {
    const updatedDrivers = [...additionalDrivers];
    updatedDrivers.splice(index, 1);
    setAdditionalDrivers(updatedDrivers);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-gray-800">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BimaCare Car Insurance Kenya</h1>
          <h2 className="text-2xl text-gray-700 mt-3 border-b-2 pb-4 border-gray-300">
            Vehicle Information
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Vehicle Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Vehicle Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleYear"
                  value={formData.vehicleYear || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
                {errors.vehicleYear && <p className="text-red-500 text-sm mt-1">{errors.vehicleYear}</p>}
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleMake"
                  value={formData.vehicleMake || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
                {errors.vehicleMake && <p className="text-red-500 text-sm mt-1">{errors.vehicleMake}</p>}
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
                {errors.vehicleModel && <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>}
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  VIN (Chassis Number) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
                {errors.vin && <p className="text-red-500 text-sm mt-1">{errors.vin}</p>}
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">Current Mileage (km)</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-medium mb-2">Estimated Annual Mileage (km)</label>
                <input
                  type="number"
                  name="annualMileage"
                  value={formData.annualMileage || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-gray-800 font-medium mb-3">Vehicle Use</h4>
            <div className="flex flex-wrap gap-6">
              {['Personal', 'Business', 'Commercial'].map((use) => (
                <label key={use} className="inline-flex items-center cursor-pointer text-gray-800">
                  <input
                    type="radio"
                    name="vehicleUse"
                    value={use}
                    checked={formData.vehicleUse === use}
                    onChange={handleChange}
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-500"
                  />
                  <span className="ml-3">{use}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-2">Parking Location</label>
            <select
              name="parkingLocation"
              value={formData.parkingLocation || ''}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
            >
              <option value="">Select parking location...</option>
              {['Garage', 'Driveway', 'Street', 'Carport', 'Compound', 'Other'].map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Additional Drivers
            </h3>
            {additionalDrivers.map((driver, index) => (
              <div key={index} className="mb-6 p-6 border-2 border-gray-300 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={driver.name}
                      onChange={(e) => handleDriverChange(index, 'name', e.target.value)}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Relationship</label>
                    <input
                      type="text"
                      value={driver.relationship}
                      onChange={(e) => handleDriverChange(index, 'relationship', e.target.value)}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={driver.dob}
                      onChange={(e) => handleDriverChange(index, 'dob', e.target.value)}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Driver's License #</label>
                    <input
                      type="text"
                      value={driver.license}
                      onChange={(e) => handleDriverChange(index, 'license', e.target.value)}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>
                {additionalDrivers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDriver(index)}
                    className="mt-4 text-red-600 text-sm font-medium"
                  >
                    Remove Driver
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDriver}
              className="text-gray-800 font-medium text-sm flex items-center"
            >
              <span className="mr-1">+</span> Add Another Driver
            </button>
          </div>

          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={onPrev}
              className="px-8 py-3 bg-gray-300 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Vehicle;