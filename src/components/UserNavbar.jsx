import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl cursor-pointer" onClick={() => navigate('/user/home')}>
          CSA
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/user/purchases')}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
          >
            My Purchases
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

export default UserNavbar;