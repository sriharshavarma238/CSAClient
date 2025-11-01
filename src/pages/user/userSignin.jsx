import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";


API_BASE_URL = "https://cs-aserver.vercel.app"


const UserSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //   const url = "http://localhost:3000/user/signin";
  const url = `${API_BASE_URL}/user/signin`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
    if (response.token) {
      localStorage.setItem("userToken", response.token);
      navigate("/user/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-8">
      <form onSubmit={onFormSubmission} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">User Signin</h1>

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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300">
          Submit
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account?</span>
          <button
            type="button"
            onClick={() => navigate('/user/signup')}
            className="ml-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>

  );
};

export default UserSignin;
