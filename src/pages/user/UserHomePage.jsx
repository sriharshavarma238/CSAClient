import React, { useEffect, useState } from 'react';
import UserNavbar from '../../components/UserNavbar';

API_BASE_URL = "https://cs-aserver.vercel.app"
const UserHomePage = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/course/preview`);
      const data = await response.json();
      console.log(data)
      setCourses(data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handlePurchase = async (courseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/course/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('userToken')
        },
        credentials: 'include',
        body: JSON.stringify({ courseId })
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "You have successfully bought the course") {
        alert('Course purchased successfully!');
      } else if (data.message === "You have already purchased this course") {
        alert('You have already purchased this course');
      }

    } catch (error) {
      console.error('Error purchasing course:', error);
      alert('Failed to purchase course');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
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
                <span className="font-bold text-teal-600">₹{course.price}</span>
                <button
                  onClick={() => handlePurchase(course._id)}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all duration-300"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;