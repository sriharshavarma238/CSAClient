import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 px-4 py-8">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Welcome to CSA</h1>
        <p className="text-center text-gray-600 mb-8">Choose how you want to continue</p>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/user/signin')}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Continue as User
          </button>
          
          <button
            onClick={() => navigate('/admin/signin')}
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-all duration-300"
          >
            Continue as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;