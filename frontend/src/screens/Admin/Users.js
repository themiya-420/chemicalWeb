import React, { useState, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../Services/api";
import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";
const ManageUsers = () => {
  const [users, setUsers] = useState([]); // List of users
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    password: "",
  });
  const [editingUser, setEditingUser] = useState(null); // User being edited
  const [message, setMessage] = useState(""); // Feedback message

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setMessage("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Add or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id, userData);
        setMessage("User updated successfully.");
      } else {
        await createUser(userData);
        setMessage("User added successfully.");
      }
      fetchUsers();
      setEditingUser(null);
      setUserData({
        username: "",
        email: "",
        phone: "",
        address: "",
        role: "user",
        password: "",
      });
    } catch (error) {
      setMessage("Failed to save user.");
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setMessage("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      setMessage("Failed to delete user.");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-green-500 w-screen to-green-700 text-white py-6 text-center shadow-md">
          <h1 className="text-4xl font-bold">Manage Categories</h1>
          <p className="mt-2 text-lg">View and manage all Categories here.</p>
        </header>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
          {/* Feedback Message */}
          {message && (
            <p className="text-center text-green-600 mb-4 font-medium">
              {message}
            </p>
          )}

          {/* Add / Edit User Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={userData.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
            ></textarea>
            <select
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md shadow-md hover:bg-green-700 transition duration-200"
            >
              {editingUser ? "Update User" : "Add User"}
            </button>
          </form>

          {/* Users Table */}
          <div className="overflow-x-auto mt-6">
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Username</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Phone</th>
                  <th className="border p-3 text-left">Address</th>
                  <th className="border p-3 text-left">Role</th>
                  <th className="border p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border p-3">{user.id}</td>
                    <td className="border p-3">{user.username}</td>
                    <td className="border p-3">{user.email}</td>
                    <td className="border p-3">{user.phone}</td>
                    <td className="border p-3">{user.address}</td>
                    <td className="border p-3">{user.role}</td>
                    <td className="border p-3 flex gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="bg-yellow-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-yellow-700 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-600 text-white py-1 px-3 rounded-md shadow-md hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageUsers;
