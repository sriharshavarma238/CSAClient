import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const API_BASE_URL = "https://csa-server-3cb2.vercel.app";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const url = `${API_BASE_URL}/admin/signup`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFormSubmission = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const fetchData = await fetch(url, options);
    const response = await fetchData.json();
    console.log(response);
    navigate("/admin/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-200 px-4 py-8">
      <form onSubmit={onFormSubmission} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Admin Signup</h1>

        <div className="mb-5">
          <label htmlFor="firstname" className="block mb-1 text-sm font-semibold text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstName"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter first name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="lastname" className="block mb-1 text-sm font-semibold text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastName"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter last name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300">
          Submit
        </button>

        <p className="mt-6 text-center text-sm text-gray-700">
          Already registered?
          <span onClick={() => navigate('/admin/signin')} className="text-indigo-600 font-semibold hover:underline ml-1 cursor-pointer">
            Sign In
          </span>
        </p>
      </form>
    </div>

  );
};

export default AdminSignup;