import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

API_BASE_URL = "https://cs-aserver.vercel.app"const AdminEditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    // Fetch existing course data
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/course/bulk`, {
          headers: {
            'token': localStorage.getItem('adminToken')
          },
          credentials: 'include'
        });
        const data = await response.json();
        const course = data.courses.find(course => course._id === id);

        if (course) {
          setFormData({
            title: course.title,
            description: course.description,
            price: course.price,
            imageUrl: course.imageUrl
          });
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setMessage('Failed to load course details');
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/admin/course`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('adminToken')
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          courseId: id
        })
      });

      const data = await response.json();

      if (data.message === "Course Updated") {
        setMessage('Course updated successfully!');
        setTimeout(() => {
          navigate('/admin/home');
        }, 1200);
      }
    } catch (error) {
      console.error('Error updating course:', error);
      setMessage('Failed to update course. Please try again.');
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Course</h1>

        {message && (
          <div className="mb-4 p-4 rounded-lg bg-green-100 text-green-700 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCourse;