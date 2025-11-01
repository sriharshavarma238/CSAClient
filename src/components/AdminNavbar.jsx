import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the admin token from localStorage
    localStorage.removeItem('adminToken');
    // Navigate to start page
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="text-white font-bold text-xl cursor-pointer" onClick={() => navigate('/admin/home')}>
          CSA
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/create-course')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Create Course
          </button>
          
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;