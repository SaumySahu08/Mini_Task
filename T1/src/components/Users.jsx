import React, { useEffect, useState } from "react";
import { getDetails } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Users() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    getDetails()
      .then((res) => {
        console.log(res)
        setEmployees(res.data.users);
        console.log(employees);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch employee details:", err);
        setError("Failed to load employee data. Please try again.");
        setLoading(false);
        alert("Session expired or data error. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-5 pt-16">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4
               bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300
               font-bold py-2 px-5 rounded-lg shadow-lg transition duration-300 ease-in-out
               text-white text-sm cursor-pointer z-10"
      >
        Logout
      </button>


      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2 className="text-2xl font-bold mb-6">Employee Dashboard</h2>




        {loading && <p>Loading employee data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && employees.length === 0 && (
          <p>No employee details found.</p>
        )}

        {!loading && !error && employees.length > 0 && (
          <div className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow border border-gray-200 bg-white dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 text-sm">{employee.id}</td>
                    <td className="px-6 py-4 text-sm">{employee.firstName}</td>
                    <td className="px-6 py-4 text-sm">{employee.email}</td>
                    <td className="px-6 py-4 text-sm">{employee.phone}</td>
                    <td className="px-6 py-4 text-sm">{employee.address.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}
      </div>
    </div>
  );
}

export default Users;