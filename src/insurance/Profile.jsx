import React, { useState, useEffect, useRef } from "react";

const InputField = ({
  label,
  type = "text",
  name,
  placeholder,
  required = false,
  value,
  onChange,
  inputRef,
}) => (
  <label className="block">
    <span className="text-gray-800 font-medium">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </span>
    <input
      ref={inputRef}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className="mt-2 block w-full rounded-lg bg-white border-gray-400 border-2 text-black p-3 shadow-sm focus:ring-gray-500 focus:border-gray-500"
    />
  </label>
);

const RadioGroup = ({ title, name, options, required = false, onChange }) => (
  <div className="mb-6">
    <h4 className="text-gray-800 font-medium mb-3">
      {title}
      {required && <span className="text-red-500 ml-1">*</span>}
    </h4>
    <div className="flex flex-wrap gap-6">
      {options.map((option) => (
        <label
          key={option.value}
          className="inline-flex items-center cursor-pointer text-gray-800"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            required={required}
            onChange={onChange}
            className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-500"
          />
          <span className="ml-3">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

function Profile({ onNext }) {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    idNumber: "", 
    primaryPhone: "",
    secondaryPhone: "",
    email: "",
    street: "",
    city: "",
    county: "", 
    postalCode: "", 
    licenseNumber: "",
    licenseCounty: "", 
    licenseIssueDate: "",
    licenseExpiryDate: "",
  });

  const firstEmptyFieldRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const entries = Object.entries(formData);
    for (const [key, value] of entries) {
      if (!value && key !== "secondaryPhone") {
        // secondary phone is optional
        const inputElement = formRef.current.querySelector(`[name="${key}"]`);
        if (inputElement) {
          inputElement.focus();
          alert(
            `Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`
          );
          return;
        }
      }
    }
    if (onNext) onNext(formData); 
  };

  useEffect(() => {
    if (firstEmptyFieldRef.current) {
      firstEmptyFieldRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-gray-800">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BimaCare Car Insurance Kenya
          </h1>
          <h2 className="text-2xl text-gray-700 mt-3 border-b-2 pb-4 border-gray-300">
            Personal Information Form
          </h2>
        </div>
        <form ref={formRef} onSubmit={handleNext} className="space-y-10">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Applicant Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
                inputRef={firstEmptyFieldRef}
              />
              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <RadioGroup
              title="Gender"
              name="gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              required
              onChange={handleChange}
            />
            <RadioGroup
              title="Marital Status"
              name="maritalStatus"
              options={[
                { value: "single", label: "Single" },
                { value: "married", label: "Married" },
                { value: "divorced", label: "Divorced" },
                { value: "widowed", label: "Widowed" },
              ]}
              required
              onChange={handleChange}
            />
            <InputField
              label="National ID Number"
              name="idNumber"
              placeholder="12345678"
              required
              value={formData.idNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Primary Phone Number"
                name="primaryPhone"
                type="tel"
                placeholder="07XX XXX XXX"
                required
                value={formData.primaryPhone}
                onChange={handleChange}
              />
              <InputField
                label="Secondary Phone Number"
                name="secondaryPhone"
                type="tel"
                placeholder="07XX XXX XXX"
                value={formData.secondaryPhone}
                onChange={handleChange}
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Residential Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Street Address"
                name="street"
                required
                value={formData.street}
                onChange={handleChange}
              />
              <InputField
                label="Town/City"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              />
              <InputField
                label="County"
                name="county"
                required
                value={formData.county}
                onChange={handleChange}
              />
              <InputField
                label="Postal Code"
                name="postalCode"
                type="text"
                required
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 border-b-2 pb-3 border-gray-300">
              Driver's License Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="License Number"
                name="licenseNumber"
                required
                value={formData.licenseNumber}
                onChange={handleChange}
              />
              <InputField
                label="County of Issue"
                name="licenseCounty"
                required
                value={formData.licenseCounty}
                onChange={handleChange}
              />
              <InputField
                label="Issue Date"
                name="licenseIssueDate"
                type="date"
                required
                value={formData.licenseIssueDate}
                onChange={handleChange}
              />
              <InputField
                label="Expiry Date"
                name="licenseExpiryDate"
                type="date"
                required
                value={formData.licenseExpiryDate}
                onChange={handleChange}
              />
            </div>
          </div>

      
<div className="flex justify-end">
  <button
    type="button"
    onClick={() => onNext(formData)}
    className="px-8 py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-700 transition"
  >
    Next
  </button>
</div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
