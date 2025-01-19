import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-md  font-bold">
          <Link to="/admin" className="hover:text-green-400">
            Admin Dashboard
          </Link>
        </div>
        <div className="flex text-sm items-center justify-center space-x-4">
          <Link
            to="/admin/users"
            className="hover:text-green-400 transition duration-200"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/category"
            className="hover:text-green-400 transition duration-200"
          >
            Manage Categories
          </Link>
          <Link
            to="/admin/product"
            className="hover:text-green-400 transition duration-200"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="hover:text-green-400 transition duration-200"
          >
            Manage Orders
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 -mt-1 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
