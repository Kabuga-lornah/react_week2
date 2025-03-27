import { useState, useEffect, useRef } from 'react';

const History = ({ onNext, onPrev, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [accidents, setAccidents] = useState(formData.accidents || []);
  const [violations, setViolations] = useState(formData.violations || []);
  const formRef = useRef(null);

  useEffect(() => {
    setAccidents(formData.accidents || []);
    setViolations(formData.violations || []);
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.currentInsurance) newErrors.currentInsurance = 'Required';
    if (!formData.authorization) newErrors.authorization = 'You must certify the information';
    if (!formData.signature) newErrors.signature = 'Signature required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      setFormData({
        ...formData,
        accidents,
        violations
      });
      onNext();
    } else {
      setErrors(validationErrors);
      const firstError = Object.keys(validationErrors)[0];
      if (firstError) {
        const element = formRef.current.querySelector(`[name="${firstError}"]`);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addAccident = () => {
    setAccidents([...accidents, { date: '', description: '' }]);
  };

  const handleAccidentChange = (index, field, value) => {
    const updated = [...accidents];
    updated[index][field] = value;
    setAccidents(updated);
  };

  const removeAccident = (index) => {
    const updated = [...accidents];
    updated.splice(index, 1);
    setAccidents(updated);
  };

  const addViolation = () => {
    setViolations([...violations, { date: '', violation: '' }]);
  };

  const handleViolationChange = (index, field, value) => {
    const updated = [...violations];
    updated[index][field] = value;
    setViolations(updated);
  };

  const removeViolation = (index) => {
    const updated = [...violations];
    updated.splice(index, 1);
    setViolations(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-gray-800">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BimaCare Car Insurance Kenya</h1>
          <h2 className="text-2xl text-gray-700 mt-3 border-b-2 pb-4 border-gray-300">
            Driving History & Final Details
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10" ref={formRef}>
       
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Driving Record (Past 3 Years)
            </h3>
          

            <div className="mb-6">
              <h4 className="text-gray-800 font-medium mb-3">Traffic Violations</h4>
              {violations.map((violation, index) => (
                <div key={index} className="mb-6 p-6 border-2 border-gray-300 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-800 font-medium mb-2">Date</label>
                      <input
                        type="date"
                        value={violation.date}
                        onChange={(e) => handleViolationChange(index, 'date', e.target.value)}
                        className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-800 font-medium mb-2">Violation</label>
                      <input
                        type="text"
                        value={violation.violation}
                        onChange={(e) => handleViolationChange(index, 'violation', e.target.value)}
                        className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeViolation(index)}
                    className="mt-4 text-red-600 text-sm font-medium"
                  >
                    Remove Violation
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addViolation}
                className="text-gray-800 font-medium text-sm flex items-center"
              >
                <span className="mr-1">+</span> Add Violation
              </button>
            </div>

            <div className="mb-4">
              <label className="flex items-center text-gray-800">
                <input
                  type="checkbox"
                  name="licenseSuspended"
                  checked={formData.licenseSuspended || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-500"
                />
                <span className="ml-3">License suspended/revoked in past 3 years</span>
              </label>
              {formData.licenseSuspended && (
                <div className="mt-4 ml-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-800 font-medium mb-2">Date</label>
                      <input
                        type="date"
                        name="suspensionDate"
                        value={formData.suspensionDate || ''}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-800 font-medium mb-2">Reason</label>
                      <input
                        type="text"
                        name="suspensionReason"
                        value={formData.suspensionReason || ''}
                        onChange={handleChange}
                        className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

      
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Current Insurance Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Insurance Company
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="currentInsurance"
                  value={formData.currentInsurance || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
                {errors.currentInsurance && <p className="text-red-500 text-sm mt-1">{errors.currentInsurance}</p>}
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">Policy Number</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">Expiration Date</label>
                <input
                  type="date"
                  name="policyExpiration"
                  value={formData.policyExpiration || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">Reason for Change</label>
                <select
                  name="reasonForChange"
                  value={formData.reasonForChange || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="">Select reason...</option>
                  <option value="Better Rate">Better Rate</option>
                  <option value="Dissatisfied">Dissatisfied with Service</option>
                  <option value="Moving">Moving Locations</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

        
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Payment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">Payment Frequency</label>
                <select
                  name="paymentFrequency"
                  value={formData.paymentFrequency || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="">Select frequency...</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annually">Semi-Annually</option>
                  <option value="Annually">Annually</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="">Select method...</option>
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Check">Check</option>
                </select>
              </div>
            </div>

            {formData.paymentMethod === 'Credit Card' && (
              <div className="p-6 border-2 border-gray-300 rounded-lg">
                <h4 className="text-gray-800 font-medium mb-4">Credit Card Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Card Type</label>
                    <select
                      name="cardType"
                      value={formData.cardType || ''}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    >
                      <option value="">Select card type...</option>
                      <option value="Visa">Visa</option>
                      <option value="MasterCard">MasterCard</option>
                      <option value="Amex">American Express</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber || ''}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Expiration Date</label>
                    <input
                      type="text"
                      name="cardExpiration"
                      value={formData.cardExpiration || ''}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      name="cardCvv"
                      value={formData.cardCvv || ''}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'M-Pesa' && (
              <div className="p-6 border-2 border-gray-300 rounded-lg">
                <h4 className="text-gray-800 font-medium mb-4">M-Pesa Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-800 font-medium mb-2">Phone Number</label>
                    <input
                      type="text"
                      name="mpesaNumber"
                      value={formData.mpesaNumber || ''}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          
          <div className="p-6 border-2 border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Authorization</h3>
            <div className="mb-6">
              <label className="flex items-start text-gray-800">
                <input
                  type="checkbox"
                  name="authorization"
                  checked={formData.authorization || false}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-500"
                  required
                />
                <span className="ml-3">
                  I certify that all information provided is accurate and complete to the best of my knowledge.
                  I understand that providing false information may result in denial of coverage or cancellation
                  of my policy.
                </span>
              </label>
              {errors.authorization && <p className="text-red-500 text-sm mt-2">{errors.authorization}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Signature
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="signature"
                  value={formData.signature || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  required
                />
                {errors.signature && <p className="text-red-500 text-sm mt-1">{errors.signature}</p>}
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-2">
                  Date
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  name="signatureDate"
                  value={formData.signatureDate || ''}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  required
                />
              </div>
            </div>
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
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default History;