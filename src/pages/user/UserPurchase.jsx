import React, { useEffect, useState } from 'react';
import UserNavbar from '../../components/UserNavbar';
import { API_BASE_URL } from '../../config';

const UserPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/user/purchases`, {
        headers: {
          'token': localStorage.getItem('userToken')
        },
        credentials: 'include'
      });
      const data = await response.json();
      console.log(data)
      setPurchases(data.purchases);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Purchased Courses</h1>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg">Loading your courses...</div>
          </div>
        ) : purchases.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">You haven't purchased any courses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchases.map((course) => (
              <div key={course._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                {course.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h2>
                <p className="text-gray-600 mb-3 line-clamp-3">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-600">
                    ${course.price}
                  </span>
                  <span className="text-sm text-gray-500 bg-green-100 px-2 py-1 rounded">
                    Purchased
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPurchases;