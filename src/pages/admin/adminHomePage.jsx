import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useNavigate } from 'react-router-dom';


const API_BASE_URL = "https://csa-server-3cb2.vercel.app";


const AdminHomePage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate()

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/course/bulk`, {
        headers: {
          'token': `${localStorage.getItem('adminToken')}`
        },
        credentials: 'include'
      });
      const data = await response.json();
      setCourses(data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-600">₹{course.price}</span>
                <button
                  onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;